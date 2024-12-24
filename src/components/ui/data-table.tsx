import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  MoreHorizontal,
  Search
} from 'lucide-react'
import { Button } from './button'
import { Input } from './input'
import { EmptyState } from './empty-state'

interface Column<T> {
  header: string
  accessorKey: keyof T | string
  cell?: (item: T) => React.ReactNode
  sortable?: boolean
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  isLoading?: boolean
  emptyState?: {
    icon?: React.ElementType
    title: string
    description: string
    action?: {
      label: string
      onClick: () => void
    }
  }
  onRowClick?: (item: T) => void
  searchable?: boolean
  className?: string
}

export function DataTable<T>({
  data,
  columns,
  isLoading,
  emptyState,
  onRowClick,
  searchable = true,
  className
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof T | string
    direction: 'asc' | 'desc'
  } | null>(null)
  
  const [searchQuery, setSearchQuery] = React.useState('')
  
  // Handle sorting
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data
    
    return [...data].sort((a: any, b: any) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [data, sortConfig])
  
  // Handle search
  const filteredData = React.useMemo(() => {
    if (!searchQuery) return sortedData
    
    return sortedData.filter((item: any) => {
      return Object.values(item).some(value => 
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    })
  }, [sortedData, searchQuery])
  
  // Handle sort click
  const handleSort = (key: keyof T | string) => {
    setSortConfig(current => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' }
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' }
      }
      return null
    })
  }
  
  // Get sort icon
  const getSortIcon = (key: keyof T | string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ChevronsUpDown className="h-4 w-4 text-zinc-400" />
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="h-4 w-4 text-zinc-400" />
      : <ChevronDown className="h-4 w-4 text-zinc-400" />
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500" />
          <p className="text-sm text-zinc-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!data.length && emptyState) {
    return (
      <EmptyState
        icon={emptyState.icon}
        title={emptyState.title}
        description={emptyState.description}
        action={emptyState.action}
      />
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      {searchable && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      )}
      
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={cn(
                    "px-4 py-3 text-left font-medium text-zinc-400",
                    column.className
                  )}
                >
                  {column.sortable ? (
                    <button
                      className="flex items-center gap-1 hover:text-white"
                      onClick={() => handleSort(column.accessorKey)}
                    >
                      {column.header}
                      {getSortIcon(column.accessorKey)}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredData.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className={cn(
                    "border-b border-zinc-800",
                    onRowClick && "cursor-pointer hover:bg-zinc-800/50"
                  )}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={cn("px-4 py-3", column.className)}
                    >
                      {column.cell 
                        ? column.cell(item)
                        : String((item as any)[column.accessorKey])
                      }
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  )
} 