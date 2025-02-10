import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { MaterialNode } from "@/types/assessment"
import { BillOfMaterials as BOMTable } from "./bill-of-materials-table"

interface BillOfMaterialsProps {
  initialData: MaterialNode[]
  onComplete: (data: MaterialNode[]) => void
}

export function BillOfMaterials({ initialData, onComplete }: BillOfMaterialsProps) {
  const [materials, setMaterials] = useState<MaterialNode[]>(initialData)

  const handleToggleExpand = (path: string) => {
    setMaterials((prev) => {
      const updateExpanded = (nodes: MaterialNode[]): MaterialNode[] => {
        return nodes.map((node) => {
          if (node.path === path) {
            return { ...node, expanded: !node.expanded }
          }
          if (node.children) {
            return { ...node, children: updateExpanded(node.children) }
          }
          return node
        })
      }
      return updateExpanded(prev)
    })
  }

  const handleAddComponent = () => {
    // Implement add component logic
    console.log("Add component clicked")
  }

  return (
    <div className="space-y-6">
      <BOMTable materials={materials} onToggleExpand={handleToggleExpand} onAddComponent={handleAddComponent} />
      <Button onClick={() => onComplete(materials)}>Next: EcoScan Assessment</Button>
    </div>
  )
}

