'use client'

import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const defaultOptions: ChartOptions<'bar' | 'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgb(17 24 39 / 0.9)',
      titleColor: 'rgb(243 244 246)',
      bodyColor: 'rgb(156 163 175)',
      borderColor: 'rgb(31 41 55)',
      borderWidth: 1,
      padding: 12,
      boxPadding: 6,
      usePointStyle: true,
      callbacks: {
        labelColor: (context) => ({
          borderColor: 'transparent',
          backgroundColor: context.dataset.borderColor as string,
        }),
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        color: 'rgb(156 163 175)',
      },
    },
    y: {
      border: {
        display: false,
        dash: [4, 4],
      },
      grid: {
        color: 'rgb(31 41 55)',
      },
      ticks: {
        color: 'rgb(156 163 175)',
      },
    },
  },
}

interface ChartProps {
  data: any[]
  categories: string[]
  index: string
  colors?: string[]
  valueFormatter?: (value: number) => string
  className?: string
}

export function BarChart({
  data,
  categories,
  index,
  colors = ['#4F46E5'],
  valueFormatter = (value: number) => value.toString(),
  className,
}: ChartProps) {
  const chartData = {
    labels: data.map((item) => item[index]),
    datasets: categories.map((category, i) => ({
      data: data.map((item) => item[category]),
      backgroundColor: colors[i % colors.length],
      borderColor: colors[i % colors.length],
      borderWidth: 0,
      borderRadius: 4,
      barThickness: 24,
    })),
  }

  const options = {
    ...defaultOptions,
    plugins: {
      ...defaultOptions.plugins,
      tooltip: {
        ...defaultOptions.plugins?.tooltip,
        callbacks: {
          ...defaultOptions.plugins?.tooltip?.callbacks,
          label: (context: any) => {
            const value = context.parsed.y
            return valueFormatter ? valueFormatter(value) : value
          },
        },
      },
    },
  }

  return (
    <div className={className}>
      <Bar data={chartData} options={options} />
    </div>
  )
}

export function LineChart({
  data,
  categories,
  index,
  colors = ['#4F46E5'],
  valueFormatter = (value: number) => value.toString(),
  className,
}: ChartProps) {
  const chartData = {
    labels: data.map((item) => item[index]),
    datasets: categories.map((category, i) => ({
      data: data.map((item) => item[category]),
      borderColor: colors[i % colors.length],
      backgroundColor: colors[i % colors.length],
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 2,
      pointHoverBackgroundColor: 'rgb(17 24 39)',
    })),
  }

  const options = {
    ...defaultOptions,
    plugins: {
      ...defaultOptions.plugins,
      tooltip: {
        ...defaultOptions.plugins?.tooltip,
        callbacks: {
          ...defaultOptions.plugins?.tooltip?.callbacks,
          label: (context: any) => {
            const value = context.parsed.y
            return valueFormatter ? valueFormatter(value) : value
          },
        },
      },
    },
  }

  return (
    <div className={className}>
      <Line data={chartData} options={options} />
    </div>
  )
} 