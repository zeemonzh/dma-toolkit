import { Fragment, useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAgentStatus } from '../hooks/useAgentStatus'
import {
  HomeIcon,
  ServerIcon,
  CpuChipIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  Bars3Icon,
  DocumentTextIcon,
  Cog6ToothIcon,
  InformationCircleIcon,
  BookOpenIcon,
  BoltIcon,
  ComputerDesktopIcon,
  UsersIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline'

// Define the navigation item type
type NavigationItem = {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<any>;
  external?: boolean;
  shortcut?: string;
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/', icon: HomeIcon, shortcut: '1' },
  { name: 'Setup Wizard', href: '/setup', icon: Cog6ToothIcon, shortcut: '2' },
  { name: 'DMA ID Getter', href: '/id-getter', icon: CpuChipIcon, shortcut: '3' },
  { name: 'Speed Test', href: '/speed-test', icon: ChartBarIcon, shortcut: '4' },
  { name: 'Firmware Flasher', href: '/firmware', icon: ServerIcon, shortcut: '5' },
  { name: 'System Checkup', href: '/checkup', icon: WrenchScrewdriverIcon, shortcut: '6' },
  { name: 'Logs Viewer', href: '/logs', icon: DocumentTextIcon, shortcut: '7' },
  { name: 'Forum', href: '/forum', icon: ChatBubbleLeftRightIcon, shortcut: '8' },
  { name: 'DMA Info', href: '/dma-info', icon: BookOpenIcon, shortcut: '9' },
  { name: 'About', href: '/about', icon: InformationCircleIcon, shortcut: '0' },
]

// Quick Actions Section
const quickActions = [
  { name: 'Quick Test', icon: BoltIcon, action: () => console.log('Quick Test') },
  { name: 'Check Device', icon: ComputerDesktopIcon, action: () => console.log('Check Device') },
  { name: 'Clear Cache', icon: XMarkIcon, action: () => console.log('Clear Cache') },
]

// Recent Activities
const recentActivities = [
  { name: 'Speed Test Run', time: '2 min ago', icon: ChartBarIcon },
  { name: 'Firmware Update', time: '1 hour ago', icon: ServerIcon },
  { name: 'System Check', time: '3 hours ago', icon: WrenchScrewdriverIcon },
]

// Resource Monitor Component
const ResourceMonitor = () => {
  const [cpuUsage] = useState(45)
  const [memoryUsage] = useState(60)
  
  return (
    <div className="space-y-3">
      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>CPU Usage</span>
          <span>{cpuUsage}%</span>
        </div>
        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-red-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${cpuUsage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Memory Usage</span>
          <span>{memoryUsage}%</span>
        </div>
        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-red-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${memoryUsage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  )
}

// Animated logo component
const AnimatedLogo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative w-8 h-8">
        <motion.div
          className="absolute inset-0 rounded-md border-2 border-red-500"
          animate={{
            rotate: [0, 90, 180, 270, 360],
            borderColor: [
              'rgba(233, 33, 61, 0.8)',
              'rgba(255, 107, 107, 0.8)',
              'rgba(233, 33, 61, 0.8)',
            ],
          }}
          transition={{
            duration: 8,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
        <motion.div
          className="absolute inset-2 bg-red-500 rounded-sm"
          animate={{
            rotate: [0, -90, -180, -270, -360],
            backgroundColor: [
              'rgba(233, 33, 61, 0.8)',
              'rgba(255, 107, 107, 0.8)',
              'rgba(233, 33, 61, 0.8)',
            ],
          }}
          transition={{
            duration: 8,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      </div>
      <motion.h1 
        className="text-white text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-400"
        animate={{
          backgroundPosition: ['0% center', '100% center', '0% center']
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          repeatType: "mirror" 
        }}
        style={{ backgroundSize: '200% auto' }}
      >
        DMA Toolkit
      </motion.h1>
    </div>
  );
};

// Discord section component
const DiscordCard = () => (
  <motion.a
    href="https://discord.com/invite/suspectcheats"
    target="_blank"
    rel="noopener noreferrer"
    className="block rounded-lg bg-red-500/10 p-4 hover:bg-red-500/20 transition-colors"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20">
          <UsersIcon className="h-6 w-6 text-red-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-red-400">Join Community</h3>
          <p className="text-xs text-gray-400">Get help & share setups</p>
        </div>
      </div>
      <ArrowTopRightOnSquareIcon className="h-5 w-5 text-red-400" />
    </div>
  </motion.a>
);

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const agentStatus = useAgentStatus()
  const [showExtras, setShowExtras] = useState(true) // For larger screens

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only respond to number keys when not typing in an input field
      if (
        event.target instanceof HTMLElement && 
        (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.isContentEditable)
      ) {
        return;
      }

      // Find navigation item that matches the pressed key
      const key = event.key;
      const navItem = navigation.find(item => item.shortcut === key);
      
      if (navItem && !navItem.external) {
        navigate(navItem.href);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Animation variants
  const sidebarVariants = {
    hidden: { 
      opacity: 0,
      x: -20
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  // Update the agent status section in the sidebar
  const renderAgentStatus = () => (
    <motion.div 
      className="rounded-md bg-gray-800/50 p-3 text-xs text-gray-400"
      whileHover={{ scale: 1.02, backgroundColor: "rgba(30, 41, 59, 0.7)" }}
    >
      <div className="flex items-center">
        <motion.div 
          className={`h-2 w-2 rounded-full ${agentStatus.isConnected ? 'bg-green-500' : 'bg-red-500'} mr-2`}
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [1, 0.7, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <span>{agentStatus.message}</span>
      </div>
      {agentStatus.lastError && (
        <div className="mt-1 text-red-400 text-xs">
          {agentStatus.lastError}
        </div>
      )}
    </motion.div>
  )

  // Update the agent status in the top navbar
  const renderTopbarStatus = () => (
    <div className="hidden sm:flex sm:items-center sm:gap-2">
      <motion.span 
        className={`inline-flex h-2 w-2 rounded-full ${agentStatus.isConnected ? 'bg-green-500' : 'bg-red-500'}`}
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [1, 0.7, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <span className="text-xs text-gray-400">{agentStatus.message}</span>
    </div>
  )

  const renderSidebarExtras = () => (
    <motion.div 
      className="space-y-4 pt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {/* Separator */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-700/50"></div>
        </div>
        <div className="relative flex justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-full bg-gray-800/50 px-3 py-1.5 text-xs font-medium text-gray-400 shadow-sm hover:bg-gray-800 transition-colors"
            onClick={() => setShowExtras(!showExtras)}
          >
            <motion.span
              animate={{ rotate: showExtras ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ⌄
            </motion.span>
            {showExtras ? 'Hide' : 'Show'} Extras
          </button>
        </div>
      </div>

      {/* Collapsible Extras */}
      <AnimatePresence>
        {showExtras && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 overflow-hidden"
          >
            {/* Resource Monitor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-lg bg-gray-800/50 p-4"
            >
              <h3 className="text-sm font-semibold text-gray-300 mb-4">System Resources</h3>
              <ResourceMonitor />
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-lg bg-gray-800/50 p-4"
            >
              <h3 className="text-sm font-semibold text-gray-300 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-3 gap-2">
                {quickActions.map((action) => (
                  <motion.button
                    key={action.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={action.action}
                    className="flex flex-col items-center p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
                  >
                    <action.icon className="h-5 w-5 text-red-400" />
                    <span className="text-xs text-gray-300 mt-1">{action.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-lg bg-gray-800/50 p-4"
            >
              <h3 className="text-sm font-semibold text-gray-300 mb-3">Recent Activities</h3>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <activity.icon className="h-5 w-5 text-red-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-300 truncate">{activity.name}</p>
                      <p className="text-gray-500 text-xs">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Discord Community */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <DiscordCard />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <>
      <div className="min-h-screen bg-gray-900">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#14151a] px-6 pb-4 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <AnimatedLogo />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => {
                              const isActive = location.pathname === item.href || 
                                (item.href !== '/' && location.pathname.startsWith(item.href))
                              return (
                                <li key={item.name}>
                                  {item.external ? (
                                    <a
                                      href={item.href}
                                      className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-all duration-200 text-gray-300 hover:bg-gray-700/60 hover:text-white`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <item.icon 
                                        className={`h-6 w-6 shrink-0 transition-colors duration-200 group-hover:text-indigo-400`} 
                                        aria-hidden="true" 
                                      />
                                      {item.name}
                                      <svg className="h-3 w-3 ml-auto self-center text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                    </a>
                                  ) : (
                                    <Link
                                      to={item.href}
                                      className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-all duration-200 ${
                                        isActive 
                                          ? 'bg-[#e9213d]/30 text-white' 
                                          : 'text-gray-300 hover:bg-[#14151a]/60 hover:text-white'
                                      }`}
                                      onClick={() => setSidebarOpen(false)}
                                    >
                                      <motion.div 
                                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                        transition={{ duration: 0.5 }}
                                      >
                                        <item.icon 
                                          className={`h-6 w-6 shrink-0 transition-colors duration-200 ${
                                            isActive ? 'text-[#e9213d]' : 'group-hover:text-[#e9213d]'
                                          }`} 
                                          aria-hidden="true" 
                                        />
                                      </motion.div>
                                      <span className="flex-1">{item.name}</span>
                                      {isActive && (
                                        <motion.span 
                                          layoutId="activeIndicator"
                                          className="absolute right-2 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[#e9213d]"
                                        ></motion.span>
                                      )}
                                    </Link>
                                  )}
                                </li>
                              )
                            })}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <motion.div 
            className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#14151a] px-6 pb-4 shadow-xl"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex h-16 shrink-0 items-center">
              <AnimatedLogo />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                {/* Main Navigation */}
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => {
                      const isActive = location.pathname === item.href || 
                        (item.href !== '/' && location.pathname.startsWith(item.href))
                      
                      return (
                        <motion.li 
                          key={item.name}
                          variants={itemVariants}
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          {item.external ? (
                            <a
                              href={item.href}
                              className={`relative group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-all duration-200 text-gray-300 hover:bg-gray-700/60 hover:text-white`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <motion.div 
                                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                              >
                                <item.icon 
                                  className={`h-6 w-6 shrink-0 transition-colors duration-200 group-hover:text-indigo-400`} 
                                  aria-hidden="true" 
                                />
                              </motion.div>
                              {item.name}
                              <svg className="h-3 w-3 ml-auto self-center text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          ) : (
                            <Link
                              to={item.href}
                              className={`relative group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-all duration-200 ${
                                isActive 
                                  ? 'bg-[#e9213d]/30 text-white' 
                                  : 'text-gray-300 hover:bg-[#14151a]/60 hover:text-white'
                              }`}
                            >
                              <motion.div 
                                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                              >
                                <item.icon 
                                  className={`h-6 w-6 shrink-0 transition-colors duration-200 ${
                                    isActive ? 'text-[#e9213d]' : 'group-hover:text-[#e9213d]'
                                  }`} 
                                  aria-hidden="true" 
                                />
                              </motion.div>
                              <span className="flex-1">{item.name}</span>
                              {isActive && (
                                <motion.span 
                                  layoutId="activeIndicator"
                                  className="absolute right-2 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[#e9213d]"
                                ></motion.span>
                              )}
                            </Link>
                          )}
                        </motion.li>
                      )
                    })}
                  </ul>
                </li>

                {/* Extras Section */}
                <li className="mt-auto">
                  {renderSidebarExtras()}
                  {/* Agent Status */}
                  <div className="mt-4">
                    {renderAgentStatus()}
                  </div>
                </li>
              </ul>
            </nav>
          </motion.div>
        </div>

        <div className="lg:pl-72">
          <motion.div 
            className={`sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 transition-all duration-300 ${
              scrolled ? 'bg-[#14151a]/80 backdrop-blur-sm' : 'bg-[#14151a]'
            }`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button type="button" className="-m-2.5 p-2.5 text-white lg:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex-1 flex items-center">
                <motion.h2 
                  className="text-white text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-400 hidden sm:block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  DMA Toolkit
                </motion.h2>
                <div className="ml-auto flex items-center gap-x-4">
                  {renderTopbarStatus()}
                  <div className="h-6 w-px bg-gray-700 hidden sm:block"></div>
                  <motion.a 
                    href="#" 
                    className="text-sm font-medium text-white hover:text-red-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Documentation
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <AnimatePresence mode="sync">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </>
  )
} 