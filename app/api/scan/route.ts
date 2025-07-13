import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"

export async function POST() {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Simulate AI scan
    const scanResult = {
      vulnerabilities: [
        { type: "SQL Injection", severity: "High" },
        { type: "Cross-Site Scripting", severity: "Medium" },
      ],
      outdatedSoftware: [
        { name: "Apache", currentVersion: "2.4.38", latestVersion: "2.4.46" },
      ],
      recommendations: [
        "Update firewall rules",
        "Enable two-factor authentication",
        "Encrypt sensitive data at rest",
      ],
    }

    const scan = await prisma.scan.create({
      data: {
        userId,
        result: scanResult,
      },
    })

    return NextResponse.json(scan)
  } catch (error) {
    console.error("[SCAN_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}