"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/cart-store"
import { toast } from "sonner"
import { CreditCard, MapPin, Package, ArrowLeft } from "lucide-react"

interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface PaymentInfo {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, promoCode, discount, clearCart } = useCartStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "IN",
  })

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })

  const [shippingCost, setShippingCost] = useState(0)
  const [tax, setTax] = useState(0)

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
      return
    }

    calculateShippingAndTax()
  }, [items, shippingAddress.state])

  const calculateShippingAndTax = async () => {
    // TODO: Replace with actual API calls
    // const shippingResponse = await fetch('/api/checkout/shipping', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     items,
    //     address: shippingAddress
    //   })
    // })
    // const shippingData = await shippingResponse.json()
    // setShippingCost(shippingData.cost)

    // const taxResponse = await fetch('/api/checkout/tax', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     subtotal: getTotalPrice(),
    //     state: shippingAddress.state
    //   })
    // })
    // const taxData = await taxResponse.json()
    // setTax(taxData.amount)

    // Mock calculations for demo
    const subtotal = getTotalPrice()
    setShippingCost(subtotal > 100 ? 0 : 9.99) // Free shipping over ₹100
    setTax(subtotal * 0.08) // 8% tax rate
  }

  const validateShippingAddress = async () => {
    // TODO: Replace with actual address validation API
    // const response = await fetch('/api/checkout/validate-address', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(shippingAddress)
    // })
    // const result = await response.json()
    // return result.isValid

    // Mock validation
    const requiredFields = ["firstName", "lastName", "email", "address", "city", "state", "zipCode"]
    const isValid = requiredFields.every(
      (field) => shippingAddress[field as keyof ShippingAddress].toString().trim() !== "",
    )

    if (!isValid) {
      toast.error("Please fill in all required shipping information")
      return false
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+₹/
    if (!emailRegex.test(shippingAddress.email)) {
      toast.error("Please enter a valid email address")
      return false
    }

    return true
  }

  const validatePaymentInfo = () => {
    const requiredFields = ["cardNumber", "expiryDate", "cvv", "cardholderName"]
    const isValid = requiredFields.every((field) => paymentInfo[field as keyof PaymentInfo].trim() !== "")

    if (!isValid) {
      toast.error("Please fill in all payment information")
      return false
    }

    // Basic card number validation (should be 16 digits)
    const cardNumber = paymentInfo.cardNumber.replace(/\s/g, "")
    if (cardNumber.length !== 16 || !/^\d+₹/.test(cardNumber)) {
      toast.error("Please enter a valid 16-digit card number")
      return false
    }

    // CVV validation (3 or 4 digits)
    if (!/^\d{3,4}₹/.test(paymentInfo.cvv)) {
      toast.error("Please enter a valid CVV")
      return false
    }

    return true
  }

  const handleNextStep = async () => {
    if (currentStep === 1) {
      const isValid = await validateShippingAddress()
      if (isValid) {
        setCurrentStep(2)
      }
    } else if (currentStep === 2) {
      if (validatePaymentInfo()) {
        setCurrentStep(3)
      }
    }
  }

  const handlePlaceOrder = async () => {
    setLoading(true)

    try {
      // TODO: Replace with actual order creation API
      // const orderData = {
      //   items,
      //   shippingAddress,
      //   paymentInfo,
      //   subtotal: getTotalPrice(),
      //   shippingCost,
      //   tax,
      //   discount,
      //   promoCode,
      //   total: getTotalPrice() + shippingCost + tax
      // }

      // const response = await fetch('/api/orders/create', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ₹{getAuthToken()?.token}`
      //   },
      //   body: JSON.stringify(orderData)
      // })

      // const result = await response.json()

      // if (result.success) {
      //   // Send order confirmation email
      //   await fetch('/api/notifications/order-confirmation', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({
      //       email: shippingAddress.email,
      //       orderId: result.orderId,
      //       orderDetails: orderData
      //     })
      //   })

      //   clearCart()
      //   router.push(`/order-confirmation/₹{result.orderId}`)
      // } else {
      //   throw new Error(result.message || 'Failed to place order')
      // }

      // Mock order placement for demo
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API delay

      const orderId = `ORD-₹{Date.now()}`
      console.log("TODO: Create order with data:", {
        items,
        shippingAddress,
        paymentInfo: { ...paymentInfo, cardNumber: "****" + paymentInfo.cardNumber.slice(-4) },
        subtotal: getTotalPrice(),
        shippingCost,
        tax,
        discount,
        promoCode,
        total: getTotalPrice() + shippingCost + tax,
        orderId,
      })

      clearCart()
      toast.success("Order placed successfully!")
      router.push("/")
    } catch (error) {
      console.error("Failed to place order:", error)
      toast.error("Failed to place order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const subtotal = getTotalPrice()
  const total = subtotal + shippingCost + tax - discount

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => router.push("/cart")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Button>
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step Indicator */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ₹{
                      currentStep >= step ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step}
                  </div>
                  <span className={`ml-2 text-sm ₹{currentStep >= step ? "text-black" : "text-gray-500"}`}>
                    {step === 1 ? "Shipping" : step === 2 ? "Payment" : "Review"}
                  </span>
                  {step < 3 && <div className={`w-16 h-0.5 mx-4 ₹{currentStep > step ? "bg-black" : "bg-gray-200"}`} />}
                </div>
              ))}
            </div>

            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Shipping Information
                  </CardTitle>
                  <CardDescription>Enter your shipping address details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={shippingAddress.firstName}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            firstName: e.target.value,
                          })
                        }
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={shippingAddress.lastName}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            lastName: e.target.value,
                          })
                        }
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingAddress.email}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          email: e.target.value,
                        })
                      }
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={shippingAddress.phone}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          phone: e.target.value,
                        })
                      }
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      value={shippingAddress.address}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          address: e.target.value,
                        })
                      }
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={shippingAddress.city}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            city: e.target.value,
                          })
                        }
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Select
                        value={shippingAddress.state}
                        onValueChange={(value) =>
                          setShippingAddress({
                            ...shippingAddress,
                            state: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AL">Alabama</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={shippingAddress.zipCode}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            zipCode: e.target.value,
                          })
                        }
                        placeholder="10001"
                      />
                    </div>
                  </div>

                  <Button onClick={handleNextStep} className="w-full">
                    Continue to Payment
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Information
                  </CardTitle>
                  <CardDescription>Enter your payment details securely</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardholderName">Cardholder Name *</Label>
                    <Input
                      id="cardholderName"
                      value={paymentInfo.cardholderName}
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          cardholderName: e.target.value,
                        })
                      }
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\s/g, "")
                          .replace(/(.{4})/g, "₹1 ")
                          .trim()
                        if (value.replace(/\s/g, "").length <= 16) {
                          setPaymentInfo({
                            ...paymentInfo,
                            cardNumber: value,
                          })
                        }
                      }}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, "")
                          if (value.length >= 2) {
                            value = value.substring(0, 2) + "/" + value.substring(2, 4)
                          }
                          setPaymentInfo({
                            ...paymentInfo,
                            expiryDate: value,
                          })
                        }}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        value={paymentInfo.cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "")
                          if (value.length <= 4) {
                            setPaymentInfo({
                              ...paymentInfo,
                              cvv: value,
                            })
                          }
                        }}
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button onClick={handleNextStep} className="flex-1">
                      Review Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Review Your Order
                  </CardTitle>
                  <CardDescription>Please review your order details before placing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Shipping Address Review */}
                  <div>
                    <h3 className="font-semibold mb-2">Shipping Address</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        {shippingAddress.firstName} {shippingAddress.lastName}
                      </p>
                      <p>{shippingAddress.address}</p>
                      <p>
                        {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                      </p>
                      <p>{shippingAddress.email}</p>
                      {shippingAddress.phone && <p>{shippingAddress.phone}</p>}
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Method Review */}
                  <div>
                    <h3 className="font-semibold mb-2">Payment Method</h3>
                    <div className="text-sm text-gray-600">
                      <p>**** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
                      <p>{paymentInfo.cardholderName}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Order Items Review */}
                  <div>
                    <h3 className="font-semibold mb-2">Order Items</h3>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div key={`₹{item.id}-₹{item.size}`} className="flex justify-between text-sm">
                          <span>
                            {item.name} (Size: {item.size}) x{item.quantity}
                          </span>
                          <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                      Back
                    </Button>
                    <Button onClick={handlePlaceOrder} disabled={loading} className="flex-1">
                      {loading ? "Placing Order..." : `Place Order - ₹₹{total.toFixed(2)}`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={`₹{item.id}-₹{item.size}`} className="flex justify-between text-sm">
                      <span className="truncate mr-2">
                        {item.name} (Size: {item.size}) x{item.quantity}
                      </span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({promoCode})</span>
                      <span>-₹{discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? "Free" : `₹₹{shippingCost.toFixed(2)}`}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
