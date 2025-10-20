"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Package, MapPin, Heart, LogOut, Edit, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddressDialog } from "@/components/address-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ProductCard } from "@/components/product-card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { toast } from "sonner"

export default function ProfilePage() {
  const { user, logout, updateUser, favorites, removeFromFavorites, removeAddress } = useCart()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
  })

  useEffect(() => {
    if (!user) {
      router.push("/register")
    } else {
      setIsLoading(false)
    }
  }, [user, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleSave = () => {
    updateUser(formData)
    setIsEditing(false)
    toast.success("اطلاعات با موفقیت ذخیره شد")
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground">پروفایل من</h1>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">
                    <LogOut className="ml-2 h-4 w-4" />
                    خروج
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="font-serif text-2xl">خروج از حساب کاربری</AlertDialogTitle>
                    <AlertDialogDescription className="text-base">
                      آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟ سبد خرید شما نیز پاک خواهد شد.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>انصراف</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>خروج</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="info">اطلاعات</TabsTrigger>
                <TabsTrigger value="orders">سفارشات</TabsTrigger>
                <TabsTrigger value="addresses">آدرس‌ها</TabsTrigger>
                <TabsTrigger value="favorites">علاقه‌مندی‌ها</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-6 mt-6">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-2xl font-bold text-foreground">اطلاعات شخصی</h2>
                    {!isEditing && (
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit className="ml-2 h-4 w-4" />
                        ویرایش
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">شماره موبایل</Label>
                      <Input id="phone" value={user.phone} disabled className="bg-muted" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">نام و نام خانوادگی</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                        placeholder="نام خود را وارد کنید"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">ایمیل</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                        placeholder="ایمیل خود را وارد کنید"
                      />
                    </div>

                    {isEditing && (
                      <div className="flex gap-4 pt-4">
                        <Button onClick={handleSave}>ذخیره تغییرات</Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          انصراف
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="orders" className="space-y-6 mt-6">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <Package className="h-6 w-6 text-primary" />
                    <h2 className="font-serif text-2xl font-bold text-foreground">سفارشات من</h2>
                  </div>
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground text-lg">هنوز سفارشی ثبت نکرده‌اید</p>
                    <Button asChild className="mt-4">
                      <a href="/shop">شروع خرید</a>
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="addresses" className="space-y-6 mt-6">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-6 w-6 text-primary" />
                      <h2 className="font-serif text-2xl font-bold text-foreground">آدرس‌های من</h2>
                    </div>
                    <AddressDialog />
                  </div>
                  {user.addresses && user.addresses.length > 0 ? (
                    <div className="space-y-4">
                      {user.addresses.map((address) => (
                        <div key={address.id} className="border border-border rounded-lg p-4 space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg">{address.title}</h3>
                                {address.isDefault && (
                                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                                    پیش‌فرض
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{address.fullName}</p>
                              <p className="text-sm text-muted-foreground" dir="ltr">
                                {address.phone}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                if (confirm("آیا از حذف این آدرس مطمئن هستید؟")) {
                                  removeAddress(address.id)
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                          <p className="text-sm">
                            {address.province}، {address.city}
                          </p>
                          <p className="text-sm">{address.fullAddress}</p>
                          <p className="text-sm text-muted-foreground" dir="ltr">
                            کد پستی: {address.postalCode}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground text-lg">هنوز آدرسی ثبت نکرده‌اید</p>
                      <AddressDialog trigger={<Button className="mt-4">افزودن آدرس جدید</Button>} />
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="favorites" className="space-y-6 mt-6">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <Heart className="h-6 w-6 text-primary" />
                    <h2 className="font-serif text-2xl font-bold text-foreground">علاقه‌مندی‌های من</h2>
                  </div>
                  {favorites.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                      {favorites.map((product) => (
                        <div key={product.id} className="relative">
                          <ProductCard {...product} />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 left-2 z-10"
                            onClick={() => {
                              removeFromFavorites(product.id)
                              toast.success("محصول از علاقه‌مندی‌ها حذف شد")
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground text-lg">هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید</p>
                      <Button asChild className="mt-4">
                        <a href="/shop">مشاهده محصولات</a>
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
