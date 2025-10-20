import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Breadcrumb } from "@/components/breadcrumb"

const saleProducts = [
  {
    id: "2",
    name: "پتوی پشمی بافته شده",
    price: 149.99,
    image: "/luxury-wool-throw-blanket.jpg",
    category: "منسوجات",
  },
  {
    id: "4",
    name: "چراغ رومیزی طراح",
    price: 199.99,
    image: "/modern-table-lamp.jpg",
    category: "روشنایی",
  },
  {
    id: "1",
    name: "گلدان سرامیکی مینیمال",
    price: 89.99,
    image: "/minimalist-ceramic-vase.png",
    category: "دکوراسیون خانه",
  },
]

export default function SaleCollectionPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Breadcrumb
          items={[{ label: "خانه", href: "/" }, { label: "مجموعه‌ها", href: "/collections" }, { label: "حراج ویژه" }]}
        />

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
              {saleProducts.map((product) => (
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
