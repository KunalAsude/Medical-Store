"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, Package, CheckCircle, ChevronRight, ChevronLeft, Truck, ShieldCheck } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

const Checkout = () => {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    shippingMethod: "standard",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [orderId, setOrderId] = useState("")
  const [paymentId, setPaymentId] = useState("")

  // Mock order summary data
  const orderSummary = {
    subtotal: 1299.97,
    shipping: formData.shippingMethod === "express" ? 99 : 0,
    tax: 129.99,
    total: formData.shippingMethod === "express" ? 1528.96 : 1429.96,
    items: [
      { name: "Premium Headphones", price: 599.99, quantity: 1 },
      { name: "Wireless Keyboard", price: 349.99, quantity: 1 },
      { name: "Smart Watch", price: 349.99, quantity: 1 }
    ]
  }

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleShippingMethodChange = (value) => {
    setFormData({ ...formData, shippingMethod: value })
  }

  const validateStep = () => {
    const newErrors = {}
    
    if (step === 1) {
      if (!formData.fullName) newErrors.fullName = "Full name is required"
      if (!formData.email) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid"
      }
      if (!formData.phone) newErrors.phone = "Phone number is required"
      if (!formData.address) newErrors.address = "Address is required"
      if (!formData.city) newErrors.city = "City is required"
      if (!formData.state) newErrors.state = "State is required"
      if (!formData.zipCode) newErrors.zipCode = "ZIP code is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep()) {
      if (step === 1) {
        // If moving from shipping to payment, initiate Razorpay flow
        initiateRazorpayPayment()
      } else {
        setStep(step + 1)
      }
    }
  }

  const prevStep = () => setStep(step - 1)

  // Create Razorpay order
  const createRazorpayOrder = async () => {
    try {
      setPaymentProcessing(true)
      const response = await fetch('/api/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          amount: orderSummary.total
        }),
      })
      const data = await response.json()
      
      if (data.success) {
        setOrderId(data.orderId)
        return data.orderId
      } else {
        throw new Error(data.error || 'Failed to create payment order')
      }
    } catch (error) {
      console.error('Payment order creation failed:', error)
      setPaymentProcessing(false)
      alert('Payment initiation failed. Please try again.')
      return null
    }
  }

  // Initiate Razorpay payment
  const initiateRazorpayPayment = async () => {
    const orderId = await createRazorpayOrder()
    if (!orderId) return

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: Math.round(orderSummary.total * 100),
      currency: 'INR',
      name: 'Your Tech Store',
      description: 'Purchase of electronic items',
      order_id: orderId,
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone
      },
      handler: function (response) {
        handlePaymentSuccess(response)
      },
      modal: {
        ondismiss: function() {
          setPaymentProcessing(false)
        }
      },
      theme: {
        color: '#3399cc'
      }
    }

    try {
      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    } catch (error) {
      console.error('Razorpay initialization failed:', error)
      setPaymentProcessing(false)
      alert('Payment gateway initialization failed. Please try again.')
    }
  }

  // Handle payment success
  const handlePaymentSuccess = (response) => {
    setPaymentProcessing(false)
    setPaymentSuccess(true)
    setPaymentId(response.razorpay_payment_id)
    
    // Here you would normally verify the payment with your backend
    // For this example, we'll just proceed to the next step
    setStep(2) // Move to review step
  }

  const handleSubmit = () => {
    if (!validateStep()) return
    
    setLoading(true)
    
    // Simulate API call to complete order
    setTimeout(() => {
      setLoading(false)
      setStep(3) // Success step
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8 w-full">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center">Checkout</h1>
        <p className="text-muted-foreground text-center mt-2">Complete your purchase securely</p>
      </div>
      
      {/* Checkout Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <div className={`flex flex-col items-center ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <Package className="h-5 w-5" />
            </div>
            <span className="text-xs md:text-sm">Shipping</span>
          </div>
          
          <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
          
          <div className={`flex flex-col items-center ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <CreditCard className="h-5 w-5" />
            </div>
            <span className="text-xs md:text-sm">Review</span>
          </div>
          
          <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
          
          <div className={`flex flex-col items-center ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <CheckCircle className="h-5 w-5" />
            </div>
            <span className="text-xs md:text-sm">Confirmation</span>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="border-0">
            <CardHeader>
              <CardTitle>
                {step === 1 && "Shipping Information"}
                {step === 2 && "Review Order"}
                {step === 3 && "Order Confirmation"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Enter your shipping details"}
                {step === 2 && "Review your order before confirming"}
                {step === 3 && "Your order has been placed successfully"}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {/* Step 1: Shipping Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleChange}
                        className={errors.fullName ? "border-destructive" : "border border-black"}
                      />
                      {errors.fullName && (
                        <p className="text-destructive text-sm">{errors.fullName}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleChange}
                        className={errors.email ? "border-destructive" : "border border-black"}
                      />
                      {errors.email && (
                        <p className="text-destructive text-sm">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange}
                      className={errors.phone ? "border-destructive" : "border border-black"}
                    />
                    {errors.phone && (
                      <p className="text-destructive text-sm">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleChange}
                      className={errors.address ? "border-destructive" : "border border-black"}
                    />
                    {errors.address && (
                      <p className="text-destructive text-sm">{errors.address}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        name="city" 
                        value={formData.city} 
                        onChange={handleChange}
                        className={errors.city ? "border-destructive" : "border border-black"}
                      />
                      {errors.city && (
                        <p className="text-destructive text-sm">{errors.city}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input 
                        id="state" 
                        name="state" 
                        value={formData.state} 
                        onChange={handleChange}
                        className={errors.state ? "border-destructive" : "border border-black"}
                      />
                      {errors.state && (
                        <p className="text-destructive text-sm">{errors.state}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input 
                        id="zipCode" 
                        name="zipCode" 
                        value={formData.zipCode} 
                        onChange={handleChange}
                        className={errors.zipCode ? "border-destructive" : "border border-black"}
                      />
                      {errors.zipCode && (
                        <p className="text-destructive text-sm">{errors.zipCode}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input 
                      id="country" 
                      name="country" 
                      value={formData.country} 
                      onChange={handleChange}
                      disabled
                      className="border border-black"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Label className="mb-3 block">Shipping Method</Label>
                    <RadioGroup 
                      value={formData.shippingMethod} 
                      onValueChange={handleShippingMethodChange}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-3 border rounded-md p-4 border-black">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="flex-1 cursor-pointer">
                        <div className="font-medium">Standard Shipping</div>
                          <div className="text-sm text-muted-foreground">Free • 5-7 business days</div>
                        </Label>
                        <div className="font-medium">₹0</div>
                      </div>
                      
                      <div className="flex items-center space-x-3 border rounded-md p-4 border-black">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="flex-1 cursor-pointer">
                          <div className="font-medium">Express Shipping</div>
                          <div className="text-sm text-muted-foreground">₹99 • 1-2 business days</div>
                        </Label>
                        <div className="font-medium">₹99</div>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="pt-4">
                    <Alert className="bg-muted border-none">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      <AlertDescription className="text-sm">
                        After entering your shipping details, you'll be redirected to our secure payment gateway.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              )}
              
              {/* Step 2: Review Order */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Shipping Information</h3>
                    <div className="bg-muted p-4 rounded-md">
                      <p>{formData.fullName}</p>
                      <p>{formData.email}</p>
                      <p>{formData.phone}</p>
                      <p>{formData.address}</p>
                      <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                      <p>{formData.country}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Shipping Method</h3>
                    <div className="bg-muted p-4 rounded-md flex items-center">
                      <Truck className="h-5 w-5 mr-2" />
                      <div>
                        {formData.shippingMethod === "standard" ? (
                          <p>Standard Shipping (5-7 business days)</p>
                        ) : (
                          <p>Express Shipping (1-2 business days)</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Payment Information</h3>
                    <div className="bg-muted p-4 rounded-md flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      <div>
                        <p>Payment completed via Razorpay</p>
                        <p className="text-sm text-muted-foreground">Payment ID: {paymentId}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Order Items</h3>
                    <div className="space-y-3">
                      {orderSummary.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center border-b pb-3">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-medium">₹{item.price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 3: Success */}
              {step === 3 && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Thank You For Your Order!</h2>
                  <p className="text-muted-foreground mb-6">
                    Your order #ORD-{Math.floor(100000 + Math.random() * 900000)} has been placed successfully.
                  </p>
                  <p className="mb-2">
                    We've sent a confirmation email to <span className="font-medium">{formData.email}</span> with all the details.
                  </p>
                  <p className="mb-6 text-sm text-muted-foreground">
                    Payment ID: {paymentId}
                  </p>
                  <Button onClick={() => router.push("/")}>
                    Return to Home
                  </Button>
                </div>
              )}
            </CardContent>
            
            {step < 3 && (
              <CardFooter className="flex justify-between">
                {step > 1 ? (
                  <Button variant="outline" onClick={prevStep}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}
                
                {step === 1 ? (
                  <Button onClick={nextStep} disabled={paymentProcessing}>
                    {paymentProcessing ? "Processing..." : "Continue to Payment"}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : step === 2 ? (
                  <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Processing..." : "Place Order"}
                  </Button>
                ) : null}
              </CardFooter>
            )}
          </Card>
        </div>
        
        {/* Order Summary */}
        <div className="md:col-span-1">
          <Card className="border border-black">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderSummary.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{item.price.toFixed(2)}</span>
                  </div>
                ))}
                
                <Separator />
                
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{orderSummary.subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{orderSummary.shipping.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{orderSummary.tax.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{orderSummary.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-4">
            <Card className="border border-black">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="font-medium">Secure Checkout</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your payment is processed securely with Razorpay. We never store your card details.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout