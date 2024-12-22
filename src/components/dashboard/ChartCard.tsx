'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'

interface ChartData {
  [key: string]: string | number
}

interface DataKeys {
  x: string
  y: string | string[]
  colors?: string[]
}

interface ChartCardProps {
  title: string
  type: 'area' | 'bar' | 'line'
  data: ChartData[]
  dataKeys: DataKeys
  formatYAxis?: (value: number) => string
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/95 border border-gray-800 p-4 rounded-lg shadow-xl backdrop-blur-sm">
        <p className="text-gray-400 mb-2 text-sm">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <span className="text-gray-400 text-sm">{entry.name}:</span>
            <span className="text-white font-medium text-sm">
              {typeof entry.value === 'number' 
                ? entry.value.toLocaleString()
                : entry.value
              }
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

function ChartCardContent({
  title,
  type,
  data,
  dataKeys,
  formatYAxis = (value) => value.toString()
}: ChartCardProps) {
  const chartColors = useMemo(() => {
    if (dataKeys.colors && Array.isArray(dataKeys.y)) {
      return dataKeys.colors
    }
    return ['#8B5CF6'] // Default purple color
  }, [dataKeys.colors, dataKeys.y])

  const yKeys = useMemo(() => {
    return Array.isArray(dataKeys.y) ? dataKeys.y : [dataKeys.y]
  }, [dataKeys.y])

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 5, left: -20, bottom: 0 }
    }

    const commonAxisProps = {
      stroke: '#374151', // Darker grid lines
      tick: { fill: '#6B7280', fontSize: 12 }, // Lighter text
      tickLine: { stroke: '#374151' }, // Darker tick lines
      axisLine: { stroke: '#374151' }, // Darker axis lines
      minTickGap: 15
    }

    switch (type) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              {yKeys.map((key, index) => (
                <linearGradient 
                  key={key} 
                  id={`gradient-${key}`} 
                  x1="0" 
                  y1="0" 
                  x2="0" 
                  y2="1"
                >
                  <stop 
                    offset="5%" 
                    stopColor={chartColors[index % chartColors.length]} 
                    stopOpacity={0.15}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={chartColors[index % chartColors.length]} 
                    stopOpacity={0.01}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#1F2937" 
              vertical={false}
              horizontalPoints={[0, 25, 50, 75, 100]} // Fewer grid lines
            />
            <XAxis 
              dataKey={dataKeys.x} 
              {...commonAxisProps} 
              dy={10}
              height={40}
              tickMargin={10}
            />
            <YAxis 
              {...commonAxisProps}
              tickFormatter={formatYAxis}
              dx={0}
              width={40}
              tickMargin={10}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ stroke: '#4B5563', strokeWidth: 1 }}
              wrapperStyle={{ outline: 'none' }}
            />
            {yKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={chartColors[index % chartColors.length]}
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#gradient-${key})`}
                dot={false}
                activeDot={{ 
                  r: 4, 
                  strokeWidth: 2, 
                  stroke: chartColors[index % chartColors.length],
                  fill: '#111827'
                }}
              />
            ))}
          </AreaChart>
        )

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#1F2937" 
              vertical={false}
              horizontalPoints={[0, 25, 50, 75, 100]} // Fewer grid lines
            />
            <XAxis 
              dataKey={dataKeys.x} 
              {...commonAxisProps} 
              dy={10}
              height={40}
              tickMargin={10}
            />
            <YAxis 
              {...commonAxisProps}
              tickFormatter={formatYAxis}
              dx={0}
              width={40}
              tickMargin={10}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: '#4B5563', opacity: 0.1 }}
              wrapperStyle={{ outline: 'none' }}
            />
            {yKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={chartColors[index % chartColors.length]}
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
                fillOpacity={0.9}
              />
            ))}
          </BarChart>
        )

      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#1F2937" 
              vertical={false}
              horizontalPoints={[0, 25, 50, 75, 100]} // Fewer grid lines
            />
            <XAxis 
              dataKey={dataKeys.x} 
              {...commonAxisProps} 
              dy={10}
              height={40}
              tickMargin={10}
            />
            <YAxis 
              {...commonAxisProps}
              tickFormatter={formatYAxis}
              dx={0}
              width={40}
              tickMargin={10}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ stroke: '#4B5563', strokeWidth: 1 }}
              wrapperStyle={{ outline: 'none' }}
            />
            {yKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={chartColors[index % chartColors.length]}
                strokeWidth={2}
                dot={false}
                activeDot={{ 
                  r: 4, 
                  strokeWidth: 2, 
                  stroke: chartColors[index % chartColors.length],
                  fill: '#111827'
                }}
              />
            ))}
          </LineChart>
        )
    }
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// Export a dynamic version of the component with SSR disabled
export default dynamic(() => Promise.resolve(ChartCardContent), {
  ssr: false
}) 