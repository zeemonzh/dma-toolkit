import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import {
  ArrowDownTrayIcon,
  CpuChipIcon,
  ChartBarIcon,
  ServerIcon,
  WrenchScrewdriverIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Tool Downloader',
    description: 'Auto-select and download required binaries, drivers, and dependencies.',
    icon: ArrowDownTrayIcon,
    href: '/tools'
  },
  {
    name: 'DMA ID Getter',
    description: 'Instantly fetch unique DMA device identifiers.',
    icon: CpuChipIcon,
    href: '/id-getter'
  },
  {
    name: 'Speed Test',
    description: 'Real-time throughput benchmarks between host and target.',
    icon: ChartBarIcon,
    href: '/speed-test'
  },
  {
    name: 'Firmware Flasher',
    description: 'Web-based firmware upload to connected devices.',
    icon: ServerIcon,
    href: '/firmware'
  },
  {
    name: 'System Checkup',
    description: 'Pre-flight diagnostics to verify all DMA components are working.',
    icon: WrenchScrewdriverIcon,
    href: '/checkup'
  },
  {
    name: 'Logs Viewer',
    description: 'Unified logging interface from the agent and backend.',
    icon: ChatBubbleLeftRightIcon,
    href: '/logs'
  },
]

// Animated circuit paths
const CircuitAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="circuitFadeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="75%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="circuitFadeMask">
            <rect width="100%" height="100%" fill="url(#circuitFadeGradient)" />
          </mask>
        </defs>
        <g opacity="0.15" mask="url(#circuitFadeMask)">
          {/* Horizontal lines */}
          <motion.path
            d="M0 200 H1000"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }}
            stroke="#6366f1"
            strokeWidth="2"
            fill="none"
          />
          <motion.path
            d="M0 400 H1000"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            stroke="#6366f1"
            strokeWidth="2"
            fill="none"
          />
          <motion.path
            d="M0 600 H1000"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
            stroke="#6366f1"
            strokeWidth="2"
            fill="none"
          />
          <motion.path
            d="M0 800 H1000"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: "easeInOut", delay: 0.4 }}
            stroke="#6366f1"
            strokeWidth="2"
            fill="none"
          />
          
          {/* Vertical lines */}
          <motion.path
            d="M200 0 V1000"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeInOut", delay: 0.2 }}
            stroke="#6366f1"
            strokeWidth="2"
            fill="none"
          />
          <motion.path
            d="M400 0 V1000"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
            stroke="#6366f1"
            strokeWidth="2"
            fill="none"
          />
          <motion.path
            d="M600 0 V1000"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
            stroke="#6366f1"
            strokeWidth="2"
            fill="none"
          />
          <motion.path
            d="M800 0 V1000"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.3, ease: "easeInOut", delay: 0.5 }}
            stroke="#6366f1"
            strokeWidth="2"
            fill="none"
          />
          
          {/* Circuit nodes */}
          <motion.circle
            cx="200" cy="200" r="5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            fill="#818cf8"
          />
          <motion.circle
            cx="400" cy="400" r="5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            fill="#818cf8"
          />
          <motion.circle
            cx="600" cy="600" r="5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.9 }}
            fill="#818cf8"
          />
          <motion.circle
            cx="800" cy="800" r="5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.0 }}
            fill="#818cf8"
          />
          
          {/* Diagonal connections */}
          <motion.path
            d="M200 200 L400 400"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.9 }}
            stroke="#818cf8"
            strokeWidth="2"
            fill="none"
          />
          <motion.path
            d="M400 400 L600 600"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 1.0 }}
            stroke="#818cf8"
            strokeWidth="2"
            fill="none"
          />
          <motion.path
            d="M600 600 L800 800"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 1.1 }}
            stroke="#818cf8"
            strokeWidth="2"
            fill="none"
          />
        </g>
      </svg>
    </div>
  )
}

