'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Link as LinkIcon,
  Instagram,
  Twitter,
  Globe,
  Camera,
  Save,
  Plus,
  Settings,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useDashboard } from '@/app/(dashboard)/layout'
import { PlatformBadge } from '@/components/ui/platform-badge'
import { Platform } from '@/types/dashboard'

interface SocialLink {
  id: string
  platform: string
  url: string
  icon: React.ElementType
}

interface Profile {
  id: string
  username: string
  displayName: string
  email: string
  bio: string
  avatarUrl: string
  platforms: Platform[]
  socialLinks: SocialLink[]
}

const profile: Profile = {
  id: '1',
  username: 'creator123',
  displayName: 'Creative Creator',
  email: 'creator@example.com',
  bio: 'Digital content creator passionate about sharing unique experiences.',
  avatarUrl: '/placeholder.jpg',
  platforms: [
    {
      id: 'onlyfans',
      name: 'OnlyFans',
      type: 'onlyfans',
      icon: null,
      status: 'connected',
      metrics: {
        subscribers: 1234,
        views: 45678,
        revenue: 9012
      }
    },
    {
      id: 'fansly',
      name: 'Fansly',
      type: 'fansly',
      icon: null,
      status: 'connected',
      metrics: {
        subscribers: 567,
        views: 8901,
        revenue: 2345
      }
    }
  ],
  socialLinks: [
    {
      id: '1',
      platform: 'Instagram',
      url: 'https://instagram.com/creator123',
      icon: Instagram
    },
    {
      id: '2',
      platform: 'Twitter',
      url: 'https://twitter.com/creator123',
      icon: Twitter
    },
    {
      id: '3',
      platform: 'Website',
      url: 'https://creator123.com',
      icon: Globe
    }
  ]
}

export default function ProfilePage() {
  const { setPageProps } = useDashboard()

  useEffect(() => {
    setPageProps({
      title: "Profile",
      description: "Manage your profile and settings",
      showPlatformFilter: false,
      actions: (
        <Button
          size="sm"
          className="rounded-full"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      )
    })
  }, [setPageProps])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-start gap-6">
          <div className="relative">
            <img
              src={profile.avatarUrl}
              alt={profile.displayName}
              className="h-24 w-24 rounded-full object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-0 right-0 rounded-full bg-background shadow-lg"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{profile.displayName}</h2>
                <p className="text-zinc-400">@{profile.username}</p>
              </div>
              <Button variant="ghost" size="sm" className="rounded-full">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-4">
              {profile.platforms.map((platform) => (
                <PlatformBadge
                  key={platform.id}
                  platform={platform}
                  showStatus
                />
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Basic Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Username
              </label>
              <Input
                startDecorator={<User className="h-4 w-4 text-zinc-400" />}
                defaultValue={profile.username}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Display Name
              </label>
              <Input
                startDecorator={<User className="h-4 w-4 text-zinc-400" />}
                defaultValue={profile.displayName}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Email
            </label>
            <Input
              startDecorator={<Mail className="h-4 w-4 text-zinc-400" />}
              defaultValue={profile.email}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Bio
            </label>
            <Textarea
              defaultValue={profile.bio}
              rows={4}
            />
          </div>
        </div>
      </Card>

      {/* Social Links */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Social Links</h3>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Link
          </Button>
        </div>
        <div className="space-y-4">
          {profile.socialLinks.map((link) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-4 hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-zinc-800">
                    <link.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-medium">{link.platform}</h4>
                        <p className="text-sm text-zinc-400 truncate">
                          {link.url}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => window.open(link.url, '_blank')}
                    >
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  )
} 