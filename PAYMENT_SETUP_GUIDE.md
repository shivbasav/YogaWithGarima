# 💳 Payment & Notification System - Complete Setup Guide

##  ✅ What's Been Implemented

Your yoga website now has a **complete payment and notification system** with:

1. **Razorpay Payment Integration** - Secure online payments
2. **WhatsApp Notifications** - Auto WhatsApp messages after payment
3. **Email Notifications** - Beautiful HTML email confirmations
4. **SMS Notifications** (Optional) - Text message alerts
5. **Payment Verification** - Server-side signature verification
6. **Student Data Storage** - All bookings stored in database

---

## 🚀 Setup Steps

### Step 1: Razorpay Setup (REQUIRED)

1. **Go to Razorpay Dashboard:**
   - Visit: https://dashboard.razorpay.com/
   - Sign up or log in with your existing account

2. **Get Your API Keys:**
   - Go to **Settings** → **API Keys**
   - Click **Generate Test Keys** (for testing) or **Generate Live Keys** (for production)
   - You'll see:
     - `Key ID` (e.g., `rzp_test_1DP5mmOlF5G5ag`)
     - `Key Secret` (e.g., `YOUR_SECRET_KEY`)

3. **Add Keys to Supabase Environment:**
   - Go to: https://supabase.com/dashboard/project/vnrjuoedmumtjonqyrzl/settings/api
   - Click **Edge Functions** → **Environment Variables**
   - Add these variables:
     ```
     RAZORPAY_KEY_ID=rzp_test_your_key_id
     RAZORPAY_KEY_SECRET=your_secret_key
     ```

4. **Update Frontend Code:**
   - Open `/src/app/components/BookingModal.tsx`
   - Find line with: `key: "rzp_test_your_key_id"`
   - Replace with your actual Razorpay Key ID:
     ```javascript
     key: "rzp_test_1DP5mmOlF5G5ag", // Your actual Key ID
     ```

---

### Step 2: WhatsApp Notifications via Twilio (RECOMMENDED)

1. **Sign Up for Twilio:**
   - Visit: https://www.twilio.com/try-twilio
   - Sign up for a free account (you get $15 credit)

2. **Get WhatsApp Sandbox:**
   - Go to **Messaging** → **Try it Out** → **Send a WhatsApp message**
   - Follow instructions to activate WhatsApp Sandbox
   - Send the activation code from your WhatsApp to the Twilio number

