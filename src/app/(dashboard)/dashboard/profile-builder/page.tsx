'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Wand2,
  Image as ImageIcon,
  FileText,
  Camera,
  Sparkles,
  ArrowRight,
  CircleDollarSign,
  Instagram as InstagramIcon,
} from 'lucide-react'

// Mock data for profile suggestions
const suggestions = [
  {
    id: 1,
    type: 'bio',
    original: 'Content creator sharing lifestyle and fashion tips',
    suggestion: '🌟 Lifestyle influencer crafting unique experiences | Fashion enthusiast bringing style to life | Join my exclusive community for daily inspiration ✨',
    platform: 'OnlyFans',
    confidence: 92,
  },
  {
    id: 2,
    type: 'hashtags',
    original: '#fashion #lifestyle #creator',
    suggestion: '#fashionista #lifestyleinfluencer #contentcreator #styleinspo #fashionlover #dailyinspiration #exclusivecontent',
    platform: 'Instagram',
    confidence: 88,
  },
]

export default function ProfileBuilderPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white">Profile Builder</h2>
          <p className="text-sm text-gray-400">
            Create and optimize your profiles with AI assistance
          </p>
        </div>
        <Button>
          <Wand2 className="w-4 h-4 mr-2" />
          Generate Profile
        </Button>
      </div>

      {/* Profile Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Preview</CardTitle>
          <CardDescription>
            See how your profile appears across different platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center">
                <Camera className="w-8 h-8 text-gray-600" />
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ImageIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-400">Display Name</label>
                <Input
                  placeholder="Your display name"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Bio</label>
                <div className="relative mt-1">
                  <textarea
                    className="w-full h-24 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                    placeholder="Write something about yourself..."
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute bottom-2 right-2 opacity-50 hover:opacity-100"
                  >
                    <Wand2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-400">Website</label>
                  <Input
                    placeholder="Your website URL"
                    className="mt-1"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-400">Location</label>
                  <Input
                    placeholder="Your location"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>AI Suggestions</CardTitle>
          <CardDescription>
            Smart recommendations to improve your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="p-4 rounded-lg bg-gray-800/50 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-400">
                      {suggestion.type === 'bio' ? 'Bio Suggestion' : 'Hashtag Suggestion'}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs bg-gray-700 text-gray-400">
                      {suggestion.platform}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {suggestion.confidence}% match
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="text-sm text-gray-400">Original:</div>
                  <div className="p-3 rounded bg-gray-800">{suggestion.original}</div>
                  <div className="text-sm text-gray-400">Suggestion:</div>
                  <div className="p-3 rounded bg-pink-500/10 border border-pink-500/20">
                    {suggestion.suggestion}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    Modify
                  </Button>
                  <Button variant="default" size="sm">
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Platform Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Settings</CardTitle>
          <CardDescription>
            Customize your profile for each platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
                  <CircleDollarSign className="w-5 h-5 text-pink-500" />
                </div>
                <div className="text-left">
                  <div className="font-medium">OnlyFans</div>
                  <div className="text-xs text-gray-400">Customize profile</div>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-500" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Fansly</div>
                  <div className="text-xs text-gray-400">Customize profile</div>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <InstagramIcon className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Instagram</div>
                  <div className="text-xs text-gray-400">Customize profile</div>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
