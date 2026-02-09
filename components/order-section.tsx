"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { ShoppingCart, Plus, Minus, Trash2, Phone, Check, Pizza, Beef, Drumstick, Fish, Utensils, Sparkles, Sandwich, X } from "lucide-react"
import { useMenuPrices } from "@/hooks/use-menu-prices"

const PHONE_NUMBER = "0722-562660"

const categoryIcons: Record<string, React.ReactNode> = {
  "vardagspizzor": <Pizza className="w-5 h-5" />,
  "tacos-mexicana": <Beef className="w-5 h-5" />,
  "kycklingpizzor": <Drumstick className="w-5 h-5" />,
  "fisk-skaldjur": <Fish className="w-5 h-5" />,
  "kebab-special": <Utensils className="w-5 h-5" />,
  "lyxpizzor": <Sparkles className="w-5 h-5" />,
  "rullar-tallrikar": <Utensils className="w-5 h-5" />,
  "burgare": <Sandwich className="w-5 h-5" />,
  "shawarma": <Utensils className="w-5 h-5" />,
}

interface CartItem {
  id: string
  name: string
  size: string
  price: number
  quantity: number
  extras: string[]
}

interface SelectedItem {
  id: string
  name: string
  description: string
  priceEn: number
  priceFamilj?: number
  category: string
}

