export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  material: string
  description: string
  details: {
    material: string
    dimensions: string
    weight: string
    craftedBy: string
    unique: string
  }
  images: string[]
  shipping: string
  returns: string
  care: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "گلدان سرامیکی مینیمال",
    price: 89.99,
    image: "/minimalist-ceramic-vase.png",
    category: "دکوراسیون خانه",
    material: "سرامیک",
    description:
      "یک گلدان سرامیکی زیبا با خطوط تمیز و زیبایی‌شناسی مینیمالیستی. مناسب برای نمایش گل‌های تازه یا به عنوان یک قطعه تزئینی مستقل. ساخته شده توسط صنعتگران ماهر با استفاده از تکنیک‌های سنتی.",
    details: {
      material: "سرامیک با کیفیت بالا",
      dimensions: "ارتفاع 20 سانتی‌متر × عرض 10 سانتی‌متر",
      weight: "680 گرم",
      craftedBy: "صنعتگران ماهر",
      unique: "هر قطعه منحصر به فرد است",
    },
    images: [
      "/minimalist-ceramic-vase-front-view.jpg",
      "/minimalist-ceramic-vase-side-view.jpg",
      "/minimalist-ceramic-vase-detail.jpg",
      "/minimalist-ceramic-vase-lifestyle.jpg",
    ],
    shipping: "ارسال رایگان برای سفارش‌های بالای 100 تومان. ارسال استاندارد 5-7 روز کاری طول می‌کشد.",
    returns: "بازگشت کالا تا 30 روز پس از خرید پذیرفته می‌شود. کالا باید در شرایط اولیه باشد.",
    care: "با یک پارچه نرم و مرطوب تمیز کنید. از مواد شیمیایی قوی یا مواد ساینده خودداری کنید. قابل شستشو در ماشین ظرفشویی نیست.",
  },
  {
    id: "2",
    name: "پتوی پشمی بافته شده",
    price: 149.99,
    image: "/luxury-wool-throw-blanket.jpg",
    category: "منسوجات",
    material: "پارچه",
    description:
      "پتوی پشمی لوکس با بافت نرم و گرم. مناسب برای استفاده روی مبل یا تخت. این پتو با استفاده از بهترین پشم طبیعی بافته شده و دوام بالایی دارد.",
    details: {
      material: "پشم طبیعی 100%",
      dimensions: "طول 180 سانتی‌متر × عرض 130 سانتی‌متر",
      weight: "1200 گرم",
      craftedBy: "بافندگان حرفه‌ای",
      unique: "بافت دست‌ساز با کیفیت عالی",
    },
    images: [
      "/luxury-wool-throw-blanket.jpg",
      "/luxury-wool-throw-blanket-detail.jpg",
      "/luxury-wool-throw-blanket-lifestyle.jpg",
      "/luxury-wool-throw-blanket-texture.jpg",
    ],
    shipping: "ارسال رایگان برای سفارش‌های بالای 100 تومان. ارسال استاندارد 5-7 روز کاری طول می‌کشد.",
    returns: "بازگشت کالا تا 30 روز پس از خرید پذیرفته می‌شود. کالا باید در شرایط اولیه باشد.",
    care: "شستشوی دستی با آب سرد توصیه می‌شود. از خشک‌کن استفاده نکنید. در سایه خشک کنید.",
  },
  {
    id: "3",
    name: "میز جلو مبلی دست‌ساز",
    price: 599.99,
    image: "/modern-wooden-coffee-table.png",
    category: "مبلمان",
    material: "چوب",
    description:
      "میز جلو مبلی مدرن با طراحی منحصر به فرد. ساخته شده از چوب بلوط طبیعی با رویه صیقلی. این میز ترکیبی از زیبایی و کاربرد است و فضای نشیمن شما را متحول می‌کند.",
    details: {
      material: "چوب بلوط طبیعی",
      dimensions: "طول 120 سانتی‌متر × عرض 60 سانتی‌متر × ارتفاع 45 سانتی‌متر",
      weight: "18 کیلوگرم",
      craftedBy: "نجاران ماهر",
      unique: "طراحی دست‌ساز با رگه‌های طبیعی چوب",
    },
    images: [
      "/modern-wooden-coffee-table.png",
      "/modern-wooden-coffee-table-side.jpg",
      "/modern-wooden-coffee-table-detail.jpg",
      "/modern-wooden-coffee-table-lifestyle.jpg",
    ],
    shipping: "ارسال رایگان. ارسال 7-10 روز کاری به دلیل حجم بزرگ.",
    returns: "بازگشت کالا تا 30 روز پس از خرید پذیرفته می‌شود. هزینه ارسال برگشت به عهده خریدار است.",
    care: "با پارچه نرم و خشک گردگیری کنید. از قرار دادن اشیاء داغ مستقیماً روی سطح خودداری کنید. هر 6 ماه یکبار با روغن چوب تیمار کنید.",
  },
  {
    id: "4",
    name: "چراغ رومیزی طراح",
    price: 199.99,
    image: "/modern-table-lamp.jpg",
    category: "روشنایی",
    material: "فلز",
    description:
      "چراغ رومیزی مدرن با طراحی صنعتی. پایه فلزی محکم با سایه پارچه‌ای نرم. این چراغ نور گرم و دلنشینی ایجاد می‌کند و برای میز کار یا پاتختی عالی است.",
    details: {
      material: "پایه فلزی با سایه پارچه‌ای",
      dimensions: "ارتفاع 55 سانتی‌متر × قطر پایه 15 سانتی‌متر",
      weight: "2.5 کیلوگرم",
      craftedBy: "طراحان صنعتی",
      unique: "طراحی مدرن با قابلیت تنظیم نور",
    },
    images: [
      "/modern-table-lamp.jpg",
      "/modern-table-lamp-on.jpg",
      "/modern-table-lamp-detail.jpg",
      "/modern-table-lamp-lifestyle.jpg",
    ],
    shipping: "ارسال رایگان برای سفارش‌های بالای 100 تومان. ارسال استاندارد 5-7 روز کاری طول می‌کشد.",
    returns: "بازگشت کالا تا 30 روز پس از خرید پذیرفته می‌شود. کالا باید در شرایط اولیه باشد.",
    care: "با پارچه نرم گردگیری کنید. قبل از تمیز کردن دوشاخه را از برق بکشید. از مواد شیمیایی قوی استفاده نکنید.",
  },
  {
    id: "5",
    name: "هنر دیواری مجسمه‌ای",
    price: 299.99,
    image: "/abstract-wall-sculpture.jpg",
    category: "دکوراسیون خانه",
    material: "فلز",
    description:
      "مجسمه دیواری انتزاعی با طراحی هنری. ساخته شده از فلز با پوشش مات. این اثر هنری به دیوار شما عمق و شخصیت می‌بخشد و نقطه کانونی جذابی ایجاد می‌کند.",
    details: {
      material: "فلز با پوشش مات",
      dimensions: "عرض 80 سانتی‌متر × ارتفاع 60 سانتی‌متر × عمق 5 سانتی‌متر",
      weight: "3.2 کیلوگرم",
      craftedBy: "هنرمندان معاصر",
      unique: "طراحی انتزاعی منحصر به فرد",
    },
    images: [
      "/abstract-wall-sculpture.jpg",
      "/abstract-wall-sculpture-angle.jpg",
      "/abstract-wall-sculpture-detail.jpg",
      "/abstract-wall-sculpture-lifestyle.jpg",
    ],
    shipping: "ارسال رایگان برای سفارش‌های بالای 100 تومان. ارسال استاندارد 5-7 روز کاری طول می‌کشد.",
    returns: "بازگشت کالا تا 30 روز پس از خرید پذیرفته می‌شود. کالا باید در شرایط اولیه باشد.",
    care: "با پارچه نرم و خشک گردگیری کنید. از مواد ساینده استفاده نکنید. در معرض رطوبت زیاد قرار ندهید.",
  },
  {
    id: "6",
    name: "صندلی مخملی تاکیدی",
    price: 799.99,
    image: "/velvet-accent-chair.png",
    category: "مبلمان",
    material: "پارچه",
    description:
      "صندلی راحتی لوکس با روکش مخمل نرم. پایه‌های چوبی محکم و طراحی ارگونومیک. این صندلی ترکیبی از راحتی و سبک است و به هر فضایی لمسی از شیک‌پوشی می‌بخشد.",
    details: {
      material: "روکش مخمل با پایه چوبی",
      dimensions: "عرض 75 سانتی‌متر × عمق 80 سانتی‌متر × ارتفاع 85 سانتی‌متر",
      weight: "15 کیلوگرم",
      craftedBy: "تولیدکنندگان مبلمان حرفه‌ای",
      unique: "طراحی ارگونومیک با فوم فشرده",
    },
    images: [
      "/velvet-accent-chair.png",
      "/velvet-accent-chair-side.jpg",
      "/velvet-accent-chair-detail.jpg",
      "/velvet-accent-chair-lifestyle.jpg",
    ],
    shipping: "ارسال رایگان. ارسال 7-10 روز کاری به دلیل حجم بزرگ.",
    returns: "بازگشت کالا تا 30 روز پس از خرید پذیرفته می‌شود. هزینه ارسال برگشت به عهده خریدار است.",
    care: "با جاروبرقی نرم تمیز کنید. لکه‌ها را فوراً با پارچه مرطوب پاک کنید. از قرار دادن در معرض نور مستقیم خورشید خودداری کنید.",
  },
  {
    id: "7",
    name: "چراغ ایستاده برنجی",
    price: 349.99,
    image: "/brass-floor-lamp.png",
    category: "روشنایی",
    material: "فلز",
    description:
      "چراغ ایستاده کلاسیک با بدنه برنجی. طراحی بی‌زمان که با هر سبک دکوراسیونی هماهنگ می‌شود. این چراغ نور محیطی عالی ایجاد می‌کند و به فضای شما گرمای خاصی می‌بخشد.",
    details: {
      material: "برنج با پوشش صیقلی",
      dimensions: "ارتفاع 165 سانتی‌متر × قطر پایه 30 سانتی‌متر",
      weight: "6.5 کیلوگرم",
      craftedBy: "سازندگان روشنایی حرفه‌ای",
      unique: "طراحی کلاسیک با کیفیت ساخت عالی",
    },
    images: [
      "/brass-floor-lamp.png",
      "/brass-floor-lamp-on.jpg",
      "/brass-floor-lamp-detail.jpg",
      "/brass-floor-lamp-lifestyle.jpg",
    ],
    shipping: "ارسال رایگان برای سفارش‌های بالای 100 تومان. ارسال استاندارد 5-7 روز کاری طول می‌کشد.",
    returns: "بازگشت کالا تا 30 روز پس از خرید پذیرفته می‌شود. کالا باید در شرایط اولیه باشد.",
    care: "با پارچه نرم و خشک گردگیری کنید. برای حفظ درخشش برنج، از پولیش مخصوص فلز استفاده کنید. قبل از تمیز کردن دوشاخه را از برق بکشید.",
  },
  {
    id: "8",
    name: "ست کوسن کتانی",
    price: 79.99,
    image: "/linen-cushions.jpg",
    category: "منسوجات",
    material: "پارچه",
    description:
      "ست دو تایی کوسن با روکش کتانی طبیعی. پارچه تنفس‌پذیر و راحت با رنگ‌های خنثی. این کوسن‌ها راحتی و سبک را به مبل یا تخت شما اضافه می‌کنند.",
    details: {
      material: "کتان طبیعی 100%",
      dimensions: "50 سانتی‌متر × 50 سانتی‌متر (هر کوسن)",
      weight: "400 گرم (هر کوسن)",
      craftedBy: "تولیدکنندگان منسوجات",
      unique: "پارچه طبیعی با دوخت دست‌ساز",
    },
    images: [
      "/linen-cushions.jpg",
      "/linen-cushions-detail.jpg",
      "/linen-cushions-lifestyle.jpg",
      "/linen-cushions-texture.jpg",
    ],
    shipping: "ارسال رایگان برای سفارش‌های بالای 100 تومان. ارسال استاندارد 5-7 روز کاری طول می‌کشد.",
    returns: "بازگشت کالا تا 30 روز پس از خرید پذیرفته می‌شود. کالا باید در شرایط اولیه باشد.",
    care: "شستشوی ماشینی در دمای 30 درجه. از سفیدکننده استفاده نکنید. اتو در دمای متوسط.",
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const currentProduct = getProductById(productId)
  if (!currentProduct) return []

  // Get products from the same category, excluding the current product
  const relatedByCategory = products.filter(
    (product) => product.category === currentProduct.category && product.id !== productId,
  )

  // If we have enough products from the same category, return them
  if (relatedByCategory.length >= limit) {
    return relatedByCategory.slice(0, limit)
  }

  // Otherwise, fill with other products
  const otherProducts = products.filter(
    (product) => product.category !== currentProduct.category && product.id !== productId,
  )

  return [...relatedByCategory, ...otherProducts].slice(0, limit)
}
