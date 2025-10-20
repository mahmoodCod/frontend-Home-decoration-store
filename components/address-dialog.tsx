"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/lib/cart-context"
import { toast } from "sonner"

interface AddressDialogProps {
  trigger?: React.ReactNode
}

export function AddressDialog({ trigger }: AddressDialogProps) {
  const { addAddress } = useCart()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    fullName: "",
    phone: "",
    province: "",
    city: "",
    postalCode: "",
    fullAddress: "",
    isDefault: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addAddress(formData)
    setOpen(false)
    setFormData({
      title: "",
      fullName: "",
      phone: "",
      province: "",
      city: "",
      postalCode: "",
      fullAddress: "",
      isDefault: false,
    })
    toast.success("آدرس با موفقیت اضافه شد")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || <Button>افزودن آدرس جدید</Button>}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">افزودن آدرس جدید</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">عنوان آدرس *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="مثال: خانه، محل کار"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">نام و نام خانوادگی *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="نام گیرنده"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">شماره تماس *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="09123456789"
                required
                dir="ltr"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="province">استان *</Label>
              <Input
                id="province"
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                placeholder="مثال: تهران"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">شهر *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="مثال: تهران"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="postalCode">کد پستی *</Label>
            <Input
              id="postalCode"
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              placeholder="1234567890"
              required
              dir="ltr"
              maxLength={10}
            />
            <p className="text-xs text-muted-foreground">کد پستی باید 10 رقم باشد</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullAddress">آدرس کامل *</Label>
            <Textarea
              id="fullAddress"
              value={formData.fullAddress}
              onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
              placeholder="خیابان، کوچه، پلاک، واحد"
              required
              rows={3}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isDefault"
              checked={formData.isDefault}
              onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
              className="w-4 h-4"
            />
            <Label htmlFor="isDefault" className="cursor-pointer">
              به عنوان آدرس پیش‌فرض تنظیم شود
            </Label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              ذخیره آدرس
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              انصراف
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
