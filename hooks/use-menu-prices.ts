"use client"

import useSWR from "swr"
import type { MenuCategory, MenuItem } from "@/lib/menu-data"
import { menuData as staticMenuData } from "@/lib/menu-data"

interface DBMenuPrice {
  id: string
  name: string
  description: string
  price_en: number
  price_familj: number | null
  category: string
  vegetarian: boolean
  spicy: boolean
  updated_at: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useMenuPrices() {
  const { data, error, isLoading, mutate } = useSWR("/api/menu-prices", fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 30000,
  })

  // Merge DB prices into static menu data structure
  const menuDataWithPrices: MenuCategory[] = staticMenuData.map((category) => ({
    ...category,
    items: category.items.map((item) => {
      const dbPrice = data?.prices?.find((p: DBMenuPrice) => p.id === item.id)
      if (dbPrice) {
        return {
          ...item,
          priceEn: dbPrice.price_en,
          priceFamilj: dbPrice.price_familj ?? undefined,
        }
      }
      return item
    }),
  }))

  // Flat list of all items with DB prices
  const allItems: MenuItem[] = menuDataWithPrices.flatMap((cat) => cat.items)

  return {
    menuData: menuDataWithPrices,
    allItems,
    dbPrices: (data?.prices as DBMenuPrice[]) || [],
    isLoading,
    error,
    mutate,
  }
}
