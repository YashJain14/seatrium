import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ModelDetails } from "@/types/assessment"

interface ModelDetailsProps {
  details: ModelDetails
}

export function ModelDetailsCard({ details }: ModelDetailsProps) {
  if (!details) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Model Name</h3>
            <p className="text-sm text-gray-500">{details.name || "N/A"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">Model Author</h3>
            <p className="text-sm text-gray-500">{details.author || "N/A"}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900">Background Datasets</h3>
          <p className="text-sm text-gray-500">{details.backgroundDatasets || "N/A"}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Version Date</h3>
            <p className="text-sm text-gray-500">{details.versionDate || "N/A"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">Functional Unit</h3>
            <p className="text-sm text-gray-500">{details.functionalUnit || "N/A"}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900">Version Description</h3>
          <p className="text-sm text-gray-500">{details.versionDescription || "N/A"}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900">Practitioner Notes</h3>
          <p className="text-sm text-gray-500">{details.practitionerNotes || "N/A"}</p>
        </div>
      </CardContent>
    </Card>
  )
}

