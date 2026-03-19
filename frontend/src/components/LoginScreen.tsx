import { useState } from "react";
import { Leaf, Phone, Mail } from "lucide-react";

interface LoginScreenProps {
  onSendOTP: (contact: string, contactType: 'phone' | 'email') => void;
}

export function LoginScreen({ onSendOTP }: LoginScreenProps) {
  const [contactMethod, setContactMethod] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+254');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    const contact = contactMethod === 'phone' ? countryCode + phone : email;
    if (!contact.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    onSendOTP(contact, contactMethod);
  };

  const isValid = contactMethod === 'phone' ? phone.length >= 8 : email.includes('@');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d1fae5] to-[#fef3c7] flex items-center justify-center p-4">
      <div className="w-full max-w-md shadow-xl bg-[#ffffff] rounded-3xl">
        <div className="p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-[#10b981] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Leaf className="w-8 h-8 text-[#ffffff]" />
            </div>
            <h1 className="text-2xl font-semibold text-[#1f2937]">Kilimobiz</h1>
            <p className="text-[#6b7280] mt-2">
              Your trusted agribiz marketplace
            </p>
          </div>

          {/* Welcome Message */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-medium text-[#1f2937] mb-2">
              Welcome to Kilimobiz
            </h2>
            <p className="text-[#6b7280] text-sm">
              Connect with local farmers and fresh produce
            </p>
          </div>

          {/* Contact Method Toggle */}
          <div className="flex bg-[#e5e7eb] rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => setContactMethod('phone')}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all ${
                contactMethod === 'phone'
                  ? 'bg-[#ffffff] text-[#1f2937] shadow-sm'
                  : 'text-[#6b7280]'
              }`}
            >
              <Phone className="w-4 h-4 mr-2" />
              Phone
            </button>
            <button
              type="button"
              onClick={() => setContactMethod('email')}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all ${
                contactMethod === 'email'
                  ? 'bg-[#ffffff] text-[#1f2937] shadow-sm'
                  : 'text-[#6b7280]'
              }`}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </button>
          </div>

          {/* Input Fields */}
          <div className="space-y-4 mb-6">
            {contactMethod === 'phone' ? (
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium block mb-1">
                  Phone Number
                </label>
                <div className="flex space-x-3">
                  <select
                    value={countryCode}
                    onChange={e => setCountryCode(e.target.value)}
                    className="w-20 h-12 rounded-xl bg-[#ffffff] text-[#1f2937] px-2 shadow-sm"
                  >
                    <option value="+254">🇰🇪 +254</option>
                    <option value="+255">🇹🇿 +255</option>
                    <option value="+256">🇺🇬 +256</option>
                    <option value="+250">🇷🇼 +250</option>
                  </select>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="700123456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 h-12 rounded-xl bg-[#ffffff] text-[#1f2937] px-3 shadow-sm"
                    maxLength={9}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium block mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="farmer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl bg-[#ffffff] text-[#1f2937] px-3 w-full shadow-sm"
                />
              </div>
            )}
          </div>

          {/* Send OTP Button */}
          <button
            type="button"
            className="w-full h-12 text-base font-bold bg-[#10b981] hover:bg-[#059669] text-[#ffffff] rounded-lg transition disabled:opacity-60 shadow-md hover:shadow-lg"
            onClick={handleSendOTP}
            disabled={!isValid || isLoading}
          >
            {isLoading ? 'Sending...' : 'Send OTP'}
          </button>

          {/* Info Text */}
          <p className="text-xs text-[#6b7280] text-center mt-4 leading-relaxed">
            We'll send you a one-time password (OTP) to log in securely.
          </p>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-[#d1d5db]">
            <p className="text-xs text-[#6b7280] text-center leading-relaxed">
              By continuing, you agree to Kilimobiz Terms & Privacy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}