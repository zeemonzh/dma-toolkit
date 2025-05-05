import { Fragment, useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
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
  BookOpenIcon
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

// Animated logo component
const AnimatedLogo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative w-8 h-8">
        <motion.div
          className="absolute inset-0 rounded-md border-2 border-indigo-500"
          animate={{
            rotate: [0, 90, 180, 270, 360],
            borderColor: [
              'rgba(99, 102, 241, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(99, 102, 241, 0.8)',
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
          className="absolute inset-2 bg-indigo-500 rounded-sm"
          animate={{
            rotate: [0, -90, -180, -270, -360],
            backgroundColor: [
              'rgba(99, 102, 241, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(99, 102, 241, 0.8)',
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
        className="text-white text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
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

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [statusPulse, setStatusPulse] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Status indicator pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusPulse(prev => !prev);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

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
                  
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-gray-800 to-gray-900 px-6 pb-4 ring-1 ring-white/10">
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
                                          ? 'bg-indigo-600/30 text-white' 
                                          : 'text-gray-300 hover:bg-gray-700/60 hover:text-white'
                                      }`}
                                      onClick={() => setSidebarOpen(false)}
                                    >
                                      <item.icon 
                                        className={`h-6 w-6 shrink-0 transition-colors duration-200 ${
                                          isActive ? 'text-indigo-400' : 'group-hover:text-indigo-400'
                                        }`} 
                                        aria-hidden="true" 
                                      />
                                      <span className="flex-1">{item.name}</span>
                                      {isActive && (
                                        <span className="ml-auto self-center h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
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
            className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-gray-800 to-gray-900 px-6 pb-4 shadow-xl"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
          >
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
                                  ? 'bg-indigo-600/30 text-white' 
                                  : 'text-gray-300 hover:bg-gray-700/60 hover:text-white'
                              }`}
                            >
                              <motion.div 
                                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                              >
                                <item.icon 
                                  className={`h-6 w-6 shrink-0 transition-colors duration-200 ${
                                    isActive ? 'text-indigo-400' : 'group-hover:text-indigo-400'
                                  }`} 
                                  aria-hidden="true" 
                                />
                              </motion.div>
                              <span className="flex-1">{item.name}</span>
                              {isActive && (
                                <motion.span 
                                  layoutId="activeIndicator"
                                  className="absolute right-2 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-indigo-400"
                                ></motion.span>
                              )}
                            </Link>
                          )}
                        </motion.li>
                      )
                    })}
                  </ul>
                </li>
                <li className="mt-auto">
                  <motion.div 
                    className="rounded-md bg-gray-800/50 p-3 text-xs text-gray-400"
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(30, 41, 59, 0.7)" }}
                  >
                    <div className="flex items-center">
                      <motion.div 
                        className="h-2 w-2 rounded-full bg-green-500 mr-2"
                        animate={{ 
                          scale: statusPulse ? 1.5 : 1,
                          opacity: statusPulse ? 0.7 : 1
                        }}
                        transition={{ duration: 1 }}
                      />
                      <span>Agent connected</span>
                    </div>
                  </motion.div>
                </li>
              </ul>
            </nav>
          </motion.div>
        </div>

        <div className="lg:pl-72">
          <motion.div 
            className={`sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 transition-all duration-300 ${
              scrolled ? 'bg-gray-900/80 backdrop-blur-sm' : 'bg-gray-900'
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
                  className="text-white text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 hidden sm:block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  DMA Toolkit
                </motion.h2>
                <div className="ml-auto flex items-center gap-x-4">
                  <div className="hidden sm:flex sm:items-center sm:gap-2">
                    <motion.span 
                      className="inline-flex h-2 w-2 rounded-full bg-green-500"
                      animate={{ 
                        scale: statusPulse ? 1.5 : 1,
                        backgroundColor: statusPulse ? '#22c55e' : '#10b981'
                      }}
                      transition={{ duration: 1 }}
                    />
                    <span className="text-xs text-gray-400">Agent active</span>
                  </div>
                  <div className="h-6 w-px bg-gray-700 hidden sm:block"></div>
                  <motion.a 
                    href="#" 
                    className="text-sm font-medium text-white hover:text-indigo-400 transition-colors"
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