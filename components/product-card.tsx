"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
}

export function ProductCard({ id, name, price, image, category }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="group">
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors" />
          <Button
            size="icon"
            className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault()
              // Add to cart logic
            }}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">افزودن به سبد خرید</span>
          </Button>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{category}</p>
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors text-balance">
            {name}
          </h3>
          <p className="text-lg font-semibold text-foreground">{price.toFixed(2)} تومان</p>
        </div>
      </div>
    </Link>
  )
}
