'use client'

import * as React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Pencil,
  Image as ImageIcon,
  Link,
  Save,
  Eye,
  Plus,
  X,
  ChevronDown,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { EmptyState } from '@/components/ui/empty-state'
import { PlatformBadge } from '@/components/ui/platform-badge'
import { useDashboardData } from '@/hooks/use-dashboard-data'
import { Platform, Profile } from '@/types/dashboard'

interface ProfileSection {
  id: string
  title: string
  content: string
  platform: Platform
  isActive: boolean
}

export default function ProfileBuilderPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('onlyfans')
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [sections, setSections] = useState<ProfileSection[]>([])
  const [isEditing, setIsEditing] = useState(false)
  
  const { data: profiles, isLoading, error } = useDashboardData<Profile>({
    type: 'profiles',
    filters: {
      platform: selectedPlatform
    }
  })

  const handleAddSection = () => {
    const newSection: ProfileSection = {
      id: Date.now().toString(),
      title: 'New Section',
      content: '',
      platform: selectedPlatform,
      isActive: true
    }
    setSections([...sections, newSection])
  }

  const handleRemoveSection = (id: string) => {
    setSections(sections.filter(section => section.id !== id))
  }

  const handleSaveProfile = () => {
    // In a real app, this would save the profile
    console.log('Saving profile:', {
      displayName,
      bio,
      sections,
      platform: selectedPlatform
    })
    setIsEditing(false)
  }

  // Add pageProps to the root layout context
  React.useEffect(() => {
    const event = new CustomEvent('updatePageProps', { 
      detail: {
        title: "Profile Builder",
        description: "Create and manage your platform profiles",
        showPlatformFilter: true,
        actions: (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Pencil className="h-4 w-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
            {isEditing && (
              <Button
                size="sm"
                className="rounded-full"
                onClick={handleSaveProfile}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>
        )
      }
    })
    window.dispatchEvent(event)
  }, [isEditing]) // Re-run when isEditing changes since actions depend on it

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Profile Editor */}
      <div className="col-span-8">
        <div className="space-y-6">
          {/* Profile Image */}
          <div className="relative group">
            <div className="aspect-[3/1] rounded-xl overflow-hidden bg-zinc-900/50 border border-zinc-800">
              <img
                src="/placeholder-cover.jpg"
                alt="Profile cover"
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute bottom-4 right-4 rounded-full bg-zinc-900/90 hover:bg-zinc-900"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Change Cover
              </Button>
            )}
          </div>

          {/* Profile Info */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="relative group">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-zinc-900/50 border border-zinc-800">
                  <img
                    src="/placeholder-avatar.jpg"
                    alt="Profile avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full bg-zinc-900/90 hover:bg-zinc-900 h-8 w-8 p-0"
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Display Name"
                  disabled={!isEditing}
                  className="text-lg font-medium bg-zinc-900/50 border-zinc-800"
                />
                <div className="flex items-center gap-2">
                  <PlatformBadge
                    platform={selectedPlatform}
                    size="sm"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full text-sm text-zinc-400"
                  >
                    <Link className="h-3 w-3 mr-1" />
                    username
                  </Button>
                </div>
              </div>
            </div>

            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a bio..."
              disabled={!isEditing}
              className="min-h-[100px] bg-zinc-900/50 border-zinc-800"
            />
          </div>

          {/* Profile Sections */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Profile Sections</h3>
              {isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                  onClick={handleAddSection}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Section
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {sections.map((section) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <Input
                        value={section.title}
                        onChange={(e) => {
                          const updatedSections = sections.map(s =>
                            s.id === section.id
                              ? { ...s, title: e.target.value }
                              : s
                          )
                          setSections(updatedSections)
                        }}
                        placeholder="Section Title"
                        disabled={!isEditing}
                        className="font-medium bg-zinc-900/50 border-zinc-800"
                      />
                      <Textarea
                        value={section.content}
                        onChange={(e) => {
                          const updatedSections = sections.map(s =>
                            s.id === section.id
                              ? { ...s, content: e.target.value }
                              : s
                          )
                          setSections(updatedSections)
                        }}
                        placeholder="Section content..."
                        disabled={!isEditing}
                        className="bg-zinc-900/50 border-zinc-800"
                      />
                    </div>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-8 w-8"
                        onClick={() => handleRemoveSection(section.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}

              {sections.length === 0 && (
                <EmptyState
                  icon={Plus}
                  title="No sections yet"
                  description="Add sections to customize your profile"
                  action={
                    isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        onClick={handleAddSection}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Section
                      </Button>
                    )
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="col-span-4">
        <div className="sticky top-6 space-y-6">
          <div className="rounded-xl border border-zinc-800 overflow-hidden">
            <div className="p-4 bg-zinc-900/50 border-b border-zinc-800">
              <h3 className="font-medium">Profile Preview</h3>
            </div>
            <div className="p-4">
              <div className="aspect-[9/16] rounded-lg border border-zinc-800 bg-zinc-900/50">
                {/* Profile preview would go here */}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 overflow-hidden">
            <div className="p-4 bg-zinc-900/50 border-b border-zinc-800">
              <h3 className="font-medium">Platform Links</h3>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between rounded-full"
                >
                  <span className="flex items-center gap-2">
                    <PlatformBadge
                      platform="onlyfans"
                      size="sm"
                      showLabel={false}
                    />
                    OnlyFans Profile
                  </span>
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between rounded-full"
                >
                  <span className="flex items-center gap-2">
                    <PlatformBadge
                      platform="fansly"
                      size="sm"
                      showLabel={false}
                    />
                    Fansly Profile
                  </span>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
