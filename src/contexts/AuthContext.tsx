import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "@/services/api";

export type UserStatus = "pending" | "approved" | "rejected" | "active";

interface User {
  id: number;
  name: string;
  name_ar?: string;
  email: string;
  phone?: string;
  national_id?: string;
  classification_number?: string;
  specialization?: string;
  sub_specialization?: string;
  employer?: string;
  membership_type?: string;
  status?: UserStatus;
  role?: string;
  email_verified_at?: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isApproved: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<RegisterResult>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: ResetPasswordData) => Promise<void>;
  refreshUser: () => Promise<void>;
}

export interface RegisterData {
  name: string;
  name_ar: string;
  email: string;
  phone: string;
  national_id: string;
  classification_number?: string;
  specialization?: string;
  sub_specialization?: string;
  employer?: string;
  promo_code?: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterResult {
  status: UserStatus;
  user?: User;
  token?: string;
  payment_url?: string;
  message?: string;
}

interface ResetPasswordData {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [isLoading, setIsLoading] = useState(true);

  const clearAuth = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const res = await api.get("/me");
      const userData = res.data?.data || res.data?.user || res.data;

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error: any) {
      // only logout if NOT OTP flow
      console.warn("fetchUser failed:", error?.response?.status);

      if (error?.response?.status === 401) {
        // DO NOT clear auth during OTP/signup flow
        return;
      }
    }
  }, [clearAuth]);

  // ✅ FIXED: runs when token changes
  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    fetchUser().finally(() => setIsLoading(false));
  }, [token, fetchUser]);

  const login = async (email: string, password: string) => {
    const res = await api.post("/login", { email, password });
    const data = res.data?.data || res.data;

    const newToken = data.token;
    const userData = data.user;

    if (userData?.status === "pending") {
      const err: any = new Error("pending_approval");
      err.code = "pending_approval";
      err.user = userData;
      throw err;
    }

    if (userData?.status === "rejected") {
      const err: any = new Error("rejected");
      err.code = "rejected";
      err.user = userData;
      throw err;
    }

    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const register = async (data: RegisterData): Promise<RegisterResult> => {
    const res = await api.post("/register", data);
    const resData = res.data?.data || res.data;

    const status: UserStatus =
      resData.user?.status || resData.status || "pending";

    // ❌ IMPORTANT: DO NOT login user after signup (OTP flow)
    if (status === "pending") {
      return {
        status: "pending",
        user: resData.user,
        message: resData.message,
      };
    }

    // only if backend auto-approves
    if (resData.token) {
      localStorage.setItem("token", resData.token);
      setToken(resData.token);
    }

    if (resData.user) {
      setUser(resData.user);
      localStorage.setItem("user", JSON.stringify(resData.user));
    }

    return {
      status,
      user: resData.user,
      token: resData.token,
      payment_url: resData.payment_url,
    };
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch {}
    clearAuth();
  };

  const forgotPassword = async (email: string) => {
    await api.post("/password/email", { email });
  };

  const resetPassword = async (data: ResetPasswordData) => {
    await api.post("/password/reset", data);
  };

  const refreshUser = async () => {
    if (token) await fetchUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,

        // ✅ FIXED LOGIC FOR OTP FLOW
        isAuthenticated: !!token,

        isApproved:
          user?.status === "approved" ||
          user?.status === "active" ||
          !!user?.email_verified_at,

        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
