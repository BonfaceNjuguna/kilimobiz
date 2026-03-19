import { useState } from "react";
import { 
  ArrowLeft, 
  MapPin, 
  CreditCard,
  Shield,
  CheckCircle
} from "lucide-react";
import { useScreenSize } from "./ResponsiveLayout";
import type { CartItem, Address } from "../types/marketplace";
import { COUNTIES, PAYMENT_METHODS } from "../constants/marketplace";

interface CheckoutScreenProps {
  cart: CartItem[];
  onBack: () => void;
  onPlaceOrder: (deliveryAddress: Address, paymentMethod: string) => void;
}

export function CheckoutScreen({ cart, onBack, onPlaceOrder }: CheckoutScreenProps) {
  const screenSize = useScreenSize();
  const [step, setStep] = useState<'address' | 'payment' | 'review'>('address');
  const [deliveryAddress, setDeliveryAddress] = useState<Address>({
    street: '',
    city: '',
    county: '',
    postalCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<string>('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('+254');

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = 150;
  const total = subtotal + deliveryFee;

  const handleAddressSubmit = () => {
    if (deliveryAddress.street && deliveryAddress.city && deliveryAddress.county) {
      setStep('payment');
    }
  };

  const handlePaymentSubmit = () => {
    setStep('review');
  };

  const handlePlaceOrder = () => {
    onPlaceOrder(deliveryAddress, paymentMethod);
  };

  const canProceedAddress = deliveryAddress.street && deliveryAddress.city && deliveryAddress.county;
  const canProceedPayment = paymentMethod === 'mpesa' ? phoneNumber.length >= 10 : true;

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <div className="bg-[#ffffff] shadow-sm sticky top-0 z-10">
        <div className="p-4 flex items-center space-x-4">
          {screenSize === 'mobile' && (
            <button
              type="button"
              onClick={step === 'address' ? onBack : () => {
                if (step === 'payment') setStep('address');
                if (step === 'review') setStep('payment');
              }}
              className="w-10 h-10 p-0 rounded hover:bg-gray-100 transition flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className="font-semibold text-[#1f2937]">Checkout</h1>
            <p className="text-sm text-[#6b7280]">
              Step {step === 'address' ? '1' : step === 'payment' ? '2' : '3'} of 3
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Progress Indicator */}
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step === 'address' ? 'bg-[#10b981] text-white' : 'bg-[#10b981] text-white'
          }`}>
            {step === 'address' ? '1' : <CheckCircle className="w-4 h-4" />}
          </div>
          <div className={`flex-1 h-1 ${step !== 'address' ? 'bg-green-600' : 'bg-[#f3f4f6]'}`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step === 'payment' ? 'bg-[#10b981] text-white' : 
            step === 'review' ? 'bg-green-600 text-white' : 'bg-[#f3f4f6] text-[#6b7280]'
          }`}>
            {step === 'review' ? <CheckCircle className="w-4 h-4" /> : '2'}
          </div>
          <div className={`flex-1 h-1 ${step === 'review' ? 'bg-green-600' : 'bg-[#f3f4f6]'}`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step === 'review' ? 'bg-[#10b981] text-white' : 'bg-[#f3f4f6] text-[#6b7280]'
          }`}>
            3
          </div>
        </div>

        {/* Delivery Address */}
        {step === 'address' && (
          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="font-semibold">Delivery Address</span>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                  <label htmlFor="street" className="text-sm font-medium text-[#1f2937]">Street Address</label>
                <input
                  id="street"
                  placeholder="123 Main Street, Building/Apartment"
                  value={deliveryAddress.street}
                  onChange={(e) => setDeliveryAddress({ ...deliveryAddress, street: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label htmlFor="city" className="text-sm font-medium text-[#1f2937]">City</label>
                  <input
                    id="city"
                    placeholder="Nairobi"
                    value={deliveryAddress.city}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="postal" className="text-sm font-medium text-[#1f2937]">Postal Code</label>
                  <input
                    id="postal"
                    placeholder="00100"
                    value={deliveryAddress.postalCode}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, postalCode: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>

              <div className="space-y-2">
                  <label htmlFor="county" className="text-sm font-medium text-[#1f2937]">County</label>
                <select
                  id="county"
                  value={deliveryAddress.county}
                  onChange={(e) => setDeliveryAddress({ ...deliveryAddress, county: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select county</option>
                  {COUNTIES.map((county) => (
                    <option key={county} value={county}>
                      {county}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={handleAddressSubmit}
                disabled={!canProceedAddress}
                className="w-full bg-[#10b981] hover:bg-[#059669] text-white rounded px-4 py-2 font-medium"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {/* Payment Method */}
        {step === 'payment' && (
          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              <span className="font-semibold">Payment Method</span>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => (
                  <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <input
                      type="radio"
                      name="paymentMethod"
                      id={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="form-radio h-5 w-5 text-primary"
                    />
                    <label htmlFor={method.id} className="flex items-center space-x-2 cursor-pointer">
                      <span className="text-lg">{method.icon}</span>
                      <span>{method.name}</span>
                    </label>
                    <p className="text-sm text-muted-foreground flex-1">{method.description}</p>
                  </div>
                ))}
              </div>

              {paymentMethod === 'mpesa' && (
                <div className="space-y-2 mt-4">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">M-Pesa Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+254700000000"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              )}

              <button
                type="button"
                onClick={handlePaymentSubmit}
                disabled={!canProceedPayment}
                className="w-full bg-[#10b981] hover:bg-[#059669] text-white rounded px-4 py-2 font-medium"
              >
                Review Order
              </button>
            </div>
          </div>
        )}

        {/* Order Review */}
        {step === 'review' && (
          <div className="space-y-4">
            {/* Order Items */}
            <div className="bg-white rounded-lg shadow">
              <div className="border-b px-6 py-4 font-semibold">Order Summary</div>
              <div className="p-6 space-y-3">
                {cart.map((item) => (
                  <div key={item.productId} className="flex items-center space-x-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity} × KES {item.product.price}
                      </p>
                    </div>
                    <p className="font-medium">KES {item.totalPrice}</p>
                  </div>
                ))}
                
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>KES {subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery</span>
                    <span>KES {deliveryFee}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-[#10b981]">KES {total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="bg-white rounded-lg shadow">
              <div className="border-b px-6 py-4 font-semibold">Delivery Details</div>
              <div className="p-6 space-y-2 text-sm">
                <p>{deliveryAddress.street}</p>
                <p>{deliveryAddress.city}, {deliveryAddress.county}</p>
                {deliveryAddress.postalCode && <p>{deliveryAddress.postalCode}</p>}
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-white rounded-lg shadow">
              <div className="border-b px-6 py-4 font-semibold">Payment Details</div>
              <div className="p-6 flex items-center space-x-2">
                <span className="text-lg">
                  {PAYMENT_METHODS.find(m => m.id === paymentMethod)?.icon}
                </span>
                <span>{PAYMENT_METHODS.find(m => m.id === paymentMethod)?.name}</span>
                {paymentMethod === 'mpesa' && (
                  <span className="text-sm text-muted-foreground mt-1">
                    {phoneNumber}
                  </span>
                )}
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-green-light border-green-200 rounded-lg shadow">
              <div className="p-4 flex items-start space-x-3">
                <Shield className="w-5 h-5 text-green-dark mt-0.5 flex-shrink-0" />
                <div className="text-sm text-green-dark">
                  <strong>Secure Payment:</strong> Your payment information is encrypted and secure. Orders are processed by verified farmers.
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePlaceOrder}
              className="w-full h-12 text-base font-medium bg-[#10b981] hover:bg-[#059669] text-white rounded"
            >
              Place Order • KES {total}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}