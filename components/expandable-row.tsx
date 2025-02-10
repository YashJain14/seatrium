import type React from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import type { MaterialNode } from "@/types/assessment"

interface ExpandableRowProps {
  material: MaterialNode
  onToggleExpand: (path: string) => void
}

export const ExpandableRow: React.FC<ExpandableRowProps> = ({ material, onToggleExpand }) => {
  const hasChildren = material.children && material.children.length > 0

  return (
    <>
      <tr className="border-b">
        <td className="p-4">
          <div className="flex items-center">
            {hasChildren && (
              <button onClick={() => onToggleExpand(material.path)} className="mr-2">
                {material.expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            )}
            <span style={{ marginLeft: `${material.level * 20}px` }}>{material.label}</span>
          </div>
        </td>
        <td className="p-4">{material.amount}</td>
        <td className="p-4">{material.unit}</td>
        <td className="p-4">{material.material || "-"}</td>
        <td className="p-4">{material.quality || "-"}</td>
        <td className="p-4">{material.location}</td>
        <td className="p-4">
          {material.transport
            ? `${material.transport.distance} ${material.transport.unit} (${material.transport.type})`
            : "-"}
        </td>
      </tr>
      {material.expanded &&
        material.children &&
        material.children.map((child) => (
          <ExpandableRow key={child.id} material={child} onToggleExpand={onToggleExpand} />
        ))}
    </>
  )
}

