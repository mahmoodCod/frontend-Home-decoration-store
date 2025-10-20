import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Breadcrumb } from "@/components/breadcrumb"

const featuredProducts = [
  {
    id: "3",
    name: "میز جلو مبلی دست‌ساز",
    price: 599.99,
    image: "/modern-wooden-coffee-table.png",
    category: "مبلمان",
  },
  {
    id: "6",
    name: "صندلی مخملی تاکیدی",
    price: 799.99,
    image: "/velvet-accent-chair.png",
    category: "مبلمان",
  },
  {
    id: "5",
    name: "هنر دیواری مجسمه‌ای",
    price: 299.99,
    image: "/abstract-wall-sculpture.jpg",
    category: "دکوراسیون خانه",
  },
  {
    id: "7",
    name: "چراغ ایستاده برنجی",
    price: 349.99,
    image: "/brass-floor-lamp.png",
    category: "روشنایی",
  },
]

export default function FeaturedCollectionPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Breadcrumb
          items={[{ label: "خانه", href: "/" }, { label: "مجموعه‌ها", href: "/collections" }, { label: "محصولات ویژه" }]}
        />

        <section className="py-16 lg:py-24 bg-secondary">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl lg:text-6xl font-bold text-foreground text-balance mb-6">
                محصولات ویژه
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                برگزیده‌های دست‌چین شده توسط تیم ما برای شما
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
