import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const VerifyOtpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOtp = async () => {
    try {
      setLoading(true);

      const res = await api.post("/verify-otp", {
        email,
        otp,
      });

      const data = res.data?.data;

      // save token if returned
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      // go to payment
      navigate("/payment", {
        state: {
          user: data?.user,
        },
      });
    } catch (err) {
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-xl font-bold">Verify OTP</h1>

      <Input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />

      <Button onClick={verifyOtp} disabled={loading}>
        {loading ? "Verifying..." : "Verify"}
      </Button>
    </div>
  );
};

export default VerifyOtpPage;
