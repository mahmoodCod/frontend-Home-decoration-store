"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function RegisterPage() {
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [step, setStep] = useState<"phone" | "verify">("phone")
  const [isLoading, setIsLoading] = useState(false)
  const { user, login } = useCart()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/profile")
    }
  }, [user, router])

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setStep("verify")
      toast.success("کد تایید به شماره موبایل شما ارسال شد")
    }, 1500)
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      login(phone)
      toast.success("ثبت نام با موفقیت انجام شد!")
      router.push("/")
    }, 1500)
  }

  if (user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="bg-background rounded-2xl shadow-lg p-8 lg:p-10">
              <div className="text-center mb-8">
                <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  {step === "phone" ? "ثبت نام / ورود" : "تایید شماره موبایل"}
                </h1>
                <p className="text-muted-foreground">
                  {step === "phone"
                    ? "برای ادامه، شماره موبایل خود را وارد کنید"
                    : "کد تایید ارسال شده به شماره موبایل خود را وارد کنید"}
                </p>
              </div>

              {step === "phone" ? (
                <form onSubmit={handleSendCode} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">شماره موبایل</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="09123456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      pattern="[0-9]{11}"
                      maxLength={11}
                      className="text-center text-lg tracking-wider"
                    />
                    <p className="text-xs text-muted-foreground text-center">
                      شماره موبایل خود را بدون صفر و خط تیره وارد کنید
                    </p>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? "در حال ارسال..." : "ارسال کد تایید"}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    با ثبت نام، شما{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      قوانین و مقررات
                    </Link>{" "}
                    را می‌پذیرید
                  </p>
                </form>
              ) : (
                <form onSubmit={handleVerifyCode} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="code">کد تایید</Label>
                    <Input
                      id="code"
                      type="text"
                      placeholder="- - - - - -"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      required
                      pattern="[0-9]{6}"
                      maxLength={6}
                      className="text-center text-2xl tracking-widest"
                    />
                    <p className="text-xs text-muted-foreground text-center">
                      کد ۶ رقمی ارسال شده به {phone} را وارد کنید
                    </p>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? "در حال تایید..." : "تایید و ادامه"}
                  </Button>

                  <div className="flex items-center justify-between text-sm">
                    <button
                      type="button"
                      onClick={() => setStep("phone")}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      تغییر شماره موبایل
                    </button>
                    <button
                      type="button"
                      onClick={handleSendCode}
                      className="text-primary hover:underline"
                      disabled={isLoading}
                    >
                      ارسال مجدد کد
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                با ثبت نام در لوکس، از تخفیف‌های ویژه و جدیدترین محصولات باخبر شوید
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