3. **Get Your Credentials:**
   - Go to **Account** → **Account Info**
   - Note down:
     - `Account SID` (e.g., `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
     - `Auth Token` (click to reveal)
   - Go to **Messaging** → **WhatsApp Sandbox** to get your WhatsApp number

4. **Add to Supabase Environment:**
   - Go to Supabase project settings → Edge Functions → Environment Variables
   - Add:
     ```
     TWILIO_ACCOUNT_SID=your_account_sid
     TWILIO_AUTH_TOKEN=your_auth_token
     TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
     ```

---

### Step 3: Email Notifications via Resend (RECOMMENDED)

1. **Sign Up for Resend:**
   - Visit: https://resend.com/signup
   - Sign up with your email
   - Free tier: 100 emails/day, 3,000 emails/month

2. **Get API Key:**
   - Go to **API Keys** in dashboard
   - Click **Create API Key**
   - Copy the key (starts with `re_`)

3. **Verify Your Domain** (Important for production):
   - Go to **Domains** → **Add Domain**
   - Add `yogawithgarima.com`
   - Add the DNS records shown (SPF, DKIM, DMARC)
   - Wait for verification (usually 5-10 minutes)

4. **Add to Supabase Environment:**
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```

5. **Update Email "From" Address:**
   - Open `/supabase/functions/server/index.tsx`
   - Find line with `from: "Yoga with Garima <noreply@yogawithgarima.com>"`
   - Make sure the domain matches your verified domain

---

### Step 4: SMS Notifications via Twilio (OPTIONAL)

1. **Get a Twilio Phone Number:**
   - In Twilio dashboard, go to **Phone Numbers** → **Buy a Number**
   - Select a number with SMS capability
   - Purchase it (free trial credit can be used)

2. **Add to Supabase Environment:**
   ```
   TWILIO_PHONE_NUMBER=+1234567890
   ```

*(SMS uses the same Account SID and Auth Token as WhatsApp)*

---

## 📋 Complete Environment Variables Checklist

Go to: https://supabase.com/dashboard/project/vnrjuoedmumtjonqyrzl/settings/functions

Add all these environment variables:

```env
# Razorpay (REQUIRED)
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Twilio for WhatsApp + SMS (RECOMMENDED)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
TWILIO_PHONE_NUMBER=+1234567890

# Resend for Email (RECOMMENDED)
RESEND_API_KEY=re_your_resend_api_key
```

---

## 🎯 Testing Your Setup

### Test Razorpay Payment:

1. Go to your website
2. Click "Book Now"
3. Select a class and fill in details
4. Click "Proceed to Payment"
5. Use Razorpay test cards:
   - **Success:** `4111 1111 1111 1111`
   - **Failure:** `4111 1111 1111 1234`
   - CVV: Any 3 digits
   - Expiry: Any future date
   - OTP: `1234` (for test mode)

### Test WhatsApp Notification:

1. Complete a test payment
2. Check the WhatsApp number you entered
3. You should receive a message within seconds:
   ```
   🧘‍♀️ Namaste [Name]!
   
   Your payment for [Class Type] has been confirmed! ✨
   
   Class Type: [Type]
   
   You'll receive class details and Zoom links (for online classes) shortly via email.
   
   We're excited to begin this journey with you!
   
   - Garima
   Yoga with Garima
   ```

### Test Email Notification:

1. Complete a test payment
2. Check the email address you entered
3. You should receive a beautifully formatted HTML email with:
   - Booking confirmation
   - Class details
   - Payment ID
   - Next steps
   - Contact information

---

## 🔄 Payment Flow Diagram

```
User fills booking form
        ↓
Clicks "Proceed to Payment"
        ↓
Frontend calls /create-order endpoint
        ↓
Backend creates Razorpay order
        ↓
Razorpay checkout opens
        ↓
User completes payment
        ↓
Frontend calls /verify-payment endpoint
        ↓
Backend verifies signature
        ↓
Payment stored in database
        ↓
Notifications sent:
  ├── WhatsApp message
  ├── Email confirmation
  └── SMS (optional)
        ↓
Success! User receives confirmation
```

---

## 💡 Important Notes

### For Testing (Test Mode):
- Use Razorpay TEST keys (`rzp_test_`)
- Use test WhatsApp Sandbox
- All payments are simulated
- No real money is charged

### For Production (Live Mode):
- Switch to Razorpay LIVE keys (`rzp_live_`)
- Apply for Twilio WhatsApp Business API (requires approval)
- Verify your domain with Resend
- Complete KYC with Razorpay
- All payments are REAL

### Security:
- ✅ Payment keys are stored in server environment variables
- ✅ Payment signature is verified on backend
- ✅ No sensitive data exposed to frontend
- ✅ HTTPS required for production

### Costs:
- **Razorpay:** 2% + ₹2 per transaction (India)
- **Twilio:** $0.0079/WhatsApp message, $0.0075/SMS
- **Resend:** Free up to 3,000 emails/month
- **Supabase:** Free tier sufficient for this setup

---

## 🛠️ Customization

### Change Notification Messages:

Edit `/supabase/functions/server/index.tsx`:

```typescript
// WhatsApp message (line ~156)
const message = `Your custom message here...`;

// Email HTML (line ~227)
const emailHtml = `Your custom email template...`;

// SMS message (line ~302)
const message = `Your custom SMS...`;
```

### Change Payment Logo:

Edit `/src/app/components/BookingModal.tsx` (line ~205):
```javascript
image: "https://yourdomain.com/logo.png",
```

### Add More Payment Options:

In `/src/app/components/BookingModal.tsx`, update the `bookingOptions` array to add/edit classes and prices.

---

## 🆘 Troubleshooting

### Payment not working:
- ✅ Check Razorpay keys are correct
- ✅ Ensure you're using TEST keys for testing
- ✅ Check browser console for errors
- ✅ Verify backend endpoint is accessible

### WhatsApp not sending:
- ✅ Verify Twilio credentials
- ✅ Check you've activated WhatsApp Sandbox
- ✅ Ensure phone number format is correct (+919876543210)
- ✅ Check Twilio logs for errors

### Email not sending:
- ✅ Verify Resend API key
- ✅ Check domain is verified (for production)
- ✅ Ensure "from" email matches verified domain
- ✅ Check Resend dashboard for logs

### Signature verification failed:
- ✅ Ensure RAZORPAY_KEY_SECRET is correct
- ✅ Check there are no extra spaces in env variable
- ✅ Verify payment is reaching /verify-payment endpoint

---

## 📊 Monitoring & Logs

### Check Backend Logs:
- Go to: https://supabase.com/dashboard/project/vnrjuoedmumtjonqyrzl/functions
- Click on `server` function
- View **Logs** tab for errors and debug info

### Check Stored Payments:
Payments are stored in KV store with key: `payment:{payment_id}`

To retrieve:
```typescript
import * as kv from '/supabase/functions/server/kv_store.tsx';
const payments = await kv.getByPrefix('payment:');
```

---

## 🎉 You're All Set!

Once you've completed all the setup steps above:

1. ✅ Payments will be securely processed via Razorpay
2. ✅ Students will receive instant WhatsApp confirmation
3. ✅ Beautiful email confirmations will be sent automatically
4. ✅ Optional SMS notifications will be sent
5. ✅ All booking data will be stored in your database

**Test everything thoroughly before going live!**

---

## 📞 Need Help?

- **Razorpay Docs:** https://razorpay.com/docs/
- **Twilio Docs:** https://www.twilio.com/docs/whatsapp
- **Resend Docs:** https://resend.com/docs
- **Supabase Support:** https://supabase.com/docs

---

**Last Updated:** March 30, 2026