export function OrderSection() {
  const { menuData, isLoading: menuLoading } = useMenuPrices()
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Modal state
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null)
  const [modalQuantity, setModalQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<"standard" | "familj" | "barn" | "glutenfri" | "dubbel">("standard")
  const [includedToppings, setIncludedToppings] = useState<string[]>([])

  useEffect(() => {
    if (menuData.length > 0 && !selectedCategory) {
      setSelectedCategory(menuData[0].id)
    }
  }, [menuData, selectedCategory])

  // Scroll-triggered visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const isPizzaCategory = ["vardagspizzor", "tacos-mexicana", "kycklingpizzor", "fisk-skaldjur", "kebab-special", "lyxpizzor"].includes(selectedCategory)

  const openItemModal = (item: SelectedItem & { vegetarian?: boolean; spicy?: boolean }) => {
    setSelectedItem(item)
    setModalQuantity(1)
    setSelectedSize("standard")
    const toppings = item.description.split(", ").map(t => t.trim())
    setIncludedToppings(toppings)
  }

  const closeModal = () => {
    setSelectedItem(null)
    setModalQuantity(1)
    setSelectedSize("standard")
    setIncludedToppings([])
  }

  const calculatePrice = () => {
    if (!selectedItem) return 0
    let basePrice = selectedItem.priceEn
    switch (selectedSize) {
      case "familj": basePrice = selectedItem.priceFamilj || selectedItem.priceEn + 150; break
      case "barn": basePrice = selectedItem.priceEn - 10; break
      case "glutenfri": basePrice = selectedItem.priceEn + 25; break
      case "dubbel": basePrice = selectedItem.priceEn + 10; break
      default: basePrice = selectedItem.priceEn
    }
    return basePrice * modalQuantity
  }

  const getSizeLabel = () => {
    switch (selectedSize) {
      case "familj": return "Familj"
      case "barn": return "Barn"
      case "glutenfri": return "Glutenfri"
      case "dubbel": return "Dubbel botten"
      default: return "Standard"
    }
  }

  const addToCartFromModal = () => {
    if (!selectedItem) return
    let unitPrice = selectedItem.priceEn
    switch (selectedSize) {
      case "familj": unitPrice = selectedItem.priceFamilj || selectedItem.priceEn + 150; break
      case "barn": unitPrice = selectedItem.priceEn - 10; break
      case "glutenfri": unitPrice = selectedItem.priceEn + 25; break
      case "dubbel": unitPrice = selectedItem.priceEn + 10; break
    }
    const cartId = `${selectedItem.id}-${selectedSize}-${Date.now()}`
    setCart(prev => [...prev, {
      id: cartId,
      name: selectedItem.name,
      size: getSizeLabel(),
      price: unitPrice,
      quantity: modalQuantity,
      extras: includedToppings,
    }])
    closeModal()
  }

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta
          return newQty > 0 ? { ...item, quantity: newQty } : item
        }
        return item
      }).filter(item => item.quantity > 0)
    )
  }

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const currentCategory = menuData.find(cat => cat.id === selectedCategory)

  return (
    <section ref={sectionRef} id="meny" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="inline-block text-primary text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Vår meny
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 text-balance">
           Upptäck våra smaker
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Handgjorda pizzor, saftiga burgare och äkta rätter – med kärlek och färska ingredienser. 
          </p>
          <div className="flex items-center justify-center mt-8">
            <a href="tel:0722562660">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-full px-8 py-6 text-base shadow-xl shadow-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1">
                <Phone className="w-4 h-4" />
              Ring för att beställa
              </Button>
            </a>
          </div>
        </div>

        {/* Category tabs */}
        <div className={`mb-12 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex flex-wrap justify-center gap-2">
            {menuData.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {categoryIcons[category.id]}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Menu items */}
          <div className="lg:col-span-2 space-y-3">
            {/* Category title */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                {categoryIcons[selectedCategory]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{currentCategory?.name}</h3>
                <p className="text-muted-foreground text-sm">{currentCategory?.items.length} rattar</p>
              </div>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Items */}
            <div className="grid gap-2">
              {currentCategory?.items.map((item, index) => (
                <div
                  key={item.id}
                  className="group bg-card/50 border border-border/50 rounded-xl p-4 hover:border-primary/20 hover:bg-card transition-all duration-300 cursor-pointer menu-card-hover"
                  onClick={() => openItemModal(item)}
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">{item.name}</h3>
                        {item.vegetarian && (
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          </span>
                        )}
                        {item.spicy && (
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-1">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">{item.priceEn} kr</div>
                        {item.priceFamilj && (
                          <div className="text-xs text-muted-foreground">Familj {item.priceFamilj} kr</div>
                        )}
                      </div>
                      <Button
                        size="icon"
                        onClick={(e) => { e.stopPropagation(); openItemModal(item) }}
                        className="w-9 h-9 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart */}
          <div className="space-y-4">
            <div className="sticky top-24 bg-card border border-border rounded-2xl overflow-hidden">
              {/* Cart header */}
              <div className="px-5 py-4 border-b border-border bg-card">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-sm">Din varukorg</h3>
                    <p className="text-xs text-muted-foreground">
                      {cart.length === 0 ? "Tom" : `${cart.reduce((sum, item) => sum + item.quantity, 0)} produkter`}
                    </p>
                  </div>
                  {cart.length > 0 && (
                    <span className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <ShoppingCart className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-sm">Varukorgen är tom</p>
                    <p className="text-muted-foreground text-xs mt-1">Välj något gott från menyn</p>
                  </div>
                ) : (
                  <>
                    <ScrollArea className="max-h-[280px]">
                      <div className="space-y-2">
                        {cart.map((item) => (
                          <div key={item.id} className="bg-muted/30 rounded-xl p-3">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-foreground text-sm truncate">{item.name}</p>
                                <p className="text-xs text-primary font-medium">{item.size}</p>
                              </div>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 bg-background rounded-lg p-0.5">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-6 w-6 rounded-md"
                                  onClick={() => updateQuantity(item.id, -1)}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="w-6 text-center font-bold text-xs">{item.quantity}</span>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-6 w-6 rounded-md"
                                  onClick={() => updateQuantity(item.id, 1)}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                              <span className="font-bold text-foreground text-sm">{item.price * item.quantity} kr</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="border-t border-border pt-4 mt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-muted-foreground text-sm">Totalt</span>
                        <span className="text-xl font-bold text-primary">{totalAmount} kr</span>
                      </div>
                      <a href="tel:0722562660" className="block">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-5 font-bold shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30">
                          <Phone className="w-4 h-4 mr-2" />
                          Ring for att beställa
                        </Button>
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Item Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => closeModal()}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div>
                <span className="text-2xl text-primary font-bold">{selectedItem?.name}</span>
              </div>
            </DialogTitle>
            <p className="text-muted-foreground text-sm">{selectedItem?.description}</p>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div>
              <h4 className="font-bold text-foreground mb-3 text-sm uppercase tracking-wider">inga</h4>
              <div className="grid grid-cols-2 gap-2">
                {includedToppings.map((topping, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-2 p-2.5 bg-muted/30 rounded-lg border border-border/50 cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox checked={true} className="data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                    <span className="text-sm text-foreground">{topping}</span>
                    <X className="w-3 h-3 text-muted-foreground ml-auto" />
                  </label>
                ))}
              </div>
            </div>

            {isPizzaCategory && (
              <div>
                <h4 className="font-bold text-foreground mb-3 text-sm uppercase tracking-wider">Storlek</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { key: "standard" as const, label: "Standard", extra: "" },
                    { key: "glutenfri" as const, label: "Glutenfri", extra: "+25 kr" },
                    { key: "barn" as const, label: "Barnpizza", extra: "-10 kr" },
                    { key: "dubbel" as const, label: "Dubbel botten", extra: "+10 kr" },
                  ].map(option => (
                    <button
                      key={option.key}
                      onClick={() => setSelectedSize(option.key)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                        selectedSize === option.key
                          ? "border-primary bg-primary/10"
                          : "border-border bg-muted/20 hover:bg-muted/40"
                      }`}
                    >
                      <span className="text-sm font-medium text-foreground block">{option.label}</span>
                      {option.extra && <span className="text-xs text-primary">{option.extra}</span>}
                    </button>
                  ))}
                  {selectedItem?.priceFamilj && (
                    <button
                      onClick={() => setSelectedSize("familj")}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                        selectedSize === "familj"
                          ? "border-primary bg-primary/10"
                          : "border-border bg-muted/20 hover:bg-muted/40"
                      }`}
                    >
                      <span className="text-sm font-medium text-foreground block">Familjepizza</span>
                      <span className="text-xs text-primary">+{(selectedItem.priceFamilj - selectedItem.priceEn)} kr</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
              <Button
                size="icon"
                className="h-10 w-10 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
                onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-10 text-center font-bold text-lg text-foreground">{modalQuantity}</span>
              <Button
                size="icon"
                className="h-10 w-10 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
                onClick={() => setModalQuantity(modalQuantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <Button
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg rounded-xl"
              onClick={addToCartFromModal}
            >
              Lägg till {calculatePrice()} kr
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
