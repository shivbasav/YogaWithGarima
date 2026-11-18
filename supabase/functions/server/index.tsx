import { Hono } from "npm:hono"
import { cors } from "npm:hono/cors"
import { logger } from "npm:hono/logger"
import * as kv from "./kv_store.tsx"
import {
  createBookingEvents,
  getAvailableSlots,
  isCalendarBookingType,
  isCalendarClassType,
} from "./google_calendar.tsx"

const app = new Hono()

// Enable logger
app.use("*", logger(console.log))

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
)

// Health check endpoint
app.get("/make-server-92c4f821/health", (c) => {
  return c.json({ status: "ok", calendarIntegration: "enabled" })
})

// Return live availability after applying Google Calendar conflicts and booking rules.
app.get("/make-server-92c4f821/availability", async (c) => {
  try {
    const classType = c.req.query("classType") ?? ""
    const bookingType = c.req.query("bookingType") ?? ""

    if (
      !isCalendarClassType(classType) ||
      !isCalendarBookingType(bookingType)
    ) {
      return c.json({ error: "Invalid class type or booking type" }, 400)
    }

    const slots = await getAvailableSlots(classType, bookingType)
    return c.json({
      slots,
      timeZone: "Asia/Kolkata",
      minimumNoticeHours: 24,
      bookingHorizonDays: 30,
    })
  } catch (error) {
    console.error("Error loading Google Calendar availability:", error)
    return c.json({ error: "Unable to load live availability" }, 500)
  }
})

