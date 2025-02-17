// pages/api/products.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getUserProducts } from "@/lib/actions/user.action";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {


  try {
    const body = await req.json();
    console.log('Received User:', body);
    const { userId } = body;



    console.log(userId);
    if (!userId) {
      return NextResponse.json({ error: 'User Not Found' }, { status: 400 });
    }

    // Query the database for products that match the provided userId
    const products = await getUserProducts(userId);


    return NextResponse.json(products, { status: 201 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
