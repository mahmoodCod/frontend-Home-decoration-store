"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef } from "react"

const featuredProducts = [
  {
    id: "1",
    name: "گلدان سرامیکی مینیمال",
    price: 89.99,
    image: "/minimalist-ceramic-vase.png",
    category: "دکوراسیون خانه",
  },
  {
    id: "2",
    name: "پتوی پشمی بافته شده",
    price: 149.99,
    image: "/luxury-wool-throw-blanket.jpg",
    category: "منسوجات",
  },
  {
    id: "3",
    name: "میز جلو مبلی دست‌ساز",
    price: 599.99,
    image: "/modern-wooden-coffee-table.png",
    category: "مبلمان",
  },
  {
    id: "4",
    name: "چراغ رومیزی طراح",
    price: 199.99,
    image: "/modern-table-lamp.jpg",
    category: "روشنایی",
  },
]

const categories = [
  {
    name: "مبلمان",
    image: "/modern-furniture-collection.png",
    href: "/collections/furniture",
  },
  {
    name: "روشنایی",
    image: "/designer-lighting-fixtures.jpg",
    href: "/collections/lighting",
  },
  {
    name: "دکوراسیون",
    image: "/home-decor-accessories.png",
    href: "/collections/decor",
  },
]

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    const elements = [heroRef.current, featuredRef.current, categoriesRef.current, aboutRef.current]
    elements.forEach((el) => el && observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden opacity-0 translate-y-8 transition-all duration-1000"
        >
          <Image
            src="/luxury-interior-design-modern-living-room.jpg"
            alt="Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/20" />
          <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
            <h1 className="font-serif text-5xl lg:text-7xl font-bold text-white mb-6 text-balance animate-fade-in-up">
              فضای خود را ارتقا دهید
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed text-balance animate-fade-in-up animation-delay-200">
              مجموعه‌های منتخب مبلمان و دکوراسیون ممتاز را کشف کنید که برای تبدیل خانه شما به یک پناهگاه طراحی شده‌اند
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              <Button size="lg" asChild className="text-base">
                <Link href="/shop">
                  خرید کنید
                  <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-base bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <Link href="/collections">مشاهده مجموعه‌ها</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section ref={featuredRef} className="py-16 lg:py-24 opacity-0 translate-y-8 transition-all duration-1000">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
                محصولات ویژه
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                انتخاب‌های دست‌چین شده از جدیدترین مجموعه ما
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link href="/shop">
                  مشاهده همه محصولات
                  <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section
          ref={categoriesRef}
          className="py-16 lg:py-24 bg-secondary opacity-0 translate-y-8 transition-all duration-1000"
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
                خرید بر اساس دسته‌بندی
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                مجموعه‌های با دقت انتخاب شده ما را کاوش کنید
              </p>
            </div>
            <div className="md:grid md:grid-cols-3 md:gap-6 lg:gap-8 flex md:flex-none overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group relative h-[400px] min-w-[280px] md:min-w-0 overflow-hidden rounded-lg snap-start flex-shrink-0"
                >
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="font-serif text-3xl lg:text-4xl font-bold text-white">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} className="py-16 lg:py-24 opacity-0 translate-y-8 transition-all duration-1000">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative h-[400px] lg:h-[600px] rounded-lg overflow-hidden">
                <Image src="/artisan-crafting-furniture-workshop.jpg" alt="داستان ما" fill className="object-cover" />
              </div>
              <div className="space-y-6">
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground text-balance">
                  ساخته شده با هدف
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  هر قطعه در مجموعه ما با دقت از صنعتگران و طراحانی انتخاب شده که تعهد ما به کیفیت، پایداری و طراحی
                  بی‌زمان را به اشتراک می‌گذارند.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  ما معتقدیم که خانه شما باید بازتابی از ارزش‌ها و زیبایی‌شناسی شما باشد. به همین دلیل ما با سازندگانی
                  همکاری می‌کنیم که صنعتگری و تولید اخلاقی را در اولویت قرار می‌دهند.
                </p>
                <Button size="lg" asChild>
                  <Link href="/about">
                    بیشتر درباره ما بدانید
                    <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground text-balance">Alamh bégirid</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                برای دریافت نکات طراحی، محصولات جدید و پیشنهادات ویژه در خبرنامه ما عضو شوید
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="ایمیل خود را وارد کنید"
                  className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button size="lg">عضویت</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
