import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Breadcrumb } from "@/components/breadcrumb"

const collections = [
  {
    title: "جدیدترین‌ها",
    description: "آخرین محصولات اضافه شده به مجموعه ما",
    image: "/modern-furniture-collection.png",
    href: "/collections/new",
  },
  {
    title: "حراج ویژه",
    description: "تخفیف‌های استثنایی روی محصولات منتخب",
    image: "/designer-lighting-fixtures.jpg",
    href: "/collections/sale",
  },
  {
    title: "محصولات ویژه",
    description: "برگزیده‌های دست‌چین شده توسط تیم ما",
    image: "/home-decor-accessories.png",
    href: "/collections/featured",
  },
  {
    title: "مبلمان",
    description: "مبلمان مدرن و کلاسیک برای هر فضایی",
    image: "/modern-furniture-showroom.png",
    href: "/collections/furniture",
  },
  {
    title: "روشنایی",
    description: "چراغ‌های طراحی شده برای نورپردازی زیبا",
    image: "/designer-lighting-fixtures.jpg",
    href: "/collections/lighting",
  },
  {
    title: "دکوراسیون",
    description: "لوازم تزئینی برای زیباتر کردن خانه شما",
    image: "/home-decor-accessories.png",
    href: "/collections/decor",
  },
]

export default function CollectionsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Breadcrumb items={[{ label: "خانه", href: "/" }, { label: "مجموعه‌ها" }]} />

        <section className="py-16 lg:py-24 bg-secondary">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl lg:text-6xl font-bold text-foreground text-balance mb-6">
                مجموعه‌های ما
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                کاوش در مجموعه‌های با دقت انتخاب شده ما برای یافتن قطعات کامل برای خانه شما
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map((collection) => (
                <Link
                  key={collection.title}
                  href={collection.href}
                  className="group relative h-[400px] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-foreground/20" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="font-serif text-3xl font-bold text-white mb-2">{collection.title}</h3>
                    <p className="text-white/90 mb-4">{collection.description}</p>
                    <Button variant="secondary" size="sm" className="w-fit">
                      مشاهده مجموعه
                      <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
