"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Award, Heart, Truck, Shield } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Breadcrumb } from "@/components/breadcrumb"

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section replaced with Breadcrumb */}
        <Breadcrumb items={[{ label: "خانه", href: "/" }, { label: "درباره ما" }]} />

        {/* Story Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground">
                  سفری که از عشق به زیبایی آغاز شد
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  لوکس در سال ۱۳۹۵ با هدف ارائه محصولات با کیفیت و طراحی منحصر به فرد تاسیس شد. ما معتقدیم که هر خانه
                  داستانی منحصر به فرد دارد و محصولات ما باید بخشی از این داستان باشند.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  تیم ما با دقت و علاقه، هر محصول را از بهترین تولیدکنندگان و طراحان انتخاب می‌کند تا اطمینان حاصل کنیم
                  که شما بهترین کیفیت و طراحی را دریافت می‌کنید.
                </p>
              </div>
              <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
                <Image src="/modern-furniture-showroom.png" alt="فروشگاه لوکس" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 lg:py-24 bg-secondary">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">ارزش‌های ما</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                اصولی که ما را در مسیر ارائه بهترین خدمات به شما راهنمایی می‌کند
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">کیفیت برتر</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  تنها بهترین محصولات با بالاترین استانداردهای کیفی
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">طراحی با عشق</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  هر محصول با دقت و علاقه انتخاب و طراحی شده است
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">ارسال سریع</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  تحویل سریع و ایمن محصولات به درب منزل شما
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">ضمانت اصالت</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">تضمین اصالت و کیفیت تمامی محصولات</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">تیم ما</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                افرادی که با تخصص و علاقه، تجربه خرید شما را بهتر می‌کنند
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { name: "سارا احمدی", role: "مدیر طراحی" },
                { name: "علی رضایی", role: "مدیر فروش" },
                { name: "مریم کریمی", role: "مدیر خدمات مشتریان" },
              ].map((member, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden">
                    <Image
                      src={`/professional-portrait.png?height=200&width=200&query=professional portrait ${index + 1}`}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
