interface ImpactMetricProps {
  title: string
  subtitle: string
  value: number
  unit: string
}

export function ImpactMetric({ title, subtitle, value, unit }: ImpactMetricProps) {
  const formatValue = (val: number) => {
    if (!val && val !== 0) return "N/A"
    if (val >= 1e4) {
      return `${(val / 1e5).toFixed(2)}E5`
    }
    return val.toLocaleString()
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <h3 className="text-sm font-medium text-gray-900">{title || "Untitled"}</h3>
        <p className="text-xs text-gray-500">{subtitle || ""}</p>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-blue-600">{formatValue(value)}</span>
        <span className="text-sm text-gray-600">{unit || ""}</span>
      </div>
    </div>
  )
}

