import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Heart, MessageSquare, Star, UserPlus, Zap } from "lucide-react"

const notifications = [
  {
    id: 1,
    title: "New Subscriber",
    description: "Sarah Johnson just subscribed to your content",
    time: "2 minutes ago",
    icon: UserPlus,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    id: 2,
    title: "New Message",
    description: "You have a new message from Mike Thompson",
    time: "15 minutes ago",
    icon: MessageSquare,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    id: 3,
    title: "Content Liked",
    description: "Your latest post received 50 new likes",
    time: "1 hour ago",
    icon: Heart,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
  },
  {
    id: 4,
    title: "New Review",
    description: "You received a 5-star review from Alex Parker",
    time: "2 hours ago",
    icon: Star,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
  {
    id: 5,
    title: "Subscription Renewed",
    description: "Monthly subscription was successfully renewed",
    time: "5 hours ago",
    icon: Zap,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
]

export default function NotificationsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-gray-400">Stay updated with your latest activities</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">Mark all as read</Button>
          <Button variant="outline">
            <Bell className="w-4 h-4 mr-2" />
            Notification Settings
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-800/30 transition-colors"
            >
              <div className={`p-2 rounded-full ${notification.bgColor}`}>
                <notification.icon className={`w-5 h-5 ${notification.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <span className="text-xs text-gray-400">{notification.time}</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">{notification.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 