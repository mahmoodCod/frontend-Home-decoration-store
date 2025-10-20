"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingCart, Heart } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useCart } from "@/lib/cart-context"
import { toast } from "sonner"
import { ProductComments } from "@/components/product-comments"
import { getCommentsByProductId } from "@/lib/comments-data"
import { useParams, useRouter } from "next/navigation"
import { getProductById, getRelatedProducts } from "@/lib/products-data"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string

  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addToCart, addToFavorites, removeFromFavorites, isFavorite } = useCart()

  const product = getProductById(productId)
  const relatedProducts = getRelatedProducts(productId, 4)

  useEffect(() => {
    if (!product) {
      toast.error("محصول مورد نظر یافت نشد")
      router.push("/shop")
    }
  }, [product, router])

  useEffect(() => {
    setQuantity(1)
    setSelectedImage(0)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [productId])

  if (!product) {
    return null
  }

  const isProductFavorite = isFavorite(product.id)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast.success(`${quantity} عدد ${product.name} به سبد خرید اضافه شد`)
  }

  const handleToggleFavorite = () => {
    if (isProductFavorite) {
      removeFromFavorites(product.id)
      toast.success("محصول از علاقه‌مندی‌ها حذف شد")
    } else {
      addToFavorites(product)
      toast.success("محصول به علاقه‌مندی‌ها اضافه شد")
    }
  }

  const productComments = getCommentsByProductId(product.id)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Product Details */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Images */}
              <div className="space-y-4">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={product.images[selectedImage] || "/placeholder.svg"}
                    alt="محصول"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden bg-muted border-2 transition-colors ${
                        selectedImage === index ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`محصول ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">{product.category}</p>
                  <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
                    {product.name}
                  </h1>
                  <p className="text-3xl font-semibold text-foreground">{product.price} تومان</p>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed">{product.description}</p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-foreground">تعداد:</span>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                      <ShoppingCart className="ml-2 h-5 w-5" />
                      افزودن به سبد خرید
                    </Button>
                    <Button
                      size="lg"
                      variant={isProductFavorite ? "default" : "outline"}
                      onClick={handleToggleFavorite}
                    >
                      <Heart className={`h-5 w-5 ${isProductFavorite ? "fill-current" : ""}`} />
                      <span className="sr-only">افزودن به علاقه‌مندی‌ها</span>
                    </Button>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="details">
                    <AccordionTrigger>جزئیات محصول</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• جنس: {product.details.material}</li>
                        <li>• ابعاد: {product.details.dimensions}</li>
                        <li>• وزن: {product.details.weight}</li>
                        <li>• {product.details.craftedBy}</li>
                        <li>• {product.details.unique}</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="shipping">
                    <AccordionTrigger>ارسال و بازگشت</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 text-muted-foreground">
                        <p>{product.shipping}</p>
                        <p>{product.returns}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="care">
                    <AccordionTrigger>دستورالعمل نگهداری</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 text-muted-foreground">
                        <p>{product.care}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <ProductComments comments={productComments} productId={product.id} />
          </div>
        </section>

        {/* Related Products */}
        <section className="py-16 lg:py-24 bg-secondary">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-8 text-center">
              شاید دوست داشته باشید
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {relatedProducts.map((product) => (
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
