import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [step, setStep] = useState<"login" | "2fa">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock validation - move to 2FA step
    setStep("2fa");
  };

  const handleVerifyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock 2FA verification - accept any 6-digit code
    if (otpCode.length === 6) {
      // Extract username from email for demo purposes
      const username = email.split("@")[0] || "admin";
      onLogin(username, password);
    }
  };

  const handleBack = () => {
    setStep("login");
    setOtpCode("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-gray-900 mb-2">VidaPoint Admin Portal</h1>
            <p className="text-gray-600 text-sm">
              {step === "login"
                ? "Sign in to access the maternal health tracking system"
                : "Enter the 6-digit code from your E-mail"}
            </p>
          </div>

          {/* Login Form */}
          {step === "login" && (
            <form onSubmit={handleContinue} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@vidapoint.gov.ph"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 bg-gray-50 border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-900">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 bg-gray-50 border-gray-200"
                />
              </div>

              <div className="text-left">
                <button
                  type="button"
                  className="text-blue-600 text-sm hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-black hover:bg-gray-800 text-white"
              >
                Continue
              </Button>

              <p className="text-center text-xs text-gray-500 mt-4">
                Protected by Two-Factor Authentication (2FA)
              </p>
            </form>
          )}

          {/* 2FA Form */}
          {step === "2fa" && (
            <form onSubmit={handleVerifyLogin} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-center text-gray-900">
                  Two-Factor Authentication
                </h2>

                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otpCode}
                    onChange={(value) => setOtpCode(value)}
                  >
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot index={0} className="w-12 h-12 text-lg border-gray-300 bg-gray-50" />
                      <InputOTPSlot index={1} className="w-12 h-12 text-lg border-gray-300 bg-gray-50" />
                      <InputOTPSlot index={2} className="w-12 h-12 text-lg border-gray-300 bg-gray-50" />
                      <InputOTPSlot index={3} className="w-12 h-12 text-lg border-gray-300 bg-gray-50" />
                      <InputOTPSlot index={4} className="w-12 h-12 text-lg border-gray-300 bg-gray-50" />
                      <InputOTPSlot index={5} className="w-12 h-12 text-lg border-gray-300 bg-gray-50" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1 h-11 border-gray-300 hover:bg-gray-50"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={otpCode.length !== 6}
                  className="flex-1 h-11 bg-gray-700 hover:bg-gray-800 text-white disabled:opacity-50"
                >
                  Verify & Login
                </Button>
              </div>

              <p className="text-center text-xs text-gray-500">
                Can't access your E-mail? Use backup code
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
