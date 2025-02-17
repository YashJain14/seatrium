'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Product {
  ProductId: string;
  productName: string;
  columns: string[];
  createdAt: string;
  updatedAt: string;
}

interface SpreadsheetData {
  id: string;
  spreadsheetId: string;
  productId: string;
  data: Record<string, string>[];
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [spreadsheetData, setSpreadsheetData] = useState<SpreadsheetData[]>([]);
  const { userId } = useAuth();
  const [productName, setProductName] = useState("");
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!userId) return;
    
    async function fetchData() {
      // Fetch Products
      const productsRes = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      // Fetch Spreadsheet Data
      const spreadsheetsRes = await fetch("/api/spreadsheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData);
      }

      if (spreadsheetsRes.ok) {
        const spreadsheetsData = await spreadsheetsRes.json();
        setSpreadsheetData(spreadsheetsData);
      }
    }

    fetchData();
  }, [userId]);

  const handleCreateProduct = () => {
    if (!productName.trim()) return;
    const encodedName = encodeURIComponent(productName);
    router.push(`/dashboard/${encodedName}/chatbot`);
  };


  const handleUseProduct = (product: Product) => {
    router.push(`/dashboard/spreadsheet?data=${encodeURIComponent(JSON.stringify({
      productId: product.ProductId,
      userId,
      productName: product.productName,
      columns: product.columns,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }))}`);
  };

  const handleUpdateSpreadsheet = (spreadsheetId: string) => {
    router.push(`/dashboard/spreadsheet/${spreadsheetId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full">
                Create New Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enter Product Name</DialogTitle>
              </DialogHeader>
              <Input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Product Name"
                className="mb-4"
              />
              <Button onClick={handleCreateProduct} className="bg-blue-500 hover:bg-blue-600 text-white">
                Create
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="spreadsheets">Data</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="bg-white p-6 rounded-lg shadow">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Columns</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.ProductId}>
                      <TableCell className="font-medium">{product.productName}</TableCell>
                      <TableCell className="max-w-md truncate">
                        {product.columns.join(', ')}
                      </TableCell>
                      <TableCell>
                        {new Date(product.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="default"
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            onClick={() => handleUseProduct(product)}
                          >
                            Use
                          </Button>

                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="spreadsheets">
            <div className="bg-white p-6 rounded-lg shadow">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Rows</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {spreadsheetData.map((sheet) => (
                    <TableRow key={sheet.spreadsheetId}>
                      <TableCell className="font-medium">{sheet.productId}</TableCell>
                      <TableCell>{sheet.data.length} rows</TableCell>
                      <TableCell>
                        {new Date(sheet.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                      <Button 
                            variant="default"
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            onClick={() => handleUpdateSpreadsheet(sheet.spreadsheetId)}
                          >
                            Update
                          </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;