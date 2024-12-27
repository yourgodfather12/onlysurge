'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Settings,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Users,
  Bot,
  Palette,
  Lock,
  Mail,
  Smartphone,
  Zap,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  HelpCircle
} from 'lucide-react'
import { useDashboard } from '@/app/(dashboard)/layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/components/ui/toast'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { typography } from '@/styles/typography'
import { useTour } from '@/contexts/tour-context'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface SettingSection {
  id: string
  title: string
  description: string
  icon: any
  status?: 'active' | 'inactive' | 'warning'
  badge?: string
  href: string
}

const settingSections: SettingSection[] = [
  {
    id: 'account',
    title: 'Account Settings',
    description: 'Manage your account details and preferences',
    icon: Settings,
    status: 'active',
    href: '/settings/account'
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Configure how you want to be notified',
    icon: Bell,
    status: 'active',
    badge: '3 New',
    href: '/settings/notifications'
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Protect your account and data',
    icon: Shield,
    status: 'warning',
    badge: 'Review',
    href: '/settings/security'
  },
  {
    id: 'billing',
    title: 'Billing & Subscription',
    description: 'Manage your subscription and payment methods',
    icon: CreditCard,
    status: 'active',
    href: '/settings/billing'
  },
  {
    id: 'platforms',
    title: 'Platform Integration',
    description: 'Connect and manage your content platforms',
    icon: Globe,
    status: 'active',
    href: '/settings/platforms'
  },
  {
    id: 'team',
    title: 'Team Management',
    description: 'Invite and manage team members',
    icon: Users,
    status: 'inactive',
    badge: 'Pro',
    href: '/settings/team'
  },
  {
    id: 'ai',
    title: 'AI Preferences',
    description: 'Customize AI behavior and automation',
    icon: Bot,
    status: 'active',
    href: '/settings/ai'
  },
  {
    id: 'appearance',
    title: 'Appearance',
    description: 'Customize the look and feel',
    icon: Palette,
    status: 'active',
    href: '/settings/appearance'
  }
]

const quickSettings = [
  {
    id: '2fa',
    title: 'Two-Factor Authentication',
    description: 'Add an extra layer of security',
    icon: Lock,
    enabled: false
  },
  {
    id: 'emails',
    title: 'Email Notifications',
    description: 'Get updates about your content',
    icon: Mail,
    enabled: true
  },
  {
    id: 'mobile',
    title: 'Mobile Notifications',
    description: 'Push notifications on your device',
    icon: Smartphone,
    enabled: true
  },
  {
    id: 'automation',
    title: 'AI Automation',
    description: 'Let AI handle routine tasks',
    icon: Zap,
    enabled: true
  }
]

export default function SettingsPage() {
  const { setPageProps } = useDashboard()
  const { startTour } = useTour()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setPageProps({
      title: "Settings",
      description: "Manage your account settings and preferences",
      showPlatformFilter: false,
      actions: (
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full hover:bg-white/5"
                  onClick={() => startTour('settings')}
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Take a tour of settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button
            size="sm"
            className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white shadow-lg"
            onClick={() => toast.success('Settings saved successfully!')}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      )
    })
  }, [setPageProps, startTour])

  const handleQuickSettingToggle = (settingId: string, enabled: boolean) => {
    toast.success(`${enabled ? 'Enabled' : 'Disabled'} ${settingId} setting`)
  }

  return (
    <div className="space-y-8 px-4 py-8 md:px-8">
      {/* Security Alert */}
      <Card className="p-4 bg-yellow-500/10 border-yellow-500/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-yellow-500/10">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="flex-1">
            <p className={cn(typography.body2, "text-yellow-200")}>
              We recommend enabling two-factor authentication for enhanced security.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500"
          >
            Review
          </Button>
        </div>
      </Card>

      {/* Quick Settings */}
      <div className="space-y-4" data-tour="quick-settings">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className={cn(typography.h3, "text-white")}>Quick Settings</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full hover:bg-white/5"
                  >
                    <HelpCircle className="h-4 w-4 text-zinc-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Quickly toggle common settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full bg-gradient-to-r from-pink-500/10 to-violet-500/10 hover:from-pink-500/20 hover:to-violet-500/20 text-white"
          >
            Advanced Settings
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {quickSettings.map(setting => (
            <Card
              key={setting.id}
              className="p-4 bg-zinc-900/50 border-zinc-800/50 hover:bg-zinc-900/70 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-pink-500/10 ring-1 ring-inset ring-pink-500/20">
                  <setting.icon className="h-5 w-5 text-pink-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={cn(typography.subtitle1, "text-white")}>{setting.title}</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <HelpCircle className="h-3.5 w-3.5 text-zinc-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{setting.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className={cn(typography.caption, "text-zinc-400")}>{setting.description}</p>
                </div>
                <Switch
                  checked={setting.enabled}
                  onCheckedChange={(checked) => handleQuickSettingToggle(setting.id, checked)}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* All Settings */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className={cn(typography.h3, "text-white")}>All Settings</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full hover:bg-white/5"
                >
                  <HelpCircle className="h-4 w-4 text-zinc-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Configure all aspects of your account</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {settingSections.map(section => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              data-tour={section.id === 'security' ? 'security' : undefined}
            >
              <Card
                className={cn(
                  "relative overflow-hidden p-6 bg-zinc-900/50 border-zinc-800/50 hover:bg-zinc-900/70 transition-all duration-300 group cursor-pointer",
                  section.status === 'warning' && "border-yellow-500/20",
                  section.status === 'inactive' && "opacity-75"
                )}
                onClick={() => toast.info(`Opening ${section.title.toLowerCase()}...`)}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "p-3 rounded-xl ring-1 ring-inset transition-colors",
                    section.status === 'active' && "bg-pink-500/10 ring-pink-500/20 group-hover:bg-pink-500/20",
                    section.status === 'warning' && "bg-yellow-500/10 ring-yellow-500/20 group-hover:bg-yellow-500/20",
                    section.status === 'inactive' && "bg-zinc-500/10 ring-zinc-500/20 group-hover:bg-zinc-500/20"
                  )}>
                    <section.icon className={cn(
                      "h-5 w-5",
                      section.status === 'active' && "text-pink-500",
                      section.status === 'warning' && "text-yellow-500",
                      section.status === 'inactive' && "text-zinc-500"
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className={cn(typography.h4, "text-white")}>{section.title}</h3>
                        {section.badge && (
                          <Badge className={cn(
                            "text-xs",
                            section.status === 'warning' && "bg-yellow-500/10 text-yellow-500",
                            section.status === 'active' && "bg-emerald-500/10 text-emerald-500",
                            section.status === 'inactive' && "bg-zinc-500/10 text-zinc-500"
                          )}>
                            {section.badge}
                          </Badge>
                        )}
                      </div>
                      <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                    </div>
                    <p className={cn(typography.body2, "text-zinc-400 mt-1")}>{section.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 