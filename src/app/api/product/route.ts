import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/config/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, price, description } = await req.json();

    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
