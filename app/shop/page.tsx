"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { LoadingSpinner } from "@/components/loading-spinner"
import { products } from "@/lib/products-data"
import { Breadcrumb } from "@/components/breadcrumb"

export default function ShopPage() {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const filteredProducts = products
    .filter((product) => {
      const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1]
      const inCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const inMaterial = selectedMaterials.length === 0 || selectedMaterials.includes(product.material)
      return inPriceRange && inCategory && inMaterial
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price
      if (sortBy === "price-desc") return b.price - a.price
      return 0
    })

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleMaterial = (material: string) => {
    setSelectedMaterials((prev) => (prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]))
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedMaterials([])
    setPriceRange([0, 1000])
  }

  const FilterContent = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">دسته‌بندی</h3>
        <div className="space-y-3">
          {["مبلمان", "روشنایی", "دکوراسیون خانه", "منسوجات"].map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">محدوده قیمت</h3>
        <div className="space-y-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={1000} step={10} className="w-full" />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{priceRange[0]} تومان</span>
            <span>{priceRange[1]} تومان</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">جنس</h3>
        <div className="space-y-3">
          {["چوب", "فلز", "سرامیک", "پارچه"].map((material) => (
            <div key={material} className="flex items-center gap-2">
              <Checkbox
                id={material}
                checked={selectedMaterials.includes(material)}
                onCheckedChange={() => toggleMaterial(material)}
              />
              <Label htmlFor={material} className="text-sm cursor-pointer">
                {material}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: "خانه", href: "/" }, { label: "فروشگاه" }]} />

        {/* Products Grid */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Desktop Filters */}
              <aside className="hidden lg:block w-64 flex-shrink-0 lg:order-2">
                <div className="sticky top-24 space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-foreground text-lg">فیلترها</h2>
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      پاک کردن همه
                    </Button>
                  </div>
                  <FilterContent />
                </div>
              </aside>

              {/* Products */}
              <div className="flex-1 lg:order-1">
                <div className="flex items-center justify-between mb-8">
                  <p className="text-muted-foreground">نمایش {filteredProducts.length} محصول</p>

                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild className="lg:hidden">
                      <Button variant="outline" size="sm">
                        <SlidersHorizontal className="h-4 w-4 ml-2" />
                        فیلترها
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] overflow-y-auto p-0">
                      <div className="sticky top-0 bg-background z-10 p-6 border-b border-border flex items-center justify-between">
                        <SheetTitle className="text-right text-lg">فیلترها</SheetTitle>
                        <Button variant="outline" size="sm" onClick={() => {}}>
                          بستن
                        </Button>
                      </div>
                      <div className="p-6">
                        <FilterContent />
                      </div>
                      <div className="sticky bottom-0 bg-background border-t border-border p-4">
                        <Button variant="outline" className="w-full bg-transparent" onClick={clearFilters}>
                          پاک کردن همه
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Sort */}
                  <select
                    className="px-4 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">مرتب‌سازی: ویژه</option>
                    <option value="price-asc">قیمت: کم به زیاد</option>
                    <option value="price-desc">قیمت: زیاد به کم</option>
                  </select>
                </div>

                {/* Grid layout change for mobile */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground text-lg">محصولی با این فیلترها یافت نشد</p>
                    <Button variant="outline" className="mt-4 bg-transparent" onClick={clearFilters}>
                      پاک کردن فیلترها
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
