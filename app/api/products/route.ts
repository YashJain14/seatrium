// pages/api/products.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'; // Make sure you export your prisma client from here
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get Clerk authentication info from the request
  const { userId, orgId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    // Return products created by this user.
    const products = await prisma.product.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return res.json(products);
  } else if (req.method === 'POST') {
    const { productName, columns } = req.body;
    if (!productName || !columns || !Array.isArray(columns)) {
      return res.status(400).json({ error: 'Invalid request payload' });
    }
    try {
      const product = await prisma.product.create({
        data: {
          userId,
          organizationId: orgId || '',
          productName,
          columns,
        },
      });
      return res.status(201).json(product);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error creating product' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
