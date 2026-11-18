const CALENDAR_TIME_ZONE = "Asia/Kolkata"
const IST_OFFSET_MS = 330 * 60 * 1000
const CLASS_DURATION_MS = 60 * 60 * 1000
const BUFFER_MS = 15 * 60 * 1000
const MIN_NOTICE_MS = 24 * 60 * 60 * 1000
const BOOKING_HORIZON_MS = 30 * 24 * 60 * 60 * 1000

export type CalendarClassType = "group" | "private" | "elders"
export type CalendarBookingType = "trial" | "package"

export interface AvailabilitySlot {
  start: string
  end: string
}

interface BusyPeriod {
  start: string
  end: string
}

interface StudentBooking {
  fullName: string
  email: string
  phone: string
  selectedOption: string
  bookingType: CalendarBookingType
  classTypeId: CalendarClassType
  selectedSlots: string[]
}

interface AccessTokenCache {
  token: string
  expiresAt: number
}

let accessTokenCache: AccessTokenCache | null = null

function getCalendarConfig() {
  const clientEmail = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_EMAIL")
  const privateKey = Deno.env.get("GOOGLE_PRIVATE_KEY")?.replace(/\\n/g, "\n")
  const calendarId = Deno.env.get("GOOGLE_CALENDAR_ID")

  if (!clientEmail || !privateKey || !calendarId) {
    throw new Error("Google Calendar credentials are not configured")
  }

  return { clientEmail, privateKey, calendarId }
}

function base64Url(value: string | Uint8Array) {
  const bytes =
    typeof value === "string" ? new TextEncoder().encode(value) : value
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

async function createServiceAccountJwt(
  clientEmail: string,
  privateKey: string,
) {
  const now = Math.floor(Date.now() / 1000)
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }))
  const payload = base64Url(
    JSON.stringify({
      iss: clientEmail,
      scope: "https://www.googleapis.com/auth/calendar",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  )
  const unsignedToken = `${header}.${payload}`
  const privateKeyBytes = Uint8Array.from(
    atob(
      privateKey.replace(
        /-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g,
        "",
      ),
    ),
    (character) => character.charCodeAt(0),
  )
  const key = await crypto.subtle.importKey(
    "pkcs8",
    privateKeyBytes,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(unsignedToken),
  )

  return `${unsignedToken}.${base64Url(new Uint8Array(signature))}`
}

async function getGoogleAccessToken() {
  if (accessTokenCache && accessTokenCache.expiresAt > Date.now() + 60_000) {
    return accessTokenCache.token
  }

  const { clientEmail, privateKey } = getCalendarConfig()
  const assertion = await createServiceAccountJwt(clientEmail, privateKey)
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  })

  if (!response.ok) {
    throw new Error(`Google authentication failed: ${await response.text()}`)
  }

  const data = await response.json()
  accessTokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  }
  return accessTokenCache.token
}

