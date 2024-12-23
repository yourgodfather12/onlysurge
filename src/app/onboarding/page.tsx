'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { 
  ArrowRight, 
  Instagram, 
  Twitter, 
  CheckCircle2,
  Link as LinkIcon,
  Camera,
  Upload,
  DollarSign,
  Globe,
  Shield,
  Lock,
  Sparkles,
} from 'lucide-react'

const platforms = [
  {
    name: 'OnlyFans',
    icon: Lock,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    description: 'Connect your OnlyFans account to sync content and analytics',
    features: ['Content Sync', 'Analytics', 'Automated Posting'],
  },
  {
    name: 'Fansly',
    icon: Sparkles,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    description: 'Integrate with Fansly to manage your content in one place',
    features: ['Content Management', 'Scheduling', 'Analytics'],
  },
  {
    name: 'Instagram',
    icon: Instagram,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/20',
    description: 'Connect Instagram to cross-promote and grow your audience',
    features: ['Story Sync', 'Cross-posting', 'Insights'],
  },
  {
    name: 'Twitter',
    icon: Twitter,
    color: 'text-sky-500',
    bgColor: 'bg-sky-500/10',
    borderColor: 'border-sky-500/20',
    description: 'Link Twitter to expand your reach and engagement',
    features: ['Tweet Scheduling', 'Analytics', 'Auto-promotion'],
  },
]

