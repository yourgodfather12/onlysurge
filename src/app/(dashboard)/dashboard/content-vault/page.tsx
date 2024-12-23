'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Plus,
  Search,
  Filter,
  Grid,
  List,
  MoreVertical,
  Image as ImageIcon,
  Video,
  FileText,
  Calendar,
  Clock,
  Eye,
  Heart,
  DollarSign,
} from 'lucide-react'

const content = [
  {
    id: 1,
    title: 'Summer Collection 2024',
    type: 'image',
    thumbnail: '/content/summer-collection.jpg',
    status: 'published',
    views: '12.5K',
    likes: '2.3K',
    revenue: '$1,234',
    date: 'Dec 21, 2023',
  },
  {
    id: 2,
    title: 'Behind the Scenes',
    type: 'video',
    thumbnail: '/content/behind-scenes.jpg',
    status: 'scheduled',
    views: '-',
    likes: '-',
    revenue: '-',
    date: 'Dec 25, 2023',
  },
  {
    id: 3,
    title: 'Lifestyle Tips & Tricks',
    type: 'article',
    thumbnail: '/content/lifestyle.jpg',
    status: 'draft',
    views: '-',
    likes: '-',
    revenue: '-',
    date: 'Last edited 2h ago',
  },
  // Add more content items...
]

export default function ContentVaultPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Vault</h1>
          <p className="text-gray-400">Manage and organize your content</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Content
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search content..." className="pl-9" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <div className="flex items-center gap-2 border-l border-gray-800 pl-4">
          <Button variant="ghost" size="icon">
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {content.map((item) => (
          <Card key={item.id} className="dashboard-card overflow-hidden">
            <div className="aspect-video bg-gray-800 relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <Button size="sm" variant="secondary" className="gap-1">
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                  <Button size="sm" variant="secondary">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {item.type === 'image' && (
                <ImageIcon className="absolute top-4 right-4 h-5 w-5 text-white/70" />
              )}
              {item.type === 'video' && (
                <Video className="absolute top-4 right-4 h-5 w-5 text-white/70" />
              )}
              {item.type === 'article' && (
                <FileText className="absolute top-4 right-4 h-5 w-5 text-white/70" />
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>{item.date}</span>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'published'
                      ? 'bg-green-500/10 text-green-500'
                      : item.status === 'scheduled'
                      ? 'bg-blue-500/10 text-blue-500'
                      : 'bg-gray-500/10 text-gray-500'
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-800">
                <div>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Eye className="h-3 w-3" /> Views
                  </p>
                  <p className="font-medium">{item.views}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Heart className="h-3 w-3" /> Likes
                  </p>
                  <p className="font-medium">{item.likes}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <DollarSign className="h-3 w-3" /> Revenue
                  </p>
                  <p className="font-medium">{item.revenue}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 