"use client"

import React from "react"
import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  RefreshCw, Lock, Save, Pencil, Search, Leaf, Flame,
  XCircle, CheckCircle, UtensilsCrossed,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface MenuPrice {
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

const categoryLabels: Record<string, string> = {
  "vardagspizzor": "Pizzor",
  "tacos-mexicana": "Tacos / Mexicana",
  "kycklingpizzor": "Kycklingpizzor",
  "fisk-skaldjur": "Fisk & Skaldjur",
  "kebab-special": "Kebab / Special",
  "lyxpizzor": "Lyxpizzor",
  "rullar-tallrikar": "Rullar / Tallrikar",
  "burgare": "Burgare",
  "shawarma": "Shawarma & Pommes",
}

const ADMIN_PASSWORD = "55555"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)

  const [menuPrices, setMenuPrices] = useState<MenuPrice[]>([])
  const [pricesLoading, setPricesLoading] = useState(true)
  const [pricesError, setPricesError] = useState<string | null>(null)
  const [editingPrice, setEditingPrice] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<{ price_en: number; price_familj: number | null }>({ price_en: 0, price_familj: null })
  const [savingPrice, setSavingPrice] = useState<string | null>(null)
  const [savedPrice, setSavedPrice] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  const fetchMenuPrices = useCallback(async () => {
    setPricesLoading(true)
    setPricesError(null)
    try {
      const res = await fetch("/api/menu-prices")
      const data = await res.json()
      if (data.success) {
        setMenuPrices(data.prices)
      } else {
        setPricesError("Kunde inte ladda menypriser")
      }
    } catch {
      setPricesError("Kunde inte ladda menypriser")
    } finally {
      setPricesLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchMenuPrices()
    }
  }, [isAuthenticated, fetchMenuPrices])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
  }

  const startEditing = (item: MenuPrice) => {
    setEditingPrice(item.id)
    setEditValues({ price_en: item.price_en, price_familj: item.price_familj })
  }

  const cancelEditing = () => {
    setEditingPrice(null)
    setEditValues({ price_en: 0, price_familj: null })
  }

  const savePrice = async (id: string) => {
    setSavingPrice(id)
    try {
      const res = await fetch("/api/menu-prices", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, price_en: editValues.price_en, price_familj: editValues.price_familj }),
      })
      const data = await res.json()
      if (data.success) {
        setMenuPrices((prev) =>
          prev.map((p) =>
            p.id === id
              ? { ...p, price_en: editValues.price_en, price_familj: editValues.price_familj, updated_at: new Date().toISOString() }
              : p
          )
        )
        setEditingPrice(null)
        setSavedPrice(id)
        setTimeout(() => setSavedPrice(null), 2000)
      }
    } catch {
      // Ignore
    } finally {
      setSavingPrice(null)
    }
  }

  const filteredPrices = menuPrices.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || item.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const uniqueCategories = [...new Set(menuPrices.map((p) => p.category))]
  const totalItems = menuPrices.length

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4">
        <Card className="max-w-sm w-full border border-[#333] bg-[#222] shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-5">
              <Image src="/images/logo.png" alt="Take & Go Falkenberg" width={80} height={80} className="object-contain" />
            </div>
            <CardTitle className="text-2xl font-bold text-[#f5f5f5]">Admin Panel</CardTitle>
            <p className="text-[#999] text-sm mt-1">Ange losenord for att fortsatta</p>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Losenord"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(false) }}
                className={`h-12 text-center text-lg tracking-widest bg-[#1a1a1a] border-[#444] text-[#f5f5f5] placeholder:text-[#666] ${passwordError ? "border-red-500 ring-2 ring-red-500/20" : ""}`}
                autoFocus
              />
              {passwordError && <p className="text-red-400 text-sm text-center">Fel losenord. Forsok igen.</p>}
              <Button type="submit" className="w-full h-12 bg-[#e63946] hover:bg-[#c5303c] text-white font-semibold text-base">
                <Lock className="w-4 h-4 mr-2" />
                Logga in
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#111]">
      {/* Header */}
      <header className="bg-[#1a1a1a] border-b border-[#333] sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Image src="/images/logo.png" alt="Take & Go Falkenberg" width={44} height={44} className="object-contain" />
              </Link>
              <div>
                <h1 className="text-lg font-bold text-[#f5f5f5]">Menyhantering</h1>
                <p className="text-xs text-[#888]">{totalItems} produkter i menyn</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchMenuPrices}
                disabled={pricesLoading}
                className="bg-transparent border-[#444] text-[#ccc] hover:bg-[#333] hover:text-[#f5f5f5] gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${pricesLoading ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Uppdatera</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAuthenticated(false)}
                className="text-[#888] hover:text-[#f5f5f5] hover:bg-[#333] text-xs"
              >
                Logga ut
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" />
            <Input
              placeholder="Sok efter produkt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#1a1a1a] border-[#333] text-[#f5f5f5] placeholder:text-[#666] focus:border-[#e63946] focus:ring-[#e63946]/20"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-[220px] bg-[#1a1a1a] border-[#333] text-[#ccc]">
              <SelectValue placeholder="Alla kategorier" />
            </SelectTrigger>
            <SelectContent className="bg-[#222] border-[#333]">
              <SelectItem value="all" className="text-[#ccc]">Alla kategorier</SelectItem>
              {uniqueCategories.map((cat) => (
                <SelectItem key={cat} value={cat} className="text-[#ccc]">{categoryLabels[cat] || cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Count */}
        <p className="text-sm text-[#888] mb-4">{filteredPrices.length} produkter visas</p>

        {/* Error state */}
        {pricesError && menuPrices.length === 0 ? (
          <Card className="border border-[#333] bg-[#1a1a1a]">
            <CardContent className="py-16 text-center">
              <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2 text-[#f5f5f5]">Kunde inte ladda menypriser</h2>
              <p className="text-[#888] mb-4 text-sm">Kontrollera din internetanslutning och forsok igen.</p>
              <Button onClick={fetchMenuPrices} className="bg-[#e63946] hover:bg-[#c5303c] text-white">
                <RefreshCw className="w-4 h-4 mr-2" />
                Forsok igen
              </Button>
            </CardContent>
          </Card>
        ) : pricesLoading && menuPrices.length === 0 ? (
          <div className="text-center py-16">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#888] mb-4" />
            <p className="text-[#888]">Laddar menypriser...</p>
          </div>
        ) : filteredPrices.length === 0 ? (
          <Card className="border border-[#333] bg-[#1a1a1a]">
            <CardContent className="py-16 text-center">
              <UtensilsCrossed className="w-12 h-12 text-[#555] mx-auto mb-4" />
              <p className="text-[#888]">Inga produkter matchar din sokning</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {filteredPrices.map((item) => {
              const isEditing = editingPrice === item.id
              const isSaving = savingPrice === item.id
              const justSaved = savedPrice === item.id

              return (
                <Card
                  key={item.id}
                  className={`border transition-all duration-300 ${
                    isEditing
                      ? "border-[#e63946] bg-[#1c1215] shadow-lg shadow-[#e63946]/5"
                      : justSaved
                        ? "border-emerald-500 bg-[#111c16]"
                        : "border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#3a3a3a]"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Item info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="font-semibold text-[#f5f5f5]">{item.name}</h4>
                          {item.vegetarian && (
                            <Badge className="text-[10px] bg-emerald-500/15 text-emerald-400 border-emerald-500/25 gap-0.5 px-1.5 py-0">
                              <Leaf className="w-2.5 h-2.5" /> Veg
                            </Badge>
                          )}
                          {item.spicy && (
                            <Badge className="text-[10px] bg-red-500/15 text-red-400 border-red-500/25 gap-0.5 px-1.5 py-0">
                              <Flame className="w-2.5 h-2.5" /> Stark
                            </Badge>
                          )}
                          {justSaved && (
                            <Badge className="text-[10px] bg-emerald-500/15 text-emerald-400 border-emerald-500/25 gap-0.5 px-1.5 py-0 animate-in fade-in">
                              <CheckCircle className="w-2.5 h-2.5" /> Sparat
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-[#777] truncate">{item.description}</p>
                        <span className="inline-block mt-1 text-[10px] text-[#666] bg-[#222] px-2 py-0.5 rounded-full">
                          {categoryLabels[item.category] || item.category}
                        </span>
                      </div>

                      {/* Prices / Edit */}
                      {isEditing ? (
                        <div className="flex items-end gap-3 flex-wrap">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] text-[#888] uppercase tracking-wider">Enkel (kr)</label>
                            <Input
                              type="number"
                              value={editValues.price_en}
                              onChange={(e) => setEditValues((prev) => ({ ...prev, price_en: Number(e.target.value) }))}
                              className="w-24 h-10 text-center font-bold text-lg bg-[#111] border-[#444] text-[#f5f5f5] focus:border-[#e63946]"
                              min={0}
                              autoFocus
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] text-[#888] uppercase tracking-wider">Familj (kr)</label>
                            <Input
                              type="number"
                              value={editValues.price_familj ?? ""}
                              onChange={(e) => setEditValues((prev) => ({ ...prev, price_familj: e.target.value ? Number(e.target.value) : null }))}
                              className="w-24 h-10 text-center font-bold text-lg bg-[#111] border-[#444] text-[#f5f5f5] focus:border-[#e63946]"
                              placeholder="-"
                              min={0}
                            />
                          </div>
                          <div className="flex gap-1.5">
                            <Button
                              size="icon"
                              onClick={() => savePrice(item.id)}
                              disabled={isSaving}
                              className="h-10 w-10 bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            </Button>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={cancelEditing}
                              className="h-10 w-10 bg-transparent border-[#444] text-[#999] hover:bg-[#333] hover:text-[#f5f5f5]"
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-xl font-bold text-[#e63946]">{item.price_en} kr</div>
                            {item.price_familj && (
                              <div className="text-xs text-[#888]">Familj: {item.price_familj} kr</div>
                            )}
                          </div>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => startEditing(item)}
                            className="h-9 w-9 bg-transparent border-[#333] text-[#888] hover:bg-[#e63946]/10 hover:text-[#e63946] hover:border-[#e63946]/30"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
