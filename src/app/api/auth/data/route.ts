// src/app/api/data/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // Fixed import path
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role, area } = session.user as any;

    let demandData;
    if (role === Role.ADMIN || role === Role.SUPERVISOR) {
      demandData = await prisma.electricDemand.findMany();
    } else if (role === Role.AREA_MANAGER && area) {
      demandData = await prisma.electricDemand.findMany({
        where: { areaName: area },
      });
    } else {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(demandData);
  } catch (error) {
    console.error("Data fetch error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "An error occurred while fetching data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role, area, id } = session.user as any;
    if (role !== Role.AREA_MANAGER || !area) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { timestamp, demand } = body;

    if (!timestamp || !demand) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const numericDemand = typeof demand === "number" ? demand : parseFloat(demand);
    if (isNaN(numericDemand)) {
      return NextResponse.json({ error: "Invalid demand value" }, { status: 400 });
    }

    const newDemandData = await prisma.electricDemand.create({
      data: {
        areaName: area,
        timestamp: new Date(timestamp),
        demand: numericDemand,
      },
    });

    return NextResponse.json(newDemandData);
  } catch (error) {
    console.error("Data creation error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "An error occurred while creating data" }, { status: 500 });
  }
}