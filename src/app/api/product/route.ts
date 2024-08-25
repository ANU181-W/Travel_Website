import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/upload";
import { prisma } from "@/config/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const image = formData.get("image") as File;
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;

    if (!image || !name || isNaN(price) || !category) {
      return NextResponse.json(
        { error: "Missing or invalid required form fields" },
        { status: 400 }
      );
    }

    const uploadedImage = await uploadImage(image, "products");

    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        description,
        category: category,
        imageUrl: uploadedImage.secure_url,
      },
    });

    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Error uploading image or saving product:", error);
    return NextResponse.json(
      { error: "Failed to upload image or save product" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  // try {
  const productData = (await prisma.product.findMany()).sort();
  return NextResponse.json({ data: productData }, { status: 200 });
  // } catch (err) {
  //   console.error("something went wrong");
  //   return NextResponse.json({ err: "data fetching error" }, { status: 500 });
  // }
}
