'use client'

import { motion } from 'framer-motion'
import { Mail, MessageSquare, Phone, MapPin, Clock, Globe } from 'lucide-react'

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Our team typically responds within 2 hours',
    value: 'support@onlysurge.com',
    link: 'mailto:support@onlysurge.com'
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Available 24/7 for instant support',
    value: 'Start a conversation',
    link: '#chat'
  },
  {
    icon: Phone,
    title: 'Phone',
    description: 'Mon-Fri from 8am to 5pm',
    value: '+1 (555) 123-4567',
    link: 'tel:+15551234567'
  },
  {
    icon: MapPin,
    title: 'Office',
    description: 'Visit us in San Francisco',
    value: '100 Market St, SF, CA 94105',
    link: 'https://maps.google.com'
  }
]

const additionalInfo = [
  {
    icon: Clock,
    title: 'Business Hours',
    items: [
      'Monday - Friday: 8:00 AM - 5:00 PM PST',
      'Saturday: 9:00 AM - 2:00 PM PST',
      'Sunday: Closed'
    ]
  },
  {
    icon: Globe,
    title: 'Global Support',
    items: [
      'English - 24/7 Support',
      'Spanish - Mon-Fri, 9 AM - 6 PM PST',
      'French - Mon-Fri, 9 AM - 6 PM CET'
    ]
  }
]

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Header */}
      <div className="container mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-300">
            Have questions? We'd love to hear from you. Send us a message
            and we'll respond as soon as possible.
          </p>
        </motion.div>
      </div>

      {/* Contact Methods */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.title}
              href={method.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 to-neon-blue/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-dark-light/30 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-colors h-full">
                <div className="inline-block p-3 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple mb-4">
                  <method.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{method.description}</p>
                <p className="text-white font-medium">{method.value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Contact Form and Additional Info */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 to-neon-blue/20 rounded-2xl blur-xl" />
              <div className="relative bg-dark-light/30 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-neon-purple focus:border-transparent transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-neon-purple focus:border-transparent transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-200 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-neon-purple focus:border-transparent transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-neon-purple focus:border-transparent transition-colors resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-6"
          >
            {additionalInfo.map((info, index) => (
              <div
                key={info.title}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 to-neon-blue/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative bg-dark-light/30 backdrop-blur-xl p-6 rounded-xl border border-white/10">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-lg bg-white/5 mr-3">
                      <info.icon className="w-5 h-5 text-neon-purple" />
                    </div>
                    <h3 className="text-lg font-semibold">{info.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {info.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-300">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Map Preview */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 to-neon-blue/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-dark-light/30 backdrop-blur-xl p-6 rounded-xl border border-white/10">
                <div className="aspect-video rounded-lg overflow-hidden bg-dark-lighter">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0636441988815!2d-122.41941708468186!3d37.77492977975791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter+HQ!5e0!3m2!1sen!2sus!4v1564164514693!5m2!1sen!2sus"
                    className="w-full h-96 rounded-lg"
                    title="OnlySurge Office Location Map"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 