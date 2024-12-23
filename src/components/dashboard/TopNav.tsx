'use client'

import { Bell, Menu, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface TopNavProps {
  onOpenSidebar: () => void
}

export function TopNav({ onOpenSidebar }: TopNavProps) {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-800 bg-gray-900 px-4 shadow-lg sm:gap-x-6 sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden text-gray-400 hover:bg-gray-800 hover:text-white"
        onClick={onOpenSidebar}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Open sidebar</span>
      </Button>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-500" aria-hidden="true" />
            </div>
            <input
              id="search-field"
              className="block h-9 w-full rounded-md border-0 bg-gray-800 py-1.5 pl-10 pr-3 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              placeholder="Search..."
              type="search"
              name="search"
            />
          </div>
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-gray-800 hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="sr-only">View notifications</span>
          </Button>
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-800" aria-hidden="true" />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full bg-gray-800 text-gray-400 hover:text-white">
                <User className="h-5 w-5" />
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-900 text-gray-400" align="end">
              <DropdownMenuLabel className="text-gray-400">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem className="hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
                Billing
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem className="hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
} 