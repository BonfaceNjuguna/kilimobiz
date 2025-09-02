import { useState, useEffect } from "react";
import { ArrowLeft, Leaf, Shield } from "lucide-react";

interface OTPScreenProps {
  contact: string;
  contactType: 'phone' | 'email';
  onVerify: (code: string) => void;
  onBack: () => void;
  onResend: () => void;
}

export function OTPScreen({ contact, contactType, onVerify, onBack, onResend }: OTPScreenProps) {
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otpCode.join('');
    if (code.length !== 4) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    onVerify(code);
  };

  const handleResend = async () => {
    if (!canResend) return;
    setCanResend(false);
    setCountdown(30);
    onResend();
  };

  const isCodeComplete = otpCode.every(digit => digit !== '');
  const maskedContact = contactType === 'phone'
    ? contact.replace(/(\+\d{3})(\d{3})(\d{3})(\d{3})/, '$1 $2 *** ***')
    : contact.replace(/(.{2})(.*)(@.*)/, '$1***$3');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-beige flex items-center justify-center p-4">
      <div className="w-full max-w-md shadow-xl border-0 bg-white rounded-2xl">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button
              type="button"
              onClick={onBack}
              className="mr-2 w-10 h-10 p-0 rounded-full hover:bg-muted transition flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Title and Description */}
          <div className="text-center mb-8">
            <h1 className="text-xl font-semibold text-foreground mb-2">
              Verify Your {contactType === 'phone' ? 'Phone' : 'Email'}
            </h1>
            <p className="text-muted-foreground text-sm">
              We've sent a 4-digit code to
            </p>
            <p className="text-foreground font-medium">
              {maskedContact}
            </p>
          </div>

          {/* OTP Input */}
          <div className="space-y-6 mb-6">
            <div className="flex justify-center space-x-2">
              {otpCode.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-16 h-16 text-center font-bold border-2 border-muted-foreground/30 bg-white rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm transition-all duration-200 hover:border-primary/50"
                  style={{ fontSize: '24px', fontWeight: '700' }}
                  maxLength={1}
                  autoComplete="one-time-code"
                />
              ))}
            </div>
          </div>

          {/* Verify Button */}
          <button
            type="button"
            className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 text-white rounded-lg transition disabled:opacity-60"
            onClick={handleVerify}
            disabled={!isCodeComplete || isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </button>

          {/* Resend Section */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground mb-2">
              Didn't receive the code?
            </p>
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                className="text-primary hover:text-primary/80 text-sm font-medium"
              >
                Resend Code
              </button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Resend in {countdown}s
              </p>
            )}
          </div>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-green-light rounded-lg">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-green-dark mt-0.5 flex-shrink-0" />
              <div className="text-sm text-green-dark">
                <strong>Security Notice:</strong> Never share your OTP with anyone. Kilimobiz will never ask for your OTP over phone or email.
              </div>
            </div>
          </div>

          {/* Demo Notice */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-800">
              <strong>Demo Codes:</strong><br />
              • Customer: 1234<br />
              • Farmer: 5678<br />
              • Admin: 9999
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}