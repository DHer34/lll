import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("menu_prices")
      .select("*")
      .order("category", { ascending: true })
      .order("name", { ascending: true })

    if (error) {
      console.error("Fetch menu prices error:", error)
      return NextResponse.json(
        { success: false, error: "Kunde inte hämta menypriser" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, prices: data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { success: false, error: "Serverfel" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, price_en, price_familj, category, vegetarian, spicy } = body

    if (!name || !category || price_en === undefined) {
      return NextResponse.json(
        { success: false, error: "Namn, kategori och pris krävs" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from("menu_prices")
      .insert({
        name,
        description: description || "",
        price_en,
        price_familj: price_familj || null,
        category,
        vegetarian: vegetarian || false,
        spicy: spicy || false,
      })
      .select()
      .single()

    if (error) {
      console.error("Insert menu price error:", error)
      return NextResponse.json(
        { success: false, error: "Kunde inte lägga till produkt" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, item: data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { success: false, error: "Serverfel" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, name, description, price_en, price_familj, category, vegetarian, spicy } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID krävs" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() }
    if (name !== undefined) updateData.name = name
    if (description !== undefined) updateData.description = description
    if (price_en !== undefined) updateData.price_en = price_en
    if (price_familj !== undefined) updateData.price_familj = price_familj
    if (category !== undefined) updateData.category = category
    if (vegetarian !== undefined) updateData.vegetarian = vegetarian
    if (spicy !== undefined) updateData.spicy = spicy

    const { error } = await supabase
      .from("menu_prices")
      .update(updateData)
      .eq("id", id)

    if (error) {
      console.error("Update menu price error:", error)
      return NextResponse.json(
        { success: false, error: "Kunde inte uppdatera produkt" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { success: false, error: "Serverfel" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID krävs" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { error } = await supabase
      .from("menu_prices")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Delete menu price error:", error)
      return NextResponse.json(
        { success: false, error: "Kunde inte ta bort produkt" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { success: false, error: "Serverfel" },
      { status: 500 }
    )
  }
}
