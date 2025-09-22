import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CreditCard, Wallet } from "lucide-react";

const CheckoutPage = () => {
  const { items, subtotal, clearCart } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "paypal" | "afterpay"
  >("card");

  // Shipping is free over $50
  const shippingCost = subtotal > 50 ? 0 : 9.99;

  // Tax 10%
  const tax = subtotal * 0.1;

  // Total
  const total = subtotal + shippingCost + tax - discountAmount;

  const handleApplyDiscount = () => {
    // Mock discount codes
    if (discountCode.toUpperCase() === "SAVE10") {
      const discount = subtotal * 0.1;
      setDiscountAmount(discount);
      setDiscountApplied(true);
      toast.success("Discount code applied!");
    } else if (discountCode.toUpperCase() === "FREESHIP") {
      const discount = shippingCost;
      setDiscountAmount(discount);
      setDiscountApplied(true);
      toast.success("Free shipping code applied!");
    } else {
      toast.error("Invalid discount code");
    }
  };

  const handlePlaceOrder = () => {
    toast.success("Order placed successfully!");
    clearCart();
    // In a real app, we would process the payment and redirect to a confirmation page
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">
          Add some products to your cart to proceed to checkout.
        </p>
        <Button asChild>
          <a href="/products">Browse Products</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left column - Customer info */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

            <div className="space-y-4 mb-8">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div>
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" type="tel" placeholder="(123) 456-7890" />
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>

            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Street address</Label>
                <Input id="address" />
              </div>
              <div>
                <Label htmlFor="apartment">
                  Apartment, suite, etc. (optional)
                </Label>
                <Input id="apartment" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" />
                </div>
                <div className="col-span-1">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" />
                </div>
                <div className="col-span-1">
                  <Label htmlFor="zip">ZIP code</Label>
                  <Input id="zip" />
                </div>
              </div>
            </div>

            {/* Payment method selection */}
            <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className={`border rounded-lg p-4 flex items-center justify-center cursor-pointer transition-colors ${
                    paymentMethod === "card"
                      ? "border-shop-primary bg-purple-50"
                      : "hover:border-gray-400"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <CreditCard className="mr-2" size={20} />
                  <span>Credit Card</span>
                </div>
                <div
                  className={`border rounded-lg p-4 flex items-center justify-center cursor-pointer transition-colors ${
                    paymentMethod === "paypal"
                      ? "border-shop-primary bg-purple-50"
                      : "hover:border-gray-400"
                  }`}
                  onClick={() => setPaymentMethod("paypal")}
                >
                  {/* <Wallet className="mr-2" size={20} /> */}
                  <img
                    src="public/paypal-logo.png"
                    alt="PayPal"
                    className="w-10 h-10"
                  />
                  <span>PayPal</span>
                </div>
                <div
                  className={`border rounded-lg p-4 flex items-center justify-center cursor-pointer transition-colors ${
                    paymentMethod === "afterpay"
                      ? "border-shop-primary bg-purple-50"
                      : "hover:border-gray-400"
                  }`}
                  onClick={() => setPaymentMethod("afterpay")}
                >
                  <Wallet className="mr-2" size={20} />
                  <span>AfterPay</span>
                </div>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="cardName">Name on card</Label>
                    <Input id="cardName" placeholder="John Doe" />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Card number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <Label htmlFor="expMonth">Month</Label>
                      <Input id="expMonth" placeholder="MM" />
                    </div>
                    <div className="col-span-1">
                      <Label htmlFor="expYear">Year</Label>
                      <Input id="expYear" placeholder="YY" />
                    </div>
                    <div className="col-span-1">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "paypal" && (
                <div className="text-center p-4">
                  <p>
                    You will be redirected to PayPal to complete your payment.
                  </p>
                </div>
              )}

              {paymentMethod === "afterpay" && (
                <div className="text-center p-4">
                  <p>
                    Pay in 4 interest-free installments for orders over $35.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column - Order summary */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 border sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-start">
                  <div className="w-16 h-16 rounded overflow-hidden mr-4">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-gray-500 text-sm">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mb-4">
              <div className="flex items-center mb-4">
                <Input
                  placeholder="Discount code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  disabled={discountApplied}
                  className="mr-2"
                />
                <Button
                  variant="outline"
                  onClick={handleApplyDiscount}
                  disabled={discountApplied || !discountCode}
                >
                  Apply
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0
                      ? "Free"
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              className="w-full bg-shop-primary hover:bg-shop-primary-dark py-6"
              size="lg"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By placing your order, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
