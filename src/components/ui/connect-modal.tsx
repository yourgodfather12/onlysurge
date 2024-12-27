'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { typography } from '@/styles/typography'
import { 
  ArrowRight, 
  Check, 
  ChevronRight, 
  ExternalLink, 
  Lock, 
  Shield, 
  Star 
} from 'lucide-react'

interface Platform {
  id: string
  name: string
  icon: string | React.ComponentType
  connected: boolean
  url?: string
  username?: string
  stats?: any
  features?: string[]
}

interface ConnectModalProps {
  open: boolean
  onClose: () => void
  type: 'platform' | 'social'
  platforms: Platform[]
  onConnect: (platform: Platform) => void
}

export function ConnectModal({ open, onClose, type, platforms, onConnect }: ConnectModalProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null)
  const [step, setStep] = useState<'select' | 'connect'>('select')

  const handlePlatformSelect = (platform: Platform) => {
    setSelectedPlatform(platform)
    setStep('connect')
  }

  const handleConnect = () => {
    if (selectedPlatform) {
      onConnect(selectedPlatform)
      setStep('select')
      setSelectedPlatform(null)
      onClose()
    }
  }

  const handleBack = () => {
    setStep('select')
    setSelectedPlatform(null)
  }

  const renderPlatformSelect = () => (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className={cn(typography.h3, "text-white")}>
          {type === 'platform' ? 'Choose Platform' : 'Choose Social Network'}
        </h2>
        <p className={cn(typography.body2, "text-zinc-400")}>
          {type === 'platform' 
            ? 'Select a content platform to connect and manage'
            : 'Select a social network to expand your reach'
          }
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {platforms.map((platform) => (
          <Card
            key={platform.id}
            className={cn(
              "group relative overflow-hidden p-4 bg-zinc-900/50 border-zinc-800/50 hover:bg-zinc-900/60 transition-all duration-200 cursor-pointer",
              platform.connected && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => !platform.connected && handlePlatformSelect(platform)}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5">
                  {typeof platform.icon === 'string' ? (
                    <img src={platform.icon} alt={platform.name} className="w-6 h-6" />
                  ) : (
                    <platform.icon className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h3 className={cn(typography.h4, "text-white")}>{platform.name}</h3>
                  <p className={cn(typography.caption, "text-zinc-400")}>
                    {platform.connected ? 'Already Connected' : 'Click to Connect'}
                  </p>
                </div>
              </div>
              {!platform.connected && (
                <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-2 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
        <Shield className="h-5 w-5 text-emerald-500" />
        <p className={cn(typography.caption, "text-zinc-400")}>
          Your data is secure and private. We never share your information without permission.
        </p>
      </div>
    </div>
  )

  const renderConnectForm = () => {
    if (!selectedPlatform) return null

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full hover:bg-white/5"
            onClick={handleBack}
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
          </Button>
          <div>
            <h2 className={cn(typography.h3, "text-white")}>Connect {selectedPlatform.name}</h2>
            <p className={cn(typography.body2, "text-zinc-400")}>
              Enter your credentials to connect your account
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className={cn(typography.caption, "text-zinc-400")}>Username</label>
            <Input 
              placeholder={`Enter your ${selectedPlatform.name} username`}
              className="bg-zinc-900/50 border-zinc-800/50"
            />
          </div>
          <div className="space-y-2">
            <label className={cn(typography.caption, "text-zinc-400")}>API Key</label>
            <Input 
              type="password"
              placeholder="Enter your API key"
              className="bg-zinc-900/50 border-zinc-800/50"
            />
            <p className={cn(typography.caption, "text-zinc-500 flex items-center gap-1")}>
              <Lock className="h-3 w-3" />
              Your API key is encrypted and secure
            </p>
          </div>
        </div>

        <div className="space-y-4 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
          <div className="flex items-center justify-between">
            <h4 className={cn(typography.subtitle1, "text-white")}>Features</h4>
            <Badge className="bg-[#FF1B6B]/10 text-[#FF1B6B]">Premium</Badge>
          </div>
          <div className="space-y-2">
            {[
              'Automatic post scheduling',
              'Analytics and insights',
              'Content performance tracking',
              'Revenue monitoring'
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-zinc-400">
                <Star className="h-3 w-3 text-[#FF1B6B]" />
                <span className={typography.caption}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-zinc-400 hover:text-white"
            onClick={() => window.open(`https://${selectedPlatform.name.toLowerCase()}.com/settings`, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Get API Key
          </Button>
          <Button
            variant="default"
            size="lg"
            className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white shadow-lg"
            onClick={handleConnect}
          >
            <Check className="h-4 w-4 mr-2" />
            Connect Account
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-zinc-950 border-zinc-800/50">
        {step === 'select' ? renderPlatformSelect() : renderConnectForm()}
      </DialogContent>
    </Dialog>
  )
} 