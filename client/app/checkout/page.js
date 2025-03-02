"use client";
import { useState } from "react";

const Checkout = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        address: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateStep = () => {
        if (step === 1 && (!formData.fullName || !formData.email || !formData.address)) {
            setError("Please fill all the required fields.");
            return false;
        }
        if (step === 2 && (!formData.cardNumber || !formData.expiry || !formData.cvv)) {
            setError("Please complete payment details.");
            return false;
        }
        setError("");
        return true;
    };

    const nextStep = () => {
        if (validateStep()) setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    const handleSubmit = () => {
        if (!validateStep()) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert("Order placed successfully!");
            setStep(1);
            setFormData({ fullName: "", email: "", address: "", cardNumber: "", expiry: "", cvv: "" });
        }, 2000);
    };

    return (
        <div>
            <h2>Checkout</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            {step === 1 && (
                <div>
                    <h3>Shipping Details</h3>
                    <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
                    <button onClick={nextStep}>Next</button>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h3>Payment Details</h3>
                    <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} />
                    <input type="text" name="expiry" placeholder="Expiry (MM/YY)" value={formData.expiry} onChange={handleChange} />
                    <input type="password" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} />
                    <button onClick={prevStep}>Back</button>
                    <button onClick={handleSubmit} disabled={loading}>{loading ? "Processing..." : "Place Order"}</button>
                </div>
            )}
        </div>
    );
};

export default Checkout;
