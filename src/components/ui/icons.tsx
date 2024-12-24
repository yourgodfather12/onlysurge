'use client';

import {
  Activity,
  BarChart,
  Bot,
  Check,
  CheckCheck,
  Circle,
  Download,
  DollarSign,
  Eye,
  File,
  Heart,
  Image,
  Layers,
  Link,
  MessageCircle,
  MessageSquare,
  MessageSquarePlus,
  MoreHorizontal,
  Plus,
  Rocket,
  Settings,
  ShoppingCart,
  Sparkles,
  Text,
  TrendingDown,
  TrendingUp,
  Users,
  Video,
  type LucideIcon,
} from 'lucide-react';

export type Icon = LucideIcon;

export const Icons = {
  activity: Activity,
  barChart: BarChart,
  bot: Bot,
  check: Check,
  checkCheck: CheckCheck,
  circle: Circle,
  download: Download,
  dollarSign: DollarSign,
  empty: Circle,
  eye: Eye,
  file: File,
  heart: Heart,
  image: Image,
  layers: Layers,
  link: Link,
  messageCircle: MessageCircle,
  messageSquare: MessageSquare,
  messageSquarePlus: MessageSquarePlus,
  moreHorizontal: MoreHorizontal,
  onlyfans: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
    </svg>
  ),
  fansly: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  plus: Plus,
  rocket: Rocket,
  settings: Settings,
  shoppingCart: ShoppingCart,
  sparkles: Sparkles,
  spinner: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  text: Text,
  trendingDown: TrendingDown,
  trendingUp: TrendingUp,
  users: Users,
  video: Video,
}; 