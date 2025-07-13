import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"

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

    const subscription = await prisma.subscription.create({
      data: {
        userId,
        plan,
        status: "active",
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      },
    })

    return NextResponse.json(subscription)
  } catch (error) {
    console.error("[SUBSCRIPTION_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET() {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const subscription = await prisma.subscription.findUnique({
      where: {
        userId,
      },
    })

    return NextResponse.json(subscription)
  } catch (error) {
    console.error("[SUBSCRIPTION_GET_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}