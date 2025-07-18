"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getCurrentUser } from "@/lib/actions/authActions"; // Import the function to check user authentication

const Checkout = () => {
  const router = useRouter();
  const { cart: items, getCartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  });
  const [loading, setLoading] = useState(false);
  const [orderSummary, setOrderSummary] = useState({
    items: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  });
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Ensure Razorpay SDK is loaded dynamically
  useEffect(() => {
    const loadRazorpay = async () => {
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => setRazorpayLoaded(true);
        document.body.appendChild(script);
      } else {
        setRazorpayLoaded(true);
      }
    };
    loadRazorpay();
  }, []);

  // Check if the user is logged in
  useEffect(() => {
    const checkAuthentication = async () => {
      const user = await getCurrentUser();
      if (!user) {
        // Redirect to login page if the user is not logged in
        router.push("/auth/login");
      } else {
        setFormData((prev) => ({
          ...prev,
          fullName: user.name || "",
          email: user.email || "",
          phone: user.phone || ""
        }));
      }
    };

    checkAuthentication();
  }, [router]);

  // Calculate order summary based on cart items
  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
      return;
    }

    const subtotal = getCartTotal();
    const shipping = 0;
    const taxRate = 0.1;
    const tax = Number((subtotal * taxRate).toFixed(2));
    const total = Number((subtotal + tax + shipping).toFixed(2));

    setOrderSummary({ items, subtotal, shipping, tax, total });
  }, [items, getCartTotal, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      alert("Razorpay SDK is still loading. Please try again in a few seconds.");
      return;
    }

    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.zipCode) {
      alert("Please fill all details before proceeding!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: orderSummary.total * 100, 
          currency: "INR",
          items: orderSummary.items.map(item => ({
            id: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          }))
        })
      });

      const { order } = await res.json();

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded. Please try again.");
        setLoading(false);
        return;
      }

      const options = {
        key: "rzp_test_9arMjW7QUI0T5A",
        amount: order.amount,
        currency: order.currency,
        name: formData.fullName,
        description: "Payment for your order",
        order_id: order.id,
        handler: async function (response) {
          const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderDetails: { items: orderSummary.items, total: orderSummary.total, shippingAddress: formData }
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert("Payment Successful!");
            
            router.push("/checkout/success");
            clearCart();
          } else {
            alert("Payment Verification Failed!");
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#3399cc" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 w-full">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="border border-gray-300 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Billing Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["fullName", "email", "phone", "address", "city", "state", "zipCode"].map((field) => (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field}>{field.replace(/([A-Z])/g, " $1").trim()}</Label>
                    <Input
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={`Enter your ${field}`}
                      readOnly={["fullName", "email", "phone"].includes(field) && formData[field]}
                      required={["address", "city", "state", "zipCode"].includes(field)}
                    />
                  </div>
                ))}
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" value={formData.country} disabled placeholder="India" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handlePayment} disabled={loading} className="w-full">
                {loading ? "Processing..." : "Continue to Payment"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="border border-gray-300 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
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
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{orderSummary.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-4">
            <Card className="border border-gray-300 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="font-medium">Secure Checkout</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your information is protected using SSL encryption technology.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;