async function googleCalendarFetch(path: string, init: RequestInit = {}) {
  const token = await getGoogleAccessToken()
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3${path}`,
    {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...init.headers,
      },
    },
  )

  if (!response.ok) {
    throw new Error(`Google Calendar request failed: ${await response.text()}`)
  }

  return response
}

async function getBusyPeriods(
  timeMin: Date,
  timeMax: Date,
): Promise<BusyPeriod[]> {
  const { calendarId } = getCalendarConfig()
  const response = await googleCalendarFetch("/freeBusy", {
    method: "POST",
    body: JSON.stringify({
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      timeZone: CALENDAR_TIME_ZONE,
      items: [{ id: calendarId }],
    }),
  })
  const data = await response.json()
  const calendar = data.calendars?.[calendarId]

  if (calendar?.errors?.length) {
    throw new Error(
      `Google Calendar access failed: ${calendar.errors[0].reason}`,
    )
  }

  return calendar?.busy ?? []
}

function createIstDate(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
) {
  return new Date(Date.UTC(year, month, day, hour, minute) - IST_OFFSET_MS)
}

function getIstDateParts(date: Date) {
  const istDate = new Date(date.getTime() + IST_OFFSET_MS)
  return {
    year: istDate.getUTCFullYear(),
    month: istDate.getUTCMonth(),
    day: istDate.getUTCDate(),
    weekday: istDate.getUTCDay(),
  }
}

function isSlotFree(start: Date, busyPeriods: BusyPeriod[]) {
  const bufferedStart = start.getTime() - BUFFER_MS
  const bufferedEnd = start.getTime() + CLASS_DURATION_MS + BUFFER_MS
  return !busyPeriods.some(
    (busy) =>
      bufferedStart < new Date(busy.end).getTime() &&
      bufferedEnd > new Date(busy.start).getTime(),
  )
}

function generateCandidates(
  classType: CalendarClassType,
  rangeStart: Date,
  rangeEnd: Date,
): Date[] {
  const startParts = getIstDateParts(rangeStart)
  const candidates: Date[] = []
  const privateHours = [6, 7, 8, 9, 10, 11, 15, 16, 17, 18, 19]

  for (let dayOffset = 0; dayOffset <= 90; dayOffset += 1) {
    const localDay = new Date(
      Date.UTC(startParts.year, startParts.month, startParts.day + dayOffset),
    )
    const year = localDay.getUTCFullYear()
    const month = localDay.getUTCMonth()
    const day = localDay.getUTCDate()
    const weekday = localDay.getUTCDay()
    const times: Array<[number, number]> = []

    if (classType === "group" && (weekday === 2 || weekday === 4)) {
      times.push([7, 0])
    } else if (classType === "elders" && [1, 3, 5].includes(weekday)) {
      times.push([18, 30])
    } else if (classType === "private" && weekday !== 0) {
      times.push(...privateHours.map((hour) => [hour, 0] as [number, number]))
    }

    for (const [hour, minute] of times) {
      const candidate = createIstDate(year, month, day, hour, minute)
      if (candidate >= rangeStart && candidate <= rangeEnd)
        candidates.push(candidate)
    }

    if (createIstDate(year, month, day, 23, 59) > rangeEnd) break
  }

  return candidates
}

function toSlot(start: Date): AvailabilitySlot {
  return {
    start: start.toISOString(),
    end: new Date(start.getTime() + CLASS_DURATION_MS).toISOString(),
  }
}

function getFixedPackageOccurrences(
  classType: CalendarClassType,
  firstStart: Date,
) {
  const searchEnd = new Date(firstStart.getTime() + 90 * 24 * 60 * 60 * 1000)
  return generateCandidates(classType, firstStart, searchEnd).slice(0, 12)
}

export function isCalendarClassType(value: string): value is CalendarClassType {
  return value === "group" || value === "private" || value === "elders"
}

export function isCalendarBookingType(
  value: string,
): value is CalendarBookingType {
  return value === "trial" || value === "package"
}

export async function getAvailableSlots(
  classType: CalendarClassType,
  bookingType: CalendarBookingType,
) {
  const rangeStart = new Date(Date.now() + MIN_NOTICE_MS)
  const rangeEnd = new Date(Date.now() + BOOKING_HORIZON_MS)
  const busySearchEnd = new Date(Date.now() + 120 * 24 * 60 * 60 * 1000)
  const busyPeriods = await getBusyPeriods(new Date(), busySearchEnd)
  const candidates = generateCandidates(classType, rangeStart, rangeEnd)

  if (classType === "private" || bookingType === "trial") {
    return candidates
      .filter((slot) => isSlotFree(slot, busyPeriods))
      .map(toSlot)
  }

  return candidates
    .filter((firstStart) => {
      const occurrences = getFixedPackageOccurrences(classType, firstStart)
      return (
        occurrences.length === 12 &&
        occurrences.every((slot) => isSlotFree(slot, busyPeriods))
      )
    })
    .map(toSlot)
}

function validateSelectedSlots(
  selectedSlots: unknown,
  classType: CalendarClassType,
  bookingType: CalendarBookingType,
) {
  if (
    !Array.isArray(selectedSlots) ||
    selectedSlots.some(
      (slot) => typeof slot !== "string" || Number.isNaN(Date.parse(slot)),
    )
  ) {
    throw new Error("Invalid booking slots")
  }

  const requiredCount =
    bookingType === "package" && classType === "private" ? 12 : 1
  const uniqueSlots = [...new Set(selectedSlots)]
  if (uniqueSlots.length !== requiredCount) {
    throw new Error(`This booking requires ${requiredCount} selected slot(s)`)
  }

  return uniqueSlots
}

export async function createBookingEvents(student: StudentBooking) {
  const selectedSlots = validateSelectedSlots(
    student.selectedSlots,
    student.classTypeId,
    student.bookingType,
  )
  const availableSlots = await getAvailableSlots(
    student.classTypeId,
    student.bookingType,
  )
  const availableStarts = new Set(availableSlots.map((slot) => slot.start))

  if (
    selectedSlots.some(
      (slot) => !availableStarts.has(new Date(slot).toISOString()),
    )
  ) {
    throw new Error("One or more selected sessions are no longer available")
  }

  let eventStarts = selectedSlots.map((slot) => new Date(slot))
  if (student.bookingType === "package" && student.classTypeId !== "private") {
    eventStarts = getFixedPackageOccurrences(
      student.classTypeId,
      eventStarts[0],
    )
  }

  const { calendarId } = getCalendarConfig()
  const eventIds: string[] = []
  for (const start of eventStarts) {
    const response = await googleCalendarFetch(
      `/calendars/${encodeURIComponent(calendarId)}/events`,
      {
        method: "POST",
        body: JSON.stringify({
          summary: `${student.selectedOption} — ${student.fullName}`,
          description: [
            `Website booking for ${student.fullName}`,
            `Email: ${student.email}`,
            `Phone: ${student.phone}`,
            `Booking type: ${student.bookingType}`,
          ].join("\n"),
          start: {
            dateTime: start.toISOString(),
            timeZone: CALENDAR_TIME_ZONE,
          },
          end: {
            dateTime: new Date(
              start.getTime() + CLASS_DURATION_MS,
            ).toISOString(),
            timeZone: CALENDAR_TIME_ZONE,
          },
          transparency:
            student.classTypeId === "private" ? "opaque" : "transparent",
          extendedProperties: {
            private: {
              source: "yoga-with-garima-website",
              bookingType: student.bookingType,
              classType: student.classTypeId,
            },
          },
        }),
      },
    )
    const event = await response.json()
    eventIds.push(event.id)
  }

  return {
    eventIds,
    eventStarts: eventStarts.map((date) => date.toISOString()),
  }
}
