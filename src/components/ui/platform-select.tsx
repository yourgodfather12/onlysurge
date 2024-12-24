'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { usePlatformStore } from '@/store/platform-store'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export function PlatformSelect() {
  const [open, setOpen] = React.useState(false)
  const { currentPlatform, setCurrentPlatform, platforms } = usePlatformStore()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {currentPlatform === 'all'
            ? 'All Platforms'
            : currentPlatform?.name || 'Select platform...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search platform..." />
          <CommandEmpty>No platform found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                setCurrentPlatform('all')
                setOpen(false)
              }}
            >
              <Check
                className={cn(
                  'mr-2 h-4 w-4',
                  currentPlatform === 'all' ? 'opacity-100' : 'opacity-0'
                )}
              />
              All Platforms
            </CommandItem>
            {platforms.map((platform) => (
              <CommandItem
                key={platform.id}
                onSelect={() => {
                  setCurrentPlatform(platform)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    currentPlatform?.id === platform.id
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
                {platform.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 