// Particle animation component
const Particles = () => {
  const particleRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const particles = particleRef.current
    if (!particles) return
    
    const createParticle = () => {
      const particle = document.createElement('div')
      particle.style.position = 'absolute'
      particle.style.width = '2px'
      particle.style.height = '2px'
      particle.style.background = 'rgba(123, 104, 238, 0.4)'
      particle.style.borderRadius = '50%'
      
      // Random position
      const x = Math.random() * 100
      const y = Math.random() * 100
      particle.style.left = `${x}%`
      particle.style.top = `${y}%`
      
      // Random duration between 5-15s
      const duration = 5 + Math.random() * 10
      particle.style.animation = `float ${duration}s linear infinite`
      
      particles.appendChild(particle)
      
      // Remove particle after some time to prevent memory issues
      setTimeout(() => {
        particle.remove()
      }, duration * 1000)
    }
    
    // Create initial particles
    for (let i = 0; i < 50; i++) {
      createParticle()
    }
    
    // Add new particles occasionally
    const interval = setInterval(() => {
      if (particles.childNodes.length < 70) {
        createParticle()
      }
    }, 500)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div 
      ref={particleRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.08), transparent 70%)'
      }}
    >
      <style>
        {`
          @keyframes float {
            0% {
              transform: translate(0, 0) scale(1);
              opacity: 0;
            }
            5% {
              opacity: 0.7;
            }
            95% {
              opacity: 0.7;
            }
            100% {
              transform: translate(${Math.random() > 0.5 ? '+' : '-'}${Math.random() * 100}px, ${Math.random() > 0.5 ? '+' : '-'}${Math.random() * 100}px) scale(0);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  )
}

// Animated card component
const AnimatedCard = ({ 
  icon: Icon, 
  delay = 0 
}: { 
  icon: React.ElementType, 
  delay?: number 
}) => {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        setClicked(true);
        setTimeout(() => setClicked(false), 1000);
      }}
    >
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-800 shadow-xl ring-1 ring-white/10 relative">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
          animate={{ 
            opacity: hovered ? 1 : 0,
            background: clicked ? [
              "linear-gradient(to bottom right, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3))",
              "linear-gradient(to bottom right, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))"
            ] : "linear-gradient(to bottom right, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))"
          }}
          transition={{ 
            opacity: { duration: 0.3 },
            background: { duration: 0.8, ease: "easeOut" }
          }}
        />
        <motion.div 
          className="h-full flex items-center justify-center"
          animate={{ 
            scale: clicked ? [1, 1.2, 1] : (hovered ? 1.05 : 1),
            rotate: clicked ? [0, 10, -10, 0] : (hovered ? 5 : 0)
          }}
          transition={{ 
            type: clicked ? "spring" : "tween", 
            stiffness: 300,
            duration: clicked ? 0.8 : 0.3
          }}
        >
          <Icon className="h-16 w-16 sm:h-20 sm:w-20 text-indigo-400" />
          
          <AnimatePresence>
            {clicked && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-full h-full bg-indigo-500/20 rounded-full" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const { scrollYProgress } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.2], [0, 100])
  const contentScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])
  const [visibleFeatures, setVisibleFeatures] = useState(features.length)
  
  useEffect(() => {
    // No need for timeout since we're showing all features immediately
    setVisibleFeatures(features.length);
  }, []);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Faster stagger
        delayChildren: 0.1  // Reduced delay
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 } // Faster animation
    }
  };
  
  return (
    <div className="relative isolate">
      {/* Hero section */}
      <div className="relative isolate min-h-[80vh] flex items-center -z-10" ref={heroRef}>
        <Particles />
        <CircuitAnimation />
        
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-500 to-purple-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        
        <div className="overflow-hidden w-full">
          <motion.div 
            className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8 lg:pt-20 relative z-10"
            style={{ 
              opacity: contentOpacity, 
              y: contentY,
              scale: contentScale
            }}
          >
            <div className="mx-auto max-w-2xl gap-x-8 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
              <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-6 px-2 py-1 inline-flex items-center space-x-2 rounded-full bg-indigo-900/30 border border-indigo-800"
                  >
                    <motion.span 
                      animate={{ 
                        scale: [1, 1.5, 1],
                        backgroundColor: [
                          "rgb(99 102 241)",
                          "rgb(168 85 247)",
                          "rgb(99 102 241)"
                        ]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 3, 
                        ease: "easeInOut" 
                      }}
                      className="inline-block h-2 w-2 rounded-full bg-indigo-500"
                    ></motion.span>
                    <span className="text-xs font-medium text-indigo-400">DMA Operations Simplified</span>
                  </motion.div>
                  
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    <motion.h1 
                      className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: 0.6 }
                        }
                      }}
                    >
                      <span className="block">All-in-One Web-Based</span>
                      <motion.span 
                        className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        style={{ backgroundSize: '200% 200%' }}
                      >
                        DMA Utility Platform
                      </motion.span>
                    </motion.h1>
                    <motion.p 
                      className="mt-6 text-lg leading-8 text-gray-300"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: 0.6, delay: 0.2 }
                        }
                      }}
                    >
                      DMA Toolkit simplifies and automates the entire workflow of working with Direct Memory Access (DMA) setups — 
                      from device flashing to speed testing. It provides users with a clean, intuitive UI while offering powerful 
                      backend and agent-driven features.
                    </motion.p>
                    <motion.div 
                      className="mt-10 flex items-center gap-x-6"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: 0.6, delay: 0.4 }
                        }
                      }}
                    >
                      <Link
                        to="/setup"
                        className="group relative overflow-hidden rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        <span className="absolute -top-10 -left-10 h-20 w-20 rounded-full bg-white/20 transition-all duration-300 group-hover:scale-[12]"></span>
                        <span className="relative z-10">Setup Wizard</span>
                      </Link>
                      <Link 
                        to="/tools" 
                        className="group flex items-center text-sm font-semibold leading-6 text-white"
                      >
                        View Tools 
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5, repeatType: "loop", ease: "easeInOut" }}
                          className="ml-1"
                        >
                          <ArrowRightIcon className="h-4 w-4 inline-block" />
                        </motion.span>
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
              <motion.div 
                className="mt-10 sm:mt-12 lg:mt-0 mx-auto max-w-xs sm:max-w-md lg:mx-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <AnimatedCard icon={CpuChipIcon} delay={0.7} />
                  <AnimatedCard icon={ServerIcon} delay={0.8} />
                  <div className="col-span-2">
                    <AnimatedCard icon={ChartBarIcon} delay={0.9} />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Feature section */}
      <div className="relative z-10 py-10">
        <div className="absolute inset-0 bg-gray-900/90"></div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                All the tools you need
              </h2>
              <div className="mt-2 flex justify-center">
                <motion.div 
                  className="h-1 w-24 bg-indigo-500 rounded-full" 
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
            <motion.p 
              className="mt-6 text-lg leading-8 text-gray-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Centralize every DMA-related action through a browser-based interface, 
              supported by a lightweight local companion agent for hardware-level tasks.
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className="mx-auto mt-12 max-w-7xl px-4 sm:mt-16 sm:px-6 md:mt-20 lg:px-8 relative z-20"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.dl 
            className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12"
          >
            {features.slice(0, visibleFeatures).map((feature) => (
              <motion.div 
                key={feature.name}
                variants={item}
                className="group relative rounded-lg p-6 transition-all duration-300 hover:bg-gray-800"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.5)"
                }}
              >
                <Link to={feature.href} className="block">
                  <div className="flex items-center">
                    <motion.div 
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/10 group-hover:bg-indigo-600/20 transition-colors duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ type: "spring", stiffness: 100, damping: 10 }}
                    >
                      <feature.icon className="h-6 w-6 text-indigo-400" aria-hidden="true" />
                    </motion.div>
                    <h3 className="ml-3 text-lg font-semibold text-white">
                      {feature.name}
                    </h3>
                  </div>
                  <p className="mt-3 text-gray-400">{feature.description}</p>
                  <motion.div 
                    className="mt-4 flex items-center text-sm font-medium text-indigo-400"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span>Learn more</span>
                    <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </div>
  )
} 