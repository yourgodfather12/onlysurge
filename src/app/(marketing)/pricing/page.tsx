'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const pricingPlans = [
  {
    name: 'Basic',
    price: '$29',
    description: 'Perfect for getting started',
    features: [
      'Basic AI content suggestions',
      'Up to 100 scheduled posts',
      'Basic analytics',
      'Email support'
    ]
  },
  {
    name: 'Pro',
    price: '$79',
    description: 'Best for growing creators',
    features: [
      'Advanced AI content generation',
      'Unlimited scheduled posts',
      'Advanced analytics & insights',
      'Priority support',
      'Custom branding',
      'Team collaboration'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For established creators',
    features: [
      'Custom AI model training',
      'Dedicated account manager',
      'Custom integrations',
      'SLA & premium support',
      'Advanced security features',
      'API access'
    ]
  }
]

const faqs = [
  {
    question: 'How do I get started?',
    answer: "Getting started is easy! Simply sign up for an account, choose your plan, and you'll have immediate access to our platform."
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and cryptocurrency payments.'
  },
  {
    question: 'Can I change plans later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
  },
  {
    question: 'Do you offer refunds?',
    answer: "Yes, we offer a 30-day money-back guarantee if you aren't satisfied with our service."
  },
  {
    question: 'Is there a long-term contract?',
    answer: 'No, all our plans are month-to-month with no long-term commitment required.'
  }
]

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Simple, Transparent Pricing</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Choose the perfect plan for your content creation journey. All plans include our core features.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 to-neon-blue/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative bg-dark-light/30 backdrop-blur-xl p-8 rounded-xl border border-white/10">
              <div className="text-2xl font-bold mb-2">{plan.name}</div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-gray-400">/month</span>}
              </div>
              <p className="text-gray-400 mb-6">{plan.description}</p>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-neon-pink to-neon-purple rounded-lg font-medium hover:opacity-90 transition-opacity mb-6">
                Get Started
              </button>
              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-neon-purple/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-neon-purple" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 to-neon-blue/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-dark-light/30 backdrop-blur-xl p-6 rounded-xl border border-white/10">
                <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 