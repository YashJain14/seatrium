"use client"

import { useState } from "react"
import { Share, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DescribeProductChatbot } from "@/components/describe-product-chatbot"
import { BillOfMaterials } from "@/components/bill-of-materials"
import { EcoScanAssessment } from "@/components/ecoscan-assessment"
import type { AssessmentData, ProductDescription } from "@/types/assessment"

const initialData: AssessmentData = {
  productDescription: {
    name: "",
    type: "",
    propulsionSystem: "",
    weight: 0,
    length: 0,
    capacity: 0,
  },
  materials: [
    {
      id: "1",
      path: "1",
      level: 0,
      label: "Ship",
      amount: 1,
      unit: "Unit",
      location: "South Korea",
      expanded: true,
      transport: { distance: 0, unit: "km", type: "ship" },
      children: [
        {
          id: "1.1",
          path: "1.1",
          level: 1,
          label: "Hull",
          amount: 1,
          unit: "Unit",
          location: "South Korea",
          expanded: true,
          transport: { distance: 300, unit: "km", type: "truck" },
          children: [
            {
              id: "1.1.1",
              path: "1.1.1",
              level: 2,
              label: "Hull Frame",
              amount: 50000,
              unit: "kg",
              material: "High-strength carbon steel",
              quality: "Fair",
              location: "China",
              transport: { distance: 800, unit: "km", type: "ship" },
            },
            {
              id: "1.1.2",
              path: "1.1.2",
              level: 2,
              label: "Hull Plating",
              amount: 30000,
              unit: "kg",
              material: "AH36 marine-grade steel",
              quality: "Fair",
              location: "South Korea",
              transport: { distance: 300, unit: "km", type: "truck" },
            },
          ],
        },
      ],
    },
  ],
  impactMetrics: [
    {
      title: "Climate Change",
      subtitle: "Global Warming Potential",
      value: 206000,
      unit: "kg CO2-eq",
    },
    {
      title: "Water Use",
      subtitle: "Water Consumption Potential",
      value: 2620,
      unit: "m3",
    },
    {
      title: "Land Use",
      subtitle: "Agricultural Land Occupation",
      value: 4760,
      unit: "m2*a crop-eq",
    },
  ],
  lifecycleStages: [
    { name: "Distribution Storage", percentage: 4.84, color: "#60A5FA" },
    { name: "Acquisition Preprocessing", percentage: 95.2, color: "#4F46E5" },
  ],
  modelDetails: {
    name: "Ship EcoScan LCA",
    author: "CarbonGraph EcoScan",
    backgroundDatasets: "Ecoinvent 3.9.1 Allocation Cut-off by Classification",
    versionDate: "February 10, 2025",
    versionDescription: "EcoScan Version — This is the first version of your model, as created by EcoScan.",
    functionalUnit: "1 Unit of Ship",
    practitionerNotes:
      "A ship is a large marine vessel designed for transportation or specialized operations on water. This specific ship features an LNG-electric hybrid propulsion system, combining a liquefied natural gas (LNG) engine and an electric motor for efficient energy use. The hull is constructed from high-strength carbon steel and AH36 marine-grade steel, with welding rods used for assembly. The propulsion system includes components such as an LNG engine block...",
    location: "Global",
  },
}

const steps = [
  { id: 1, name: "Describe Product" },
  { id: 2, name: "Bill of Materials" },
  { id: 3, name: "EcoScan Assessment" },
] as const

export default function Assessment() {
  const [currentStep, setCurrentStep] = useState(1)
  const [assessmentData, setAssessmentData] = useState<AssessmentData>(initialData)

  const handleProductDescription = (productDescription: ProductDescription) => {
    setAssessmentData((prev) => ({ ...prev, productDescription }))
    setCurrentStep(2)
  }

  const handleBillOfMaterials = (materials: AssessmentData["materials"]) => {
    setAssessmentData((prev) => ({ ...prev, materials }))
    setCurrentStep(3)
  }

  const handleAssessmentComplete = () => {
    console.log("Assessment completed:", assessmentData)
    // Here you would typically send the data to a server or perform further actions
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Ship EcoScan LCA</h1>
          <span className="px-2 py-1 text-sm bg-gray-100 rounded">Version 1</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Active Version
          </Button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-12">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center ${index !== 0 ? "ml-4" : ""}`}>
              <Button variant={step.id === currentStep ? "default" : "outline"} className="rounded-full px-6">
                {step.name}
              </Button>
            </div>
            {index < steps.length - 1 && <div className="h-px w-full bg-gray-300 mx-4" />}
          </div>
        ))}
      </div>

      {/* Content */}
      {currentStep === 1 && (
        <DescribeProductChatbot initialData={assessmentData.productDescription} onComplete={handleProductDescription} />
      )}
      {currentStep === 2 && (
        <BillOfMaterials initialData={assessmentData.materials} onComplete={handleBillOfMaterials} />
      )}
      {currentStep === 3 && <EcoScanAssessment data={assessmentData} onComplete={handleAssessmentComplete} />}
    </div>
  )
}

