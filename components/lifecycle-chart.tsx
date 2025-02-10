"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LifecycleStage } from "@/types/assessment"

interface LifecycleChartProps {
  data: LifecycleStage[]
}

export function LifecycleChart({ data }: LifecycleChartProps) {
  if (!data || data.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Lifecycle Stage Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[1fr_1fr] gap-8">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={data} dataKey="percentage" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-4">
            {data.map((stage) => (
              <div key={stage.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }} />
                <div className="flex-1">
                  <div className="text-sm font-medium">{stage.name}</div>
                  <div className="text-sm text-gray-500">{stage.percentage.toFixed(1)}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

