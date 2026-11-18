import { useEffect, useMemo, useState } from "react"
import { CalendarDays, Check, Clock, LoaderCircle } from "lucide-react"
import { Button } from "./ui/button"

export interface BookingSlot {
  start: string
  end: string
}

interface BookingSlotPickerProps {
  slots: BookingSlot[]
  selectedSlots: string[]
  requiredCount: number
  isLoading: boolean
  error: string | null
  onChange: (slots: string[]) => void
}

const dateKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
})

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  weekday: "short",
  day: "numeric",
  month: "short",
})

const timeFormatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
})

export function formatBookingSlot(start: string) {
  const date = new Date(start)
  return `${dateFormatter.format(date)} at ${timeFormatter.format(date)}`
}

export function BookingSlotPicker({
  slots,
  selectedSlots,
  requiredCount,
  isLoading,
  error,
  onChange,
}: BookingSlotPickerProps) {
  const groupedSlots = useMemo(() => {
    const groups = new Map<string, BookingSlot[]>()
    for (const slot of slots) {
      const key = dateKeyFormatter.format(new Date(slot.start))
      groups.set(key, [...(groups.get(key) ?? []), slot])
    }
    return [...groups.entries()]
  }, [slots])
  const [activeDate, setActiveDate] = useState("")

  useEffect(() => {
    if (!groupedSlots.some(([date]) => date === activeDate)) {
      setActiveDate(groupedSlots[0]?.[0] ?? "")
    }
  }, [activeDate, groupedSlots])

  const toggleSlot = (start: string) => {
    if (requiredCount === 1) {
      onChange([start])
      return
    }
    if (selectedSlots.includes(start)) {
      onChange(selectedSlots.filter((slot) => slot !== start))
    } else if (selectedSlots.length < requiredCount) {
      onChange([...selectedSlots, start].sort())
    }
  }

  return (
    <div className="rounded-2xl border border-[#e5ddd4] bg-white p-5">
      <div className="mb-4 flex items-start gap-3">
        <div className="rounded-xl bg-[#e8f0e8] p-2.5 text-[#5a7a5a]">
          <CalendarDays size={20} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#2c2c2c]">
            Choose your session time
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[#2c2c2c]/60">
            Times are shown in IST. Bookings require at least 24 hours&apos;
            notice.
          </p>
          {requiredCount > 1 && (
            <p className="mt-2 text-xs font-medium text-[#5a7a5a]">
              {selectedSlots.length} of {requiredCount} sessions selected
            </p>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-10 text-sm text-[#2c2c2c]/60">
          <LoaderCircle className="animate-spin text-[#5a7a5a]" size={18} />
          Checking Garima&apos;s calendar…
        </div>
      )}

      {!isLoading && error && (
        <div
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {error}
        </div>
      )}

      {!isLoading && !error && groupedSlots.length === 0 && (
        <div className="rounded-xl bg-[#faf8f5] px-4 py-8 text-center text-sm text-[#2c2c2c]/60">
          No sessions are available in the next 30 days. Please contact us for
          help.
        </div>
      )}

      {!isLoading && !error && groupedSlots.length > 0 && (
        <>
          <div className="scrollbar-custom mb-4 flex gap-2 overflow-x-auto pb-2">
            {groupedSlots.map(([date, dateSlots]) => (
              <Button
                key={date}
                type="button"
                variant="outline"
                onClick={() => setActiveDate(date)}
                className={`h-auto min-w-24 shrink-0 rounded-xl px-3 py-2 ${
                  activeDate === date
                    ? "border-[#5a7a5a] bg-[#e8f0e8] text-[#2c2c2c]"
                    : "border-[#e5ddd4] bg-[#faf8f5] text-[#2c2c2c]/70"
                }`}
              >
                <span className="flex flex-col items-center">
                  <span className="text-xs font-semibold">
                    {dateFormatter.format(new Date(dateSlots[0].start))}
                  </span>
                  <span className="text-[10px] font-normal opacity-60">
                    {dateSlots.length}{" "}
                    {dateSlots.length === 1 ? "time" : "times"}
                  </span>
                </span>
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {(
              groupedSlots.find(([date]) => date === activeDate)?.[1] ?? []
            ).map((slot) => {
              const selected = selectedSlots.includes(slot.start)
              const selectionFull =
                requiredCount > 1 && selectedSlots.length >= requiredCount
              return (
                <Button
                  key={slot.start}
                  type="button"
                  variant="outline"
                  disabled={!selected && selectionFull}
                  onClick={() => toggleSlot(slot.start)}
                  className={`rounded-xl border py-5 ${
                    selected
                      ? "border-[#5a7a5a] bg-[#5a7a5a] text-white hover:bg-[#4a6a4a] hover:text-white"
                      : "border-[#e5ddd4] bg-[#faf8f5] text-[#2c2c2c] hover:border-[#5a7a5a] hover:bg-[#e8f0e8]"
                  }`}
                >
                  {selected ? <Check size={15} /> : <Clock size={15} />}
                  {timeFormatter.format(new Date(slot.start))}
                </Button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
