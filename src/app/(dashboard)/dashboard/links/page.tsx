'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Link as LinkIcon,
  Plus,
  Globe,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  DollarSign,
  GripVertical,
  Trash2,
  ExternalLink,
} from 'lucide-react'

// Mock data for links
const links = [
  {
    id: 1,
    title: 'OnlyFans VIP',
    url: 'https://onlyfans.com/username',
    icon: DollarSign,
    clicks: 1234,
    active: true,
  },
  {
    id: 2,
    title: 'Instagram',
    url: 'https://instagram.com/username',
    icon: Instagram,
    clicks: 856,
    active: true,
  },
  {
    id: 3,
    title: 'Twitter',
    url: 'https://twitter.com/username',
    icon: Twitter,
    clicks: 567,
    active: true,
  },
  {
    id: 4,
    title: 'TikTok',
    url: 'https://tiktok.com/@username',
    icon: Youtube,
    clicks: 432,
    active: false,
  },
]

export default function LinksPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white">Links</h2>
          <p className="text-sm text-gray-400">
            Manage your platform links and track their performance
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Link
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Clicks
            </CardTitle>
            <Globe className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3,089</div>
            <p className="text-xs text-green-500">+12.3% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Active Links
            </CardTitle>
            <LinkIcon className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">8</div>
            <p className="text-xs text-gray-400">Out of 10 total links</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Top Platform
            </CardTitle>
            <Instagram className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">Instagram</div>
            <p className="text-xs text-gray-400">856 clicks this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Links List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Links</CardTitle>
          <CardDescription>
            Drag and drop to reorder your links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {links.map((link) => (
              <div
                key={link.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors group"
              >
                <Button variant="ghost" size="icon" className="cursor-grab">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                </Button>
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center">
                    <link.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-white truncate">
                        {link.title}
                      </h3>
                      {!link.active && (
                        <span className="px-2 py-0.5 rounded text-xs bg-gray-700 text-gray-400">
                          Inactive
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 truncate">{link.url}</p>
                  </div>
                  <div className="text-sm text-gray-400">
                    {link.clicks.toLocaleString()} clicks
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 