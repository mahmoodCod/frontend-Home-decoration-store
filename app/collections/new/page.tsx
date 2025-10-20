import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Breadcrumb } from "@/components/breadcrumb"

const newProducts = [
  {
    id: "7",
    name: "چراغ ایستاده برنجی",
    price: 349.99,
    image: "/brass-floor-lamp.png",
    category: "روشنایی",
  },
  {
    id: "8",
    name: "ست کوسن کتانی",
    price: 79.99,
    image: "/linen-cushions.jpg",
    category: "منسوجات",
  },
  {
    id: "5",
    name: "هنر دیواری مجسمه‌ای",
    price: 299.99,
    image: "/abstract-wall-sculpture.jpg",
    category: "دکوراسیون خانه",
  },
  {
    id: "6",
    name: "صندلی مخملی تاکیدی",
    price: 799.99,
    image: "/velvet-accent-chair.png",
    category: "مبلمان",
  },
]

export default function NewCollectionPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Breadcrumb
          items={[{ label: "خانه", href: "/" }, { label: "مجموعه‌ها", href: "/collections" }, { label: "جدیدترین‌ها" }]}
        />

        <section className="py-16 lg:py-24 bg-secondary">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl lg:text-6xl font-bold text-foreground text-balance mb-6">
                جدیدترین محصولات
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                آخرین محصولات اضافه شده به مجموعه ما را کشف کنید
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {newProducts.map((product) => (
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
