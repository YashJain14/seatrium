import { ImpactMetric } from "@/components/impact-metric"
import { LifecycleChart } from "@/components/lifecycle-chart"
import { ModelDetailsCard } from "@/components/model-details"
import { Button } from "@/components/ui/button"
import type { AssessmentData } from "@/types/assessment"

interface EcoScanAssessmentProps {
  data: AssessmentData
  onComplete: () => void
}

export function EcoScanAssessment({ data, onComplete }: EcoScanAssessmentProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-[2fr_1fr] gap-8">
        <div className="space-y-8">
          {/* Impact Metrics */}
          <div className="grid grid-cols-3 gap-8">
            {data.impactMetrics.map((metric) => (
              <ImpactMetric key={metric.title} {...metric} />
            ))}
          </div>

          {/* Lifecycle Chart */}
          <LifecycleChart data={data.lifecycleStages} />
        </div>

        {/* Model Details */}
        <ModelDetailsCard details={data.modelDetails} />
      </div>
      <Button onClick={onComplete}>Complete Assessment</Button>
    </div>
  )
}

