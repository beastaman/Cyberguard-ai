import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { auth } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { plan } = body

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!plan) {
      return new NextResponse("Plan is required", { status: 400 })
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true`,
      mode: "subscription",
      billing_address_collection: "auto",
      line_items: [
        {
          price: plan === "pro" ? "price_pro" : "price_enterprise",
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    })

    return NextResponse.json({ sessionId: stripeSession.id })
  } catch (error) {
    console.error("[STRIPE_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}