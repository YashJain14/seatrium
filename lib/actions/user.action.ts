import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ProductData {
  userId: string;
  productName: string;
  columns: string[];
}

interface SpreadsheetData {
  productId: string;
  userId: string;
  rows: Record<string, string>[];
}
  
export async function createProduct({ userId, productName, columns }: ProductData) {
  try {
    const product = await prisma.product.create({
      data: {
        userId,
        productName,
        columns,
      },
    });

    return product;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
}


export async function getUserProducts(userId: string) {
  try {
      const products = await prisma.product.findMany({
          where: { userId },
      });
      return products;
  } catch (error) {
      console.error('Error fetching user products:', error);
      throw new Error('Failed to fetch user products');
  }
}


export async function saveSpreadsheetData({ productId, userId, rows }: SpreadsheetData) {
  try {
    const result = await prisma.spreadsheetData.create({
      data: {
        productId,
        userId,
        data: rows
      },
    });

    return result;
  } catch (error) {
    console.error('Error saving spreadsheet data:', error);
    throw new Error('Failed to save spreadsheet data');
  }
}

// lib/actions/user.actions.ts
export async function getSpreadsheetsByUser(userId: string) {
  try {
    const spreadsheets = await prisma.spreadsheetData.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' }
    });
    return spreadsheets;
  } catch (error) {
    console.error('Error fetching spreadsheets:', error);
    throw new Error('Failed to fetch spreadsheets');
  }
}

export async function getSpreadsheetBySpreadsheetId(spreadsheetId: string) {
  try {
    const spreadsheet = await prisma.spreadsheetData.findUnique({
      where: { spreadsheetId },
    });
    
    if (!spreadsheet) {
      throw new Error('Spreadsheet not found');
    }
    
    return spreadsheet;
  } catch (error) {
    console.error('Error fetching spreadsheet:', error);
    throw new Error('Failed to fetch spreadsheet');
  }
}

export async function updateSpreadsheetData(
  spreadsheetId: string,
  data: Record<string, string>[],
  userId: string
) {
  try {
    // First verify the user has access to this spreadsheet
    const spreadsheet = await prisma.spreadsheetData.findFirst({
      where: {
        spreadsheetId: spreadsheetId,
        userId: userId,
      },
    });

    if (!spreadsheet) {
      throw new Error('Spreadsheet not found or access denied');
    }

    // Update the spreadsheet data
    const updatedSpreadsheet = await prisma.spreadsheetData.update({
      where: {
        spreadsheetId: spreadsheetId,
      },
      data: {
        data: data,
        updatedAt: new Date(),
      },
    });

    return updatedSpreadsheet;
  } catch (error) {
    console.error('Error updating spreadsheet data:', error);
    throw new Error('Failed to update spreadsheet data');
  }
}
