"use client"

import Link from "next/link"
import { ShoppingCart, Menu, Search, User, Store, Package, Info, Phone, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import { Logo } from "@/components/logo"

export function Header() {
  const { cartCount, user } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)

  const allProducts = [
    { id: "1", name: "گلدان سرامیکی مینیمال", price: 89.99 },
    { id: "2", name: "پتوی پشمی بافته شده", price: 149.99 },
    { id: "3", name: "میز جلو مبلی دست‌ساز", price: 599.99 },
    { id: "4", name: "چراغ رومیزی طراح", price: 199.99 },
    { id: "5", name: "هنر دیواری مجسمه‌ای", price: 299.99 },
    { id: "6", name: "صندلی مخملی تاکیدی", price: 799.99 },
    { id: "7", name: "چراغ ایستاده برنجی", price: 349.99 },
    { id: "8", name: "ست کوسن کتانی", price: 79.99 },
  ]

  const searchResults = searchQuery ? allProducts.filter((product) => product.name.includes(searchQuery)) : []

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/shop"
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors group"
            >
              <Store className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span>فروشگاه</span>
            </Link>
            <Link
              href="/collections"
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors group"
            >
              <Package className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span>مجموعه‌ها</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors group"
            >
              <Info className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span>درباره ما</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors group"
            >
              <Phone className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span>تماس با ما</span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">جستجو</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>جستجوی محصولات</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <Input
                    placeholder="نام محصول را وارد کنید..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                  {searchQuery && (
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {searchResults.length > 0 ? (
                        searchResults.map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            onClick={() => setSearchOpen(false)}
                            className="block p-3 rounded-lg hover:bg-secondary transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{product.name}</span>
                              <span className="text-muted-foreground">{product.price} تومان</span>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <p className="text-center text-muted-foreground py-8">محصولی یافت نشد</p>
                      )}
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            <Link href={user ? "/profile" : "/register"}>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
                <span className="sr-only">حساب کاربری</span>
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">سبد خرید</span>
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">منو</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0">
                {/* Menu Header with Logo */}
                <div className="p-6 border-b border-border bg-secondary/30">
                  <Logo />
                </div>

                {/* Menu Items */}
                <nav className="flex flex-col gap-2 p-4">
                  <Link
                    href="/shop"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors group"
                  >
                    <Store className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-medium">فروشگاه</span>
                  </Link>
                  <Link
                    href="/collections"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors group"
                  >
                    <Package className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-medium">مجموعه‌ها</span>
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors group"
                  >
                    <Info className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-medium">درباره ما</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors group"
                  >
                    <Phone className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-medium">تماس با ما</span>
                  </Link>

                  {/* Divider */}
                  <div className="my-2 border-t border-border" />

                  {/* Profile/Login */}
                  <Link
                    href={user ? "/profile" : "/register"}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors group"
                  >
                    <UserCircle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-medium">{user ? "پروفایل من" : "ورود / ثبت نام"}</span>
                  </Link>

                  {/* Search on Mobile */}
                  <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
                    <DialogTrigger asChild>
                      <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors group w-full text-right">
                        <Search className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="font-medium">جستجو</span>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>جستجوی محصولات</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <Input
                          placeholder="نام محصول را وارد کنید..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full"
                        />
                        {searchQuery && (
                          <div className="space-y-2 max-h-[300px] overflow-y-auto">
                            {searchResults.length > 0 ? (
                              searchResults.map((product) => (
                                <Link
                                  key={product.id}
                                  href={`/product/${product.id}`}
                                  onClick={() => setSearchOpen(false)}
                                  className="block p-3 rounded-lg hover:bg-secondary transition-colors"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium">{product.name}</span>
                                    <span className="text-muted-foreground">{product.price} تومان</span>
                                  </div>
                                </Link>
                              ))
                            ) : (
                              <p className="text-center text-muted-foreground py-8">محصولی یافت نشد</p>
                            )}
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
