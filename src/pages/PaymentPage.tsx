import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { useState } from "react";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const membership_type =
    location.state?.membership_type ||
    localStorage.getItem("pending_membership_type");

  const user = location.state?.user;

  const [loading, setLoading] = useState(false);

  const pay = async () => {
    try {
      setLoading(true);

      const res = await api.post("/payments/create", {
        amount: 200,
        payment_method: "creditcard",
        membership_type: membership_type,
        email: user?.email,
      });

      const data = res.data?.data;

      if (data?.payment_url) {
        window.location.href = data.payment_url;
      }
    } catch (err) {
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-xl font-bold">Complete Payment</h1>

      <p>Welcome {user?.name}</p>

      <Button onClick={pay} disabled={loading}>
        {loading ? "Redirecting..." : "Pay Now"}
      </Button>
    </div>
  );
};

export default PaymentPage;
