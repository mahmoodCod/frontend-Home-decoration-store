"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle checkout logic
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-8">پرداخت</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-card p-6 rounded-lg border border-border space-y-4">
                <h2 className="font-serif text-2xl font-bold text-foreground">اطلاعات تماس</h2>
                <div className="space-y-2">
                  <Label htmlFor="email">ایمیل</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-card p-6 rounded-lg border border-border space-y-4">
                <h2 className="font-serif text-2xl font-bold text-foreground">آدرس ارسال</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">نام</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">نام خانوادگی</Label>
                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">آدرس</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">شهر</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">کد پستی</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">کشور</Label>
                    <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-card p-6 rounded-lg border border-border space-y-4">
                <h2 className="font-serif text-2xl font-bold text-foreground">اطلاعات پرداخت</h2>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">شماره کارت</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">تاریخ انقضا</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-muted p-6 rounded-lg space-y-4">
                <h2 className="font-serif text-2xl font-bold text-foreground">خلاصه سفارش</h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>جمع جزء</span>
                    <span>389.97 تومان</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>هزینه ارسال</span>
                    <span>رایگان</span>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <div className="flex justify-between text-foreground font-semibold text-xl">
                      <span>جمع کل</span>
                      <span>389.97 تومان</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full">
                تکمیل سفارش
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