const steps = [
  {
    id: 'welcome',
    title: 'Welcome to OnlySurge! 👋',
    description: 'Let's get you set up with your account in just a few steps.',
    icon: Globe,
  },
  {
    id: 'profile',
    title: 'Create your profile',
    description: 'Tell us a bit about yourself and set up your creator profile.',
    icon: Camera,
  },
  {
    id: 'platforms',
    title: 'Connect your platforms',
    description: 'Link your social media accounts to maximize your reach.',
    icon: LinkIcon,
  },
  {
    id: 'monetization',
    title: 'Set up monetization',
    description: 'Configure your payment methods and pricing strategy.',
    icon: DollarSign,
  },
  {
    id: 'complete',
    title: 'You're all set! 🎉',
    description: 'Your account is ready to go.',
    icon: CheckCircle2,
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    profileImage: null as File | null,
    platforms: [] as string[],
    subscriptionPrice: '',
    paymentEmail: '',
  })
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Try to get user data if available
    const getUserData = async () => {
      try {
        const response = await fetch('/api/user')
        if (response.ok) {
          const userData = await response.json()
          setFormData(prev => ({
            ...prev,
            displayName: userData.displayName || '',
            email: userData.email || '',
          }))
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }
    getUserData()
  }, [])

  const handleNext = async () => {
    if (currentStep === steps.length - 1) {
      await completeOnboarding()
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const completeOnboarding = async () => {
    try {
      setIsSubmitting(true)
      
      // Upload profile image if exists
      let profileImageUrl = null
      if (formData.profileImage) {
        const imageFormData = new FormData()
        imageFormData.append('file', formData.profileImage)
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: imageFormData,
        })
        if (uploadResponse.ok) {
          const { url } = await uploadResponse.json()
          profileImageUrl = url
        }
      }

      // Save onboarding data
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          profileImage: profileImageUrl,
        }),
      })

      if (response.ok) {
        // Set onboarding completion cookie
        document.cookie = 'onboarding_completed=true; path=/'
        router.push('/dashboard')
      } else {
        throw new Error('Failed to complete onboarding')
      }
    } catch (error) {
      console.error('Error completing onboarding:', error)
      // Handle error (show toast notification, etc.)
    } finally {
      setIsSubmitting(false)
    }
  }

  const validateStep = () => {
    switch (currentStep) {
      case 1: // Profile
        return formData.displayName.trim() !== '' && formData.bio.trim() !== ''
      case 2: // Platforms
        return formData.platforms.length > 0
      case 3: // Monetization
        return (
          formData.subscriptionPrice !== '' &&
          formData.paymentEmail !== '' &&
          formData.paymentEmail.includes('@')
        )
      default:
        return true
    }
  }

  useEffect(() => {
    if (isUploading) {
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            setIsUploading(false)
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 500)
      return () => clearInterval(interval)
    }
  }, [isUploading])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, profileImage: file }))
      setIsUploading(true)
      setUploadProgress(0)
    }
  }

  const handlePlatformToggle = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform],
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      <div className="w-full max-w-3xl p-4">
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex items-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: index <= currentStep ? 1 : 0.8,
                  opacity: index <= currentStep ? 1 : 0.5 
                }}
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  index <= currentStep ? 'bg-pink-500 text-white' : 'bg-gray-800 text-gray-400'
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <step.icon className="w-6 h-6" />
                )}
              </motion.div>
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ 
                    scaleX: index < currentStep ? 1 : 0,
                    backgroundColor: index < currentStep ? '#ec4899' : '#1f2937'
                  }}
                  className="w-full h-1 mx-4 origin-left bg-gray-800"
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="backdrop-blur-sm">
              <CardHeader>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <CardTitle>{steps[currentStep].title}</CardTitle>
                  <CardDescription>{steps[currentStep].description}</CardDescription>
                </motion.div>
              </CardHeader>

              <CardContent>
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="flex justify-center">
                      <div className="relative group">
                        <div className="w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                          {formData.profileImage ? (
                            <img 
                              src={URL.createObjectURL(formData.profileImage)} 
                              alt="Profile" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Camera className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                          <label className="cursor-pointer">
                            <Upload className="w-6 h-6 text-white" />
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              onChange={handleFileUpload}
                            />
                          </label>
                        </div>
                        {isUploading && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${uploadProgress}%` }}
                                className="h-full bg-pink-500"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Display Name
                      </label>
                      <Input
                        placeholder="Enter your display name"
                        value={formData.displayName}
                        onChange={e => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Bio
                      </label>
                      <Input
                        placeholder="Tell us about yourself"
                        value={formData.bio}
                        onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {platforms.map((platform) => (
                      <motion.button
                        key={platform.name}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handlePlatformToggle(platform.name)}
                        className={`p-4 rounded-lg border ${platform.borderColor} ${platform.bgColor} transition-all group relative overflow-hidden text-left`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${platform.bgColor}`}>
                            <platform.icon className={`w-6 h-6 ${platform.color}`} />
                          </div>
                          <div>
                            <div className="font-medium">{platform.name}</div>
                            <div className="text-sm text-gray-400 mt-1">
                              {platform.description}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {platform.features.map((feature, index) => (
                                <span 
                                  key={index}
                                  className="text-xs px-2 py-1 rounded-full bg-gray-800/50"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        {formData.platforms.includes(platform.name) && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-green-500/10 border-2 border-green-500 rounded-lg flex items-center justify-center"
                          >
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Subscription Price (USD)
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type="number"
                          placeholder="9.99"
                          className="pl-9"
                          value={formData.subscriptionPrice}
                          onChange={e => setFormData(prev => ({ ...prev, subscriptionPrice: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Payment Email
                      </label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.paymentEmail}
                        onChange={e => setFormData(prev => ({ ...prev, paymentEmail: e.target.value }))}
                      />
                    </div>
                    <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-pink-500 font-medium">
                        <Shield className="w-4 h-4" />
                        Secure Payment Processing
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        Your payment information is encrypted and secure. We use industry-standard security measures.
                      </p>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="w-20 h-20 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle2 className="w-10 h-10" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold mb-2">
                        Welcome aboard, {formData.displayName}!
                      </h3>
                      <p className="text-gray-400">
                        Your account has been set up successfully. You can now start using OnlySurge to manage your content and grow your audience!
                      </p>
                      <div className="flex flex-wrap justify-center gap-2 mt-4">
                        {formData.platforms.map((platform) => (
                          <span
                            key={platform}
                            className="text-sm px-3 py-1 rounded-full bg-gray-800 text-gray-400"
                          >
                            {platform} Connected
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="justify-between">
                {currentStep > 0 && currentStep < steps.length - 1 && (
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                )}
                {currentStep < steps.length - 1 ? (
                  <Button
                    className="ml-auto"
                    onClick={handleNext}
                    disabled={!validateStep() || isSubmitting}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    className="ml-auto"
                    onClick={handleNext}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-pulse">Completing setup...</span>
                      </>
                    ) : (
                      <>
                        Complete Setup
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
} 