// Create Razorpay order
app.post("/make-server-92c4f821/create-order", async (c) => {
  try {
    const body = await c.req.json()
    const { amount, currency = "INR", notes } = body

    const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID")
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET")

    if (!razorpayKeyId || !razorpayKeySecret) {
      return c.json({ error: "Razorpay credentials not configured" }, 500)
    }

    // Create Razorpay order using their REST API
    const orderData = {
      amount: amount * 100, // Amount in paise (smallest currency unit)
      currency,
      notes: notes || {},
    }

    const basicAuth = btoa(`${razorpayKeyId}:${razorpayKeySecret}`)

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuth}`,
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Razorpay order creation error:", errorText)
      return c.json(
        { error: "Failed to create Razorpay order", details: errorText },
        500,
      )
    }

    const order = await response.json()
    console.log("Razorpay order created successfully:", order.id)

    // Include key_id so frontend doesn't need to hardcode it
    return c.json({ ...order, key_id: razorpayKeyId })
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    return c.json({ error: "Internal server error while creating order" }, 500)
  }
})

// Verify payment and send notifications
app.post("/make-server-92c4f821/verify-payment", async (c) => {
  try {
    const body = await c.req.json()
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      studentData,
    } = body

    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET")

    if (!razorpayKeySecret) {
      return c.json({ error: "Razorpay credentials not configured" }, 500)
    }

    // Verify signature
    const crypto = await import("node:crypto")
    const expectedSignature = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex")

    if (expectedSignature !== razorpay_signature) {
      console.error("Payment signature verification failed")
      return c.json({ error: "Invalid payment signature" }, 400)
    }

    console.log("Payment verified successfully:", razorpay_payment_id)

    let calendarBooking = null
    let calendarError = null
    try {
      if (
        !isCalendarClassType(studentData?.classTypeId) ||
        !isCalendarBookingType(studentData?.bookingType)
      ) {
        throw new Error("Invalid calendar booking details")
      }
      calendarBooking = await createBookingEvents(studentData)
    } catch (error) {
      calendarError =
        error instanceof Error ? error.message : "Calendar booking failed"
      console.error("Calendar booking error after successful payment:", error)
    }

    // Store payment and calendar details in KV store
    await kv.set(`payment:${razorpay_payment_id}`, {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      studentData,
      calendarBooking,
      calendarError,
      timestamp: new Date().toISOString(),
      status: calendarBooking ? "completed" : "calendar_action_required",
    })

    // Send notifications
    try {
      await sendNotifications(studentData, razorpay_payment_id)
    } catch (notificationError) {
      console.error(
        "Notification error (payment still succeeded):",
        notificationError,
      )
      // Don't fail the payment verification if notifications fail
    }

    return c.json({
      success: true,
      message: calendarBooking
        ? "Payment verified and sessions booked"
        : "Payment verified; calendar booking needs manual review",
      paymentId: razorpay_payment_id,
      calendarBooked: Boolean(calendarBooking),
      calendarError,
    })
  } catch (error) {
    console.error("Error verifying payment:", error)
    return c.json(
      { error: "Internal server error while verifying payment" },
      500,
    )
  }
})

// Function to send notifications via WhatsApp and SMS/Email
async function sendNotifications(studentData: any, paymentId: string) {
  const { fullName, email, phone, classType, selectedOption } = studentData

  // Send WhatsApp notification using Twilio or WhatsApp Business API
  await sendWhatsAppNotification(phone, fullName, classType, selectedOption)

  // Send Email notification
  await sendEmailNotification(
    email,
    fullName,
    classType,
    selectedOption,
    paymentId,
  )

  // Send SMS notification (optional)
  await sendSMSNotification(phone, fullName, classType)
}

// WhatsApp notification using Twilio
async function sendWhatsAppNotification(
  phone: string,
  name: string,
  classType: string,
  selectedOption: string,
) {
  try {
    const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID")
    const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN")
    const twilioWhatsAppNumber = Deno.env.get("TWILIO_WHATSAPP_NUMBER") // Format: whatsapp:+14155238886

    if (!twilioAccountSid || !twilioAuthToken || !twilioWhatsAppNumber) {
      console.warn(
        "Twilio credentials not configured, skipping WhatsApp notification",
      )
      return
    }

    const message = `🧘‍♀️ Namaste ${name}!\n\nYour payment for ${selectedOption} has been confirmed! ✨\n\nClass Type: ${classType}\n\nYou'll receive class details and Zoom links (for online classes) shortly via email.\n\nWe're excited to begin this journey with you!\n\n- Garima\nYoga with Garima`

    const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`

    const basicAuth = btoa(`${twilioAccountSid}:${twilioAuthToken}`)
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${basicAuth}`,
        },
        body: new URLSearchParams({
          From: twilioWhatsAppNumber,
          To: `whatsapp:${formattedPhone}`,
          Body: message,
        }),
      },
    )

    if (response.ok) {
      console.log("WhatsApp notification sent successfully to:", phone)
    } else {
      const errorText = await response.text()
      console.error("Failed to send WhatsApp notification:", errorText)
    }
  } catch (error) {
    console.error("Error sending WhatsApp notification:", error)
  }
}

// Email notification using Resend or SMTP
async function sendEmailNotification(
  email: string,
  name: string,
  classType: string,
  selectedOption: string,
  paymentId: string,
) {
  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY")

    if (!resendApiKey) {
      console.warn("Resend API key not configured, skipping email notification")
      return
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #2c2c2c; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #5a7a5a 0%, #4a6a4a 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #faf8f5; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: #5a7a5a; color: white; text-decoration: none; border-radius: 25px; margin: 20px 0; }
            .details { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🧘‍♀️ Welcome to Yoga with Garima!</h1>
            </div>
            <div class="content">
              <p>Namaste ${name},</p>
              
              <p>Thank you for choosing to begin your yoga journey with us! Your payment has been successfully confirmed.</p>
              
              <div class="details">
                <h3>Booking Details</h3>
                <p><strong>Class Type:</strong> ${selectedOption}</p>
                <p><strong>Category:</strong> ${classType}</p>
                <p><strong>Payment ID:</strong> ${paymentId}</p>
              </div>

              <h3>What's Next?</h3>
              <ul>
                <li>You'll receive class schedule details within 24 hours</li>
                <li>Online class participants will get Zoom links via email</li>
                <li>Offline class participants will receive studio location details</li>
                <li>Personal session participants will be contacted to schedule your first session</li>
              </ul>

              <p>If you have any questions, feel free to reach out to us on WhatsApp or email.</p>

              <a href="https://www.yogawithgarima.com/contact" class="button">Contact Us</a>

              <p>Looking forward to seeing you on the mat!</p>
              <p><em>With gratitude,<br>Garima</em></p>
            </div>
            <div class="footer">
              <p>Yoga with Garima | www.yogawithgarima.com</p>
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Yoga with Garima <noreply@yogawithgarima.com>",
        to: email,
        subject: "🧘‍♀️ Payment Confirmed - Welcome to Yoga with Garima!",
        html: emailHtml,
      }),
    })

    if (response.ok) {
      console.log("Email notification sent successfully to:", email)
    } else {
      const errorText = await response.text()
      console.error("Failed to send email notification:", errorText)
    }
  } catch (error) {
    console.error("Error sending email notification:", error)
  }
}

// SMS notification using Twilio
async function sendSMSNotification(
  phone: string,
  name: string,
  classType: string,
) {
  try {
    const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID")
    const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN")
    const twilioPhoneNumber = Deno.env.get("TWILIO_PHONE_NUMBER")

    if (!twilioAccountSid || !twilioAuthToken || !twilioPhoneNumber) {
      console.warn(
        "Twilio SMS credentials not configured, skipping SMS notification",
      )
      return
    }

    const message = `Namaste ${name}! Your payment for ${classType} has been confirmed. You'll receive class details via email shortly. - Yoga with Garima`

    const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`

    const basicAuth = btoa(`${twilioAccountSid}:${twilioAuthToken}`)
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${basicAuth}`,
        },
        body: new URLSearchParams({
          From: twilioPhoneNumber,
          To: formattedPhone,
          Body: message,
        }),
      },
    )

    if (response.ok) {
      console.log("SMS notification sent successfully to:", phone)
    } else {
      const errorText = await response.text()
      console.error("Failed to send SMS notification:", errorText)
    }
  } catch (error) {
    console.error("Error sending SMS notification:", error)
  }
}

Deno.serve(app.fetch)
