'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Shield, Lock, Zap, ChevronRight, Star, Globe, Cpu, Check } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const testimonials = [
    { name: "John Doe", company: "Tech Corp", content: "CyberGuard AI has revolutionized our security infrastructure. It's like having a tireless, intelligent guardian watching over our systems 24/7." },
    { name: "Jane Smith", company: "Data Inc.", content: "The AI-driven analysis caught a sophisticated attack that our traditional systems missed. CyberGuard AI is now an integral part of our cybersecurity strategy." },
    { name: "Alex Johnson", company: "SecureNet", content: "The real-time monitoring and automated protection have significantly reduced our response time to threats. It's a game-changer in the cybersecurity landscape." },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-100 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <nav className="relative z-10 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            CyberGuard AI
          </Link>
          <div className="space-x-4">
            <Link href="/sign-in">
              <Button variant="outline" className="bg-transparent border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300">
                Login
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white transition-all duration-300">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      <main className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Badge variant="outline" className="mb-4 text-green-400 border-green-400">Next-Gen Cybersecurity</Badge>
          <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
            AI-Powered Cybersecurity
          </h1>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Protect your digital assets with cutting-edge AI technology for real-time threat detection and prevention. Stay one step ahead of cyber threats with our advanced machine learning algorithms.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/sign-up">
              <Button size="lg" className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Start Your Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-4 rounded-full text-lg font-semibold border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300">
              Watch Demo <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { icon: Shield, title: 'Real-time Monitoring', description: 'Continuous surveillance of your systems to detect threats as they emerge.' },
            { icon: Zap, title: 'AI-driven Analysis', description: 'Advanced machine learning algorithms to identify complex attack patterns.' },
            { icon: Lock, title: 'Automated Protection', description: 'Instant response mechanisms to neutralize threats before they cause damage.' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg border border-gray-700"
            >
              <feature.icon className="w-12 h-12 mb-4 text-green-400" />
              <h2 className="text-2xl font-semibold mb-4 text-green-400">{feature.title}</h2>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-24"
        >
          <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            How CyberGuard AI Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: 'Data Collection', description: 'Gather data from various sources across your network.' },
              { icon: Cpu, title: 'AI Processing', description: 'Our advanced AI analyzes the data to identify potential threats.' },
              { icon: Shield, title: 'Threat Mitigation', description: 'Automatically implement protective measures against detected threats.' },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + (index * 0.2), duration: 0.5 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg border border-gray-700"
              >
                <step.icon className="w-12 h-12 mb-4 text-blue-400" />
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-24"
        >
          <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Why Choose CyberGuard AI?
          </h2>
          <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger>Advanced AI Technology</AccordionTrigger>
              <AccordionContent>
                Our state-of-the-art AI algorithms are constantly learning and evolving to detect even the most sophisticated cyber threats. We use a combination of machine learning, deep learning, and natural language processing to analyze patterns and anomalies in your network traffic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>24/7 Real-time Protection</AccordionTrigger>
              <AccordionContent>
                CyberGuard AI never sleeps, providing round-the-clock monitoring and protection for your digital assets. Our system processes millions of events per second, ensuring that no threat goes unnoticed, regardless of the time of day.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Easy Integration</AccordionTrigger>
              <AccordionContent>
                Seamlessly integrate CyberGuard AI with your existing security infrastructure without any downtime or disruption. Our platform is designed to work alongside your current security tools, enhancing their capabilities and filling in any gaps in your defense.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Predictive Threat Intelligence</AccordionTrigger>
              <AccordionContent>
                CyberGuard AI doesn't just react to threats - it predicts them. By analyzing global threat data and your specific network patterns, our AI can anticipate potential vulnerabilities and emerging threats before they become active attacks.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="mt-24"
        >
          <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg border border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <Star className="text-yellow-400 mr-1" />
                  <Star className="text-yellow-400 mr-1" />
                  <Star className="text-yellow-400 mr-1" />
                  <Star className="text-yellow-400 mr-1" />
                  <Star className="text-yellow-400" />
                </div>
                <p className="text-gray-300 mb-4">{testimonial.content}</p>
                <div className="font-semibold text-green-400">{testimonial.name}</div>
                <div className="text-sm text-gray-400">{testimonial.company}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="mt-24"
        >
          <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Pricing Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: '$99', features: ['Real-time monitoring', 'Basic AI analysis', 'Email alerts'] },
              { name: 'Pro', price: '$299', features: ['Everything in Starter', 'Advanced AI analysis', 'Automated threat response', '24/7 expert support'] },
              { name: 'Enterprise', price: 'Custom', features: ['Everything in Pro', 'Dedicated AI model', 'On-premise deployment option', 'Custom integrations'] },
            ].map((plan, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg border border-gray-700"
              >
                <h3 className="text-2xl font-semibold mb-4 text-green-400">{plan.name}</h3>
                <p className="text-4xl font-bold mb-6">{plan.price}<span className="text-sm font-normal">/month</span></p>
                <ul className="mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center mb-2">
                      <Check className="text-green-400 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600">
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <footer className="relative z-10 bg-gray-900 border-t border-gray-800 mt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-300 hover:text-green-400">About Us</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-green-400">Careers</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-green-400">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Product</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-300 hover:text-green-400">Features</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-green-400">Pricing</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-green-400">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-300 hover:text-green-400">Blog</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-green-400">Documentation</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-green-400">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-300 hover:text-green-400">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-green-400">Terms of Service</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-green-400">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2023 CyberGuard AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}