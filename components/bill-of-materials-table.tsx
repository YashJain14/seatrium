import type { MaterialNode } from "@/types/assessment"
import { ExpandableRow } from "./expandable-row"
import { Button } from "@/components/ui/button"

interface BillOfMaterialsProps {
  materials: MaterialNode[]
  onToggleExpand: (path: string) => void
  onAddComponent: () => void
}

export const BillOfMaterials = ({ materials, onToggleExpand, onAddComponent }: BillOfMaterialsProps) => {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 text-left font-medium text-gray-500">Name</th>
              <th className="p-4 text-left font-medium text-gray-500">Amount</th>
              <th className="p-4 text-left font-medium text-gray-500">Unit</th>
              <th className="p-4 text-left font-medium text-gray-500">Material</th>
              <th className="p-4 text-left font-medium text-gray-500">Quality</th>
              <th className="p-4 text-left font-medium text-gray-500">Location</th>
              <th className="p-4 text-left font-medium text-gray-500">Transport</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <ExpandableRow key={material.id} material={material} onToggleExpand={onToggleExpand} />
            ))}
          </tbody>
        </table>
      </div>
      <Button onClick={onAddComponent}>Add Component</Button>
    </div>
  )
}

