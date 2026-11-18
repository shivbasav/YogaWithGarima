import {
  X,
  Video,
  MapPin,
  User,
  Users,
  UsersRound,
  Sparkles,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react"
import { useState, useEffect } from "react"
import { projectId, publicAnonKey } from "/utils/supabase/info.tsx"
import {
  BookingSlotPicker,
  formatBookingSlot,
  type BookingSlot,
} from "./BookingSlotPicker"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

const trialOptions = [
  {
    id: "group",
    icon: <Users size={24} />,
    title: "Group Trial",
    description: "Tue & Thurs 7:00 AM IST",
    details: "Online group sessions",
    price: "₹499",
    amount: 499,
    badge: "Popular",
  },
  {
    id: "private",
    icon: <User size={24} />,
    title: "Private Trial",
    description: "Based on availability",
    details: "One-on-one personalized session",
    price: "₹999",
    amount: 999,
    badge: "Premium",
  },
  {
    id: "elders",
    icon: <UsersRound size={24} />,
    title: "Yoga for Elders Trial",
    description: "Mon, Wed, Fri 6:30 PM IST",
    details: "Gentle yoga for seniors",
    price: "₹499",
    amount: 499,
    badge: null,
  },
]

const packageOptions = [
  {
    id: "group",
    icon: <Users size={24} />,
    title: "Group Sessions",
    description: "Tue & Thurs 7:00 AM IST",
    details: "Monthly package - Online group sessions",
    price: "₹3,500/month",
    amount: 3500,
    badge: "Popular",
  },
  {
    id: "private",
    icon: <User size={24} />,
    title: "Private Sessions",
    description: "Based on availability",
    details: "12 sessions in 1 month - One-on-one personalized",
    price: "₹18,000/month",
    amount: 18000,
    badge: "Premium",
  },
  {
    id: "elders",
    icon: <UsersRound size={24} />,
    title: "Yoga for Elders",
    description: "Mon, Wed, Fri 6:30 PM IST",
    details: "12 sessions in 1 month - Gentle yoga for seniors",
    price: "₹8,000/month",
    amount: 8000,
    badge: null,
  },
]

// Declare Razorpay type for TypeScript
declare global {
  interface Window {
    Razorpay: any
  }
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1) // 1: Select Type (Trial/Package), 2: Select Class, 3: Fill Details, 4: Payment/Confirmation
  const [bookingType, setBookingType] = useState<"trial" | "package" | null>(
    null,
  )
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [availableSlots, setAvailableSlots] = useState<BookingSlot[]>([])
  const [selectedSlots, setSelectedSlots] = useState<string[]>([])
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)
  const [slotsError, setSlotsError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    experienceLevel: "",
    healthConcerns: "",
    goals: "",
    preferredTime: "",
    hearAboutUs: "",
  })
  const bookingOptions = bookingType === "trial" ? trialOptions : packageOptions
  const currentOption = bookingOptions.find(
    (opt) => opt.title === selectedOption,
  )
  const requiredSlotCount =
    bookingType === "package" && currentOption?.id === "private" ? 12 : 1

  // Load Razorpay script
  useEffect(() => {
    if (
      !document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
      )
    ) {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup function to reset on unmount
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep(1)
      setBookingType(null)
      setSelectedOption(null)
      setPaymentSuccess(false)
      setIsProcessing(false)
      setAvailableSlots([])
      setSelectedSlots([])
      setSlotsError(null)
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        experienceLevel: "",
        healthConcerns: "",
        goals: "",
        preferredTime: "",
        hearAboutUs: "",
      })
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || step !== 3 || !bookingType || !currentOption) return

    const controller = new AbortController()
    const loadAvailability = async () => {
      setIsLoadingSlots(true)
      setSlotsError(null)
      setAvailableSlots([])
      setSelectedSlots([])
      try {
        const params = new URLSearchParams({
          classType: currentOption.id,
          bookingType,
        })
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-92c4f821/availability?${params}`,
          {
            headers: { Authorization: `Bearer ${publicAnonKey}` },
            signal: controller.signal,
          },
        )
        if (!response.ok) {
          const responseBody = await response.text()
          throw new Error(
            `Availability request failed (${response.status}): ${responseBody || response.statusText}`,
          )
        }
        const data = await response.json()
        setAvailableSlots(data.slots ?? [])
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error("Availability error:", error)
        setSlotsError(
          "We couldn't check the live calendar. Please try again shortly.",
        )
      } finally {
        if (!controller.signal.aborted) setIsLoadingSlots(false)
      }
    }

    loadAvailability()
    return () => controller.abort()
  }, [bookingType, currentOption, isOpen, step])

  if (!isOpen) return null

  const handleNext = () => {
    if (step === 1 && bookingType) {
      setStep(2)
    } else if (step === 2 && selectedOption) {
      setStep(3)
    } else if (step === 3) {
      setStep(4)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      if (step === 2) {
        setSelectedOption(null)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedSlots.length === requiredSlotCount) handleNext()
  }

  const handlePayment = async () => {
    if (!selectedOption || !currentOption) return

    setIsProcessing(true)

    try {
      // Step 1: Create Razorpay order on backend
      const orderResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-92c4f821/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            amount: currentOption.amount,
            currency: "INR",
            notes: {
              classType: selectedOption,
              studentName: formData.fullName,
              studentEmail: formData.email,
              selectedSlots: selectedSlots.join(","),
            },
          }),
        },
      )

      if (!orderResponse.ok) {
        throw new Error("Failed to create order")
      }

      const order = await orderResponse.json()

      // Step 2: Open Razorpay checkout
      const options = {
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: "Yoga with Garima",
        description: `Payment for ${selectedOption}`,
        image: "https://yogawithgarima.com/logo.png",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // Step 3: Verify payment on backend
            const verifyResponse = await fetch(
              `https://${projectId}.supabase.co/functions/v1/make-server-92c4f821/verify-payment`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${publicAnonKey}`,
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  studentData: {
                    ...formData,
                    selectedOption,
                    bookingType,
                    classType: currentOption.title,
                    classTypeId: currentOption.id,
                    selectedSlots,
                  },
                }),
              },
            )

            if (verifyResponse.ok) {
              const verification = await verifyResponse.json()
              setPaymentSuccess(true)
              if (!verification.calendarBooked) {
                alert(
                  "Your payment was successful, but we could not reserve the calendar sessions automatically. Garima will contact you to confirm your schedule.",
                )
              }
              setTimeout(() => {
                onClose()
              }, 2000)
            } else {
              alert("Payment verification failed. Please contact support.")
            }
          } catch (error) {
            console.error("Payment verification error:", error)
            alert(
              "Error verifying payment. Please contact support with your payment ID: " +
                response.razorpay_payment_id,
            )
          } finally {
            setIsProcessing(false)
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          classType: selectedOption,
          experienceLevel: formData.experienceLevel,
          bookingType: bookingType,
        },
        theme: {
          color: "#5a7a5a",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false)
          },
        },
      }

      const rzp = new window.Razorpay(options)

      rzp.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response.error)
        alert(`Payment failed: ${response.error.description}`)
        setIsProcessing(false)
      })

      rzp.open()
    } catch (error) {
      console.error("Error initiating payment:", error)
      alert("Error initiating payment. Please try again.")
      setIsProcessing(false)
    }
  }

  const isFormValid =
    formData.fullName &&
    formData.email &&
    formData.phone &&
    formData.experienceLevel &&
    selectedSlots.length === requiredSlotCount

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2c2c2c]/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-[#faf8f5] rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] flex flex-col pointer-events-auto animate-in zoom-in-95 fade-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#faf8f5] border-b border-[#e5ddd4] px-6 py-4 flex items-center justify-between rounded-t-3xl shrink-0">
            <div>
              <h2
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="text-3xl text-[#2c2c2c] mb-1"
              >
                Book a <span className="italic text-[#5a7a5a]">Class</span>
              </h2>
              <p className="text-xs text-[#2c2c2c]/60">
                Choose the perfect format for your practice
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#e5ddd4]/50 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} className="text-[#2c2c2c]/60" />
            </button>
          </div>

          {/* Content - Scrollable Area */}
          <div className="overflow-y-auto overflow-x-hidden px-6 py-5 scrollbar-custom rounded-[0px]">
            {step === 1 && (
              <>
                <div className="mb-6 text-center">
                  <p className="text-sm text-[#2c2c2c]/60 mb-8">
                    All classes are conducted{" "}
                    <strong className="text-[#5a7a5a]">online</strong>
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  {/* Trial Sessions Card */}
                  <div
                    onClick={() => setBookingType("trial")}
                    className={`relative bg-white rounded-3xl p-8 border-2 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                      bookingType === "trial"
                        ? "border-[#5a7a5a] shadow-xl"
                        : "border-[#e5ddd4] hover:border-[#5a7a5a]/50"
                    }`}
                  >
                    <div className="text-center">
                      <div
                        className={`inline-flex p-6 rounded-full mb-6 transition-colors ${
                          bookingType === "trial"
                            ? "bg-[#5a7a5a] text-white"
                            : "bg-[#e8f0e8] text-[#5a7a5a]"
                        }`}
                      >
                        <Sparkles size={40} />
                      </div>
                      <h3
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        className="text-3xl text-[#2c2c2c] mb-3"
                      >
                        Book{" "}
                        <span className="italic text-[#5a7a5a]">Trial</span>
                      </h3>
                      <p className="text-sm text-[#2c2c2c]/60 leading-relaxed mb-6">
                        Try a single session to experience the practice
                      </p>
                      <div className="space-y-2 text-xs text-[#2c2c2c]/70">
                        <p>✓ Perfect for first-timers</p>
                        <p>✓ No commitment required</p>
                        <p>✓ Experience before you commit</p>
                      </div>
                      <p className="text-2xl text-[#5a7a5a] font-semibold mt-6">
                        ₹499
                      </p>
                    </div>

                    {/* Radio indicator */}
                    <div
                      className={`absolute top-6 right-6 w-6 h-6 rounded-full border-2 transition-all ${
                        bookingType === "trial"
                          ? "border-[#5a7a5a] bg-[#5a7a5a]"
                          : "border-[#2c2c2c]/20"
                      }`}
                    >
                      {bookingType === "trial" && (
                        <div className="absolute inset-1 bg-white rounded-full" />
                      )}
                    </div>
                  </div>

                  {/* Packages Card */}
                  <div
                    onClick={() => setBookingType("package")}
                    className={`relative bg-white rounded-3xl p-8 border-2 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                      bookingType === "package"
                        ? "border-[#5a7a5a] shadow-xl"
                        : "border-[#e5ddd4] hover:border-[#5a7a5a]/50"
                    }`}
                  >
                    <div className="absolute top-3 right-3 px-3 py-1 bg-[#5a7a5a] text-white text-[10px] tracking-wide rounded-full">
                      BEST VALUE
                    </div>

                    <div className="text-center">
                      <div
                        className={`inline-flex p-6 rounded-full mb-6 transition-colors ${
                          bookingType === "package"
                            ? "bg-[#5a7a5a] text-white"
                            : "bg-[#e8f0e8] text-[#5a7a5a]"
                        }`}
                      >
                        <Video size={40} />
                      </div>
                      <h3
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        className="text-3xl text-[#2c2c2c] mb-3"
                      >
                        Book{" "}
                        <span className="italic text-[#5a7a5a]">Package</span>
                      </h3>
                      <p className="text-sm text-[#2c2c2c]/60 leading-relaxed mb-6">
                        Monthly packages for regular practice
                      </p>
                      <div className="space-y-2 text-xs text-[#2c2c2c]/70">
                        <p>✓ Best value for money</p>
                        <p>✓ Consistent practice schedule</p>
                        <p>✓ Monthly commitment</p>
                      </div>
                      <p className="text-2xl text-[#5a7a5a] font-semibold mt-6">
                        ₹3,500/month
                      </p>
                    </div>

                    {/* Radio indicator */}
                    <div
                      className={`absolute top-6 left-6 w-6 h-6 rounded-full border-2 transition-all ${
                        bookingType === "package"
                          ? "border-[#5a7a5a] bg-[#5a7a5a]"
                          : "border-[#2c2c2c]/20"
                      }`}
                    >
                      {bookingType === "package" && (
                        <div className="absolute inset-1 bg-white rounded-full" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons for Step 1 */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-6 border-t border-[#e5ddd4] max-w-3xl mx-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 border-2 border-[#e5ddd4] text-[#2c2c2c]/70 text-xs tracking-widest uppercase rounded-full hover:border-[#2c2c2c]/30 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!bookingType}
                    className={`flex-1 px-6 py-3 text-white text-xs tracking-widest uppercase rounded-full transition-all flex items-center justify-center gap-2 ${
                      bookingType
                        ? "bg-[#5a7a5a] hover:bg-[#4a6a4a] hover:shadow-lg"
                        : "bg-[#2c2c2c]/20 cursor-not-allowed"
                    }`}
                  >
                    Continue
                    <ArrowRight size={14} />
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="mb-6">
                  <p className="text-xs tracking-widest uppercase text-[#5a7a5a] mb-2">
                    Step 2 of 4
                  </p>
                  <h3
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    className="text-2xl text-[#2c2c2c] mb-1"
                  >
                    Choose Your{" "}
                    <span className="italic text-[#5a7a5a]">
                      {bookingType === "trial" ? "Trial" : "Package"}
                    </span>
                  </h3>
                  <p className="text-xs text-[#2c2c2c]/60">
                    Select the{" "}
                    {bookingType === "trial" ? "trial session" : "package"} that
                    fits your schedule
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-5">
                  {bookingOptions.map((option) => (
                    <div
                      key={option.title}
                      onClick={() => {
                        setSelectedOption(option.title)
                        setSelectedSlots([])
                      }}
                      className={`relative bg-white rounded-2xl p-4 border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedOption === option.title
                          ? "border-[#5a7a5a] shadow-lg"
                          : "border-[#e5ddd4] hover:border-[#5a7a5a]/50"
                      }`}
                    >
                      {option.badge && (
                        <span className="absolute top-3 right-3 px-2.5 py-0.5 bg-[#5a7a5a] text-white text-[10px] tracking-wide rounded-full">
                          {option.badge}
                        </span>
                      )}

                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className={`p-2.5 rounded-xl transition-colors ${
                            selectedOption === option.title
                              ? "bg-[#5a7a5a] text-white"
                              : "bg-[#e8f0e8] text-[#5a7a5a]"
                          }`}
                        >
                          {option.icon}
                        </div>
                        <div className="flex-1">
                          <h3
                            style={{
                              fontFamily: "'Cormorant Garamond', serif",
                            }}
                            className="text-xl text-[#2c2c2c] mb-0.5"
                          >
                            {option.title}
                          </h3>
                          <p className="text-xs text-[#5a7a5a] font-medium mb-1">
                            {option.description}
                          </p>
                          <p className="text-xs text-[#2c2c2c]/60 leading-relaxed">
                            {option.details}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-[#e5ddd4]">
                        <p className="text-[10px] tracking-widest uppercase text-[#2c2c2c]/40">
                          Price
                        </p>
                        <p className="text-xl text-[#5a7a5a] font-semibold">
                          {option.price}
                        </p>
                      </div>

                      {/* Radio indicator */}
                      <div
                        className={`absolute top-5 left-4 w-4 h-4 rounded-full border-2 transition-all ${
                          selectedOption === option.title
                            ? "border-[#5a7a5a] bg-[#5a7a5a]"
                            : "border-[#2c2c2c]/20"
                        }`}
                      >
                        {selectedOption === option.title && (
                          <div className="absolute inset-0.5 bg-white rounded-full" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons for Step 2 */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#e5ddd4]">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 px-6 py-3 border-2 border-[#e5ddd4] text-[#2c2c2c]/70 text-xs tracking-widest uppercase rounded-full hover:border-[#2c2c2c]/30 transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={14} />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!selectedOption}
                    className={`flex-1 px-6 py-3 text-white text-xs tracking-widest uppercase rounded-full transition-all flex items-center justify-center gap-2 ${
                      selectedOption
                        ? "bg-[#5a7a5a] hover:bg-[#4a6a4a] hover:shadow-lg"
                        : "bg-[#2c2c2c]/20 cursor-not-allowed"
                    }`}
                  >
                    Continue to Details
                    <ArrowRight size={14} />
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Progress indicator */}
                <div className="mb-6">
                  <p className="text-xs tracking-widest uppercase text-[#5a7a5a] mb-2">
                    Step 3 of 4
                  </p>
                  <h3
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    className="text-2xl text-[#2c2c2c] mb-1"
                  >
                    Your <span className="italic text-[#5a7a5a]">Details</span>
                  </h3>
                  <p className="text-xs text-[#2c2c2c]/60">
                    Tell us a bit about yourself
                  </p>
                </div>

                <BookingSlotPicker
                  slots={availableSlots}
                  selectedSlots={selectedSlots}
                  requiredCount={requiredSlotCount}
                  isLoading={isLoadingSlots}
                  error={slotsError}
                  onChange={setSelectedSlots}
                />

                {/* Personal Information */}
                <div className="bg-white rounded-2xl p-5 space-y-4">
                  <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/50 mb-3">
                    Personal Information
                  </p>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs tracking-wider uppercase text-[#2c2c2c]/50">
                      Full Name <span className="text-[#5a7a5a]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      placeholder="Enter your full name"
                      className="px-4 py-3 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] placeholder:text-[#2c2c2c]/30 transition-colors"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs tracking-wider uppercase text-[#2c2c2c]/50">
                        Email <span className="text-[#5a7a5a]">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="you@example.com"
                        className="px-4 py-3 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] placeholder:text-[#2c2c2c]/30 transition-colors"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs tracking-wider uppercase text-[#2c2c2c]/50">
                        Phone <span className="text-[#5a7a5a]">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className="px-4 py-3 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] placeholder:text-[#2c2c2c]/30 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs tracking-wider uppercase text-[#2c2c2c]/50">
                        Age
                      </label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) =>
                          setFormData({ ...formData, age: e.target.value })
                        }
                        placeholder="25"
                        className="px-4 py-3 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] placeholder:text-[#2c2c2c]/30 transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs tracking-wider uppercase text-[#2c2c2c]/50">
                        Gender
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) =>
                          setFormData({ ...formData, gender: e.target.value })
                        }
                        className="px-4 py-3 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] transition-colors"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">
                          Prefer not to say
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Yoga Background */}
                <div className="bg-white rounded-2xl p-5 space-y-4">
                  <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/50 mb-3">
                    Yoga Background
                  </p>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs tracking-wider uppercase text-[#2c2c2c]/50">
                      Experience Level <span className="text-[#5a7a5a]">*</span>
                    </label>
                    <select
                      value={formData.experienceLevel}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          experienceLevel: e.target.value,
                        })
                      }
                      className="px-4 py-3 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] transition-colors"
                      required
                    >
                      <option value="">Select your level</option>
                      <option value="complete-beginner">
                        Complete Beginner - Never tried yoga
                      </option>
                      <option value="beginner">
                        Beginner - 0-6 months practice
                      </option>
                      <option value="intermediate">
                        Intermediate - 6 months to 2 years
                      </option>
                      <option value="advanced">
                        Advanced - 2+ years regular practice
                      </option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs tracking-wider uppercase text-[#2c2c2c]/50">
                      Health Concerns or Injuries
                    </label>
                    <textarea
                      rows={2}
                      value={formData.healthConcerns}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          healthConcerns: e.target.value,
                        })
                      }
                      placeholder="E.g., back pain, knee injury, pregnancy..."
                      className="px-4 py-3 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] placeholder:text-[#2c2c2c]/30 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs tracking-wider uppercase text-[#2c2c2c]/50">
                      Your Goals
                    </label>
                    <textarea
                      rows={2}
                      value={formData.goals}
                      onChange={(e) =>
                        setFormData({ ...formData, goals: e.target.value })
                      }
                      placeholder="E.g., flexibility, stress relief, weight loss, spiritual growth..."
                      className="px-4 py-3 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] placeholder:text-[#2c2c2c]/30 transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* How did you hear about us */}
                <div className="bg-white rounded-2xl p-5 space-y-4">
                  <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/50 mb-3">
                    Additional Information
                  </p>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs tracking-wider uppercase text-[#2c2c2c]/50">
                      How did you hear about us?
                    </label>
                    <select
                      value={formData.hearAboutUs}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hearAboutUs: e.target.value,
                        })
                      }
                      className="px-4 py-3 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] transition-colors"
                    >
                      <option value="">Select an option</option>
                      <option value="google">Google Search</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="friend">Friend or Family</option>
                      <option value="workshop">Workshop or Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 px-6 py-3 border-2 border-[#e5ddd4] text-[#2c2c2c]/70 text-xs tracking-widest uppercase rounded-full hover:border-[#2c2c2c]/30 transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={14} />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`flex-1 px-6 py-3 text-white text-xs tracking-widest uppercase rounded-full transition-all flex items-center justify-center gap-2 ${
                      isFormValid
                        ? "bg-[#5a7a5a] hover:bg-[#4a6a4a] hover:shadow-lg"
                        : "bg-[#2c2c2c]/20 cursor-not-allowed"
                    }`}
                  >
                    Continue
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            )}

            {step === 4 && (
              <div className="space-y-5">
                {/* Progress indicator */}
                <div className="mb-4">
                  <p className="text-xs tracking-widest uppercase text-[#5a7a5a] mb-2">
                    Step 4 of 4
                  </p>
                  <h3
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    className="text-2xl text-[#2c2c2c] mb-1"
                  >
                    Review &{" "}
                    <span className="italic text-[#5a7a5a]">Confirm</span>
                  </h3>
                  <p className="text-xs text-[#2c2c2c]/60">
                    Please review your booking details
                  </p>
                </div>

                {/* Booking Summary */}
                <div className="bg-white rounded-2xl p-5 space-y-4">
                  <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/50 mb-3">
                    Class Selection
                  </p>

                  <div className="flex items-center gap-4 p-4 bg-[#e8f0e8] rounded-xl">
                    <div className="flex-1">
                      <h4 className="text-lg text-[#2c2c2c] font-semibold mb-1">
                        {selectedOption}
                      </h4>
                      <p className="text-xs text-[#5a7a5a] font-medium mb-0.5">
                        {currentOption?.description}
                      </p>
                      <p className="text-xs text-[#2c2c2c]/60">
                        {currentOption?.details}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl text-[#5a7a5a] font-semibold">
                        {currentOption?.price}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#e5ddd4] bg-[#faf8f5] p-4">
                    <p className="mb-2 text-xs tracking-widest uppercase text-[#2c2c2c]/50">
                      Session Schedule
                    </p>
                    {bookingType === "package" &&
                    currentOption?.id !== "private" ? (
                      <>
                        <p className="text-sm font-semibold text-[#2c2c2c]">
                          Starts{" "}
                          {selectedSlots[0]
                            ? formatBookingSlot(selectedSlots[0])
                            : ""}
                        </p>
                        <p className="mt-1 text-xs text-[#2c2c2c]/60">
                          The next 12 scheduled classes will be reserved.
                        </p>
                      </>
                    ) : (
                      <div className="grid gap-1.5 sm:grid-cols-2">
                        {selectedSlots.map((slot, index) => (
                          <p key={slot} className="text-xs text-[#2c2c2c]/70">
                            {selectedSlots.length > 1 ? `${index + 1}. ` : ""}
                            {formatBookingSlot(slot)}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Student Details Summary */}
                <div className="bg-white rounded-2xl p-5 space-y-3">
                  <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/50 mb-3">
                    Your Details
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-[#2c2c2c]/50 mb-1">Name</p>
                      <p className="text-[#2c2c2c]">{formData.fullName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#2c2c2c]/50 mb-1">Email</p>
                      <p className="text-[#2c2c2c]">{formData.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#2c2c2c]/50 mb-1">Phone</p>
                      <p className="text-[#2c2c2c]">{formData.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#2c2c2c]/50 mb-1">
                        Experience Level
                      </p>
                      <p className="text-[#2c2c2c] capitalize">
                        {formData.experienceLevel.replace("-", " ")}
                      </p>
                    </div>
                    {formData.age && (
                      <div>
                        <p className="text-xs text-[#2c2c2c]/50 mb-1">Age</p>
                        <p className="text-[#2c2c2c]">{formData.age}</p>
                      </div>
                    )}
                  </div>

                  {(formData.healthConcerns || formData.goals) && (
                    <div className="pt-3 border-t border-[#e5ddd4] space-y-2">
                      {formData.healthConcerns && (
                        <div>
                          <p className="text-xs text-[#2c2c2c]/50 mb-1">
                            Health Concerns
                          </p>
                          <p className="text-sm text-[#2c2c2c]">
                            {formData.healthConcerns}
                          </p>
                        </div>
                      )}
                      {formData.goals && (
                        <div>
                          <p className="text-xs text-[#2c2c2c]/50 mb-1">
                            Goals
                          </p>
                          <p className="text-sm text-[#2c2c2c]">
                            {formData.goals}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* What happens next */}
                <div className="bg-[#e8f0e8]/50 rounded-2xl p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <CheckCircle2 size={20} className="text-[#5a7a5a] mt-0.5" />
                    <div>
                      <p className="text-sm text-[#2c2c2c] font-semibold mb-1">
                        What happens next?
                      </p>
                      <p className="text-xs text-[#2c2c2c]/70 leading-relaxed">
                        After payment confirmation, you'll receive a welcome
                        email with class details and next steps to begin your
                        yoga journey.
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-[#2c2c2c]/60 space-y-1 pl-8">
                    <p>• First class includes personalized orientation</p>
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t border-[#e5ddd4]/50">
                    <p className="text-xs text-[#2c2c2c]/60 flex-1">
                      Questions? Contact us:
                    </p>
                    <a
                      href="https://wa.me/918698575395"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white border border-[#e5ddd4] text-[#5a7a5a] hover:bg-[#5a7a5a] hover:text-white hover:border-[#5a7a5a] transition-all"
                      title="WhatsApp"
                    >
                      <Phone size={14} />
                    </a>
                    <a
                      href="mailto:yogawithgarima@gmail.com"
                      className="p-2 rounded-full bg-white border border-[#e5ddd4] text-[#5a7a5a] hover:bg-[#5a7a5a] hover:text-white hover:border-[#5a7a5a] transition-all"
                      title="Email"
                    >
                      <Mail size={14} />
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 px-6 py-3 border-2 border-[#e5ddd4] text-[#2c2c2c]/70 text-xs tracking-widest uppercase rounded-full hover:border-[#2c2c2c]/30 transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={14} />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handlePayment}
                    className="flex-1 px-6 py-3 bg-[#5a7a5a] text-white text-xs tracking-widest uppercase rounded-full hover:bg-[#4a6a4a] hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    Proceed to Payment
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
