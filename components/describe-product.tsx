import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { ProductDescription } from "@/types/assessment"

interface DescribeProductProps {
  initialData: ProductDescription
  onComplete: (data: ProductDescription) => void
}

export function DescribeProduct({ initialData, onComplete }: DescribeProductProps) {
  const [productData, setProductData] = useState<ProductDescription>(initialData)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(productData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="productName">Product Name</Label>
        <Input
          id="productName"
          value={productData.name}
          onChange={(e) => setProductData({ ...productData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="productType">Product Type</Label>
        <Input
          id="productType"
          value={productData.type}
          onChange={(e) => setProductData({ ...productData, type: e.target.value })}
          required
        />
      </div>
      <div>
        <Label>Propulsion System</Label>
        <RadioGroup
          value={productData.propulsionSystem}
          onValueChange={(value) => setProductData({ ...productData, propulsionSystem: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="diesel" id="diesel" />
            <Label htmlFor="diesel">Diesel Engine</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hybrid" id="hybrid" />
            <Label htmlFor="hybrid">Hybrid System</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="electric" id="electric" />
            <Label htmlFor="electric">Electric Motors</Label>
          </div>
        </RadioGroup>
      </div>
      <Button type="submit">Next: Bill of Materials</Button>
    </form>
  )
}

