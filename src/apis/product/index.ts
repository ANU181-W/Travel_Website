import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../config/prisma";

const prisma = prismaClient.prisma;

export const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { name, description, price } = req.body;
  const product = await prisma.product.create({
    data: {
      name: String(name),
      description: String(description),
      price: Number(price),
    },
  });
  res.status(200).json({ product, message: "Product created successfully" });
};
