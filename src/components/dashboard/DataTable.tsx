'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Column {
  key: string
  title: string
  render?: (value: any, row: any) => React.ReactNode
}

interface DataTableProps {
  title?: string
  columns: Column[]
  data: any[]
  onRowClick?: (row: any) => void
}

export default function DataTable({ title, columns, data, onRowClick }: DataTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 rounded-xl overflow-hidden"
    >
      {title && (
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {data.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: rowIndex * 0.1 }}
                className={`
                  ${onRowClick ? 'cursor-pointer hover:bg-gray-800/50' : 'hover:bg-gray-800/20'}
                  transition-colors
                `}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                    {column.render ? (
                      column.render(row[column.key], row)
                    ) : (
                      <div className="text-sm text-gray-400">{row[column.key]}</div>
                    )}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
} 