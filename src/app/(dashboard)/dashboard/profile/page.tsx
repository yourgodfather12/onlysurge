import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Camera, Mail, MapPin, Phone, User } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>
        <Button>Save Changes</Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Profile Info */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
              <Button size="icon" variant="ghost" className="absolute bottom-0 right-0 rounded-full bg-gray-800 hover:bg-gray-700">
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div>
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-gray-400">@johndoe</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Full Name</label>
              <div className="flex">
                <span className="flex items-center px-3 border border-r-0 rounded-l-md border-gray-800 bg-gray-900">
                  <User className="w-4 h-4 text-gray-400" />
                </span>
                <Input className="rounded-l-none" placeholder="John Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Email</label>
              <div className="flex">
                <span className="flex items-center px-3 border border-r-0 rounded-l-md border-gray-800 bg-gray-900">
                  <Mail className="w-4 h-4 text-gray-400" />
                </span>
                <Input className="rounded-l-none" placeholder="john@example.com" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Phone</label>
              <div className="flex">
                <span className="flex items-center px-3 border border-r-0 rounded-l-md border-gray-800 bg-gray-900">
                  <Phone className="w-4 h-4 text-gray-400" />
                </span>
                <Input className="rounded-l-none" placeholder="+1 (555) 000-0000" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Location</label>
              <div className="flex">
                <span className="flex items-center px-3 border border-r-0 rounded-l-md border-gray-800 bg-gray-900">
                  <MapPin className="w-4 h-4 text-gray-400" />
                </span>
                <Input className="rounded-l-none" placeholder="San Francisco, CA" />
              </div>
            </div>
          </div>
        </Card>

        {/* Account Settings */}
        <Card className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">Account Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
              <div>
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
              </div>
              <Button variant="outline">Enable</Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-gray-400">Choose what updates you want to receive</p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
              <div>
                <h3 className="font-medium">Connected Accounts</h3>
                <p className="text-sm text-gray-400">Manage your linked social accounts</p>
              </div>
              <Button variant="outline">Manage</Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-red-900/20">
              <div>
                <h3 className="font-medium text-red-400">Delete Account</h3>
                <p className="text-sm text-red-400/70">Permanently delete your account and all data</p>
              </div>
              <Button variant="ghost" className="text-red-400 hover:bg-red-900/40">Delete</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 