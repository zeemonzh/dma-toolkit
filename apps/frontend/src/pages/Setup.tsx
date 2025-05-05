import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ArrowDownTrayIcon, 
  CheckCircleIcon, 
  ArrowRightCircleIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

const steps = [
  { id: 'step1', name: 'Download Agent', status: 'current' },
  { id: 'step2', name: 'Install Agent', status: 'upcoming' },
  { id: 'step3', name: 'Connect Agent', status: 'upcoming' },
  { id: 'step4', name: 'Start Using DMA Toolkit', status: 'upcoming' },
]

export default function Setup() {
  const [currentStep, setCurrentStep] = useState(0)
  const [agentConnected, setAgentConnected] = useState(false)
  const [downloadComplete, setDownloadComplete] = useState(false)
  const [installComplete, setInstallComplete] = useState(false)

  const handleDownload = () => {
    // In a real app, this would trigger a download
    setTimeout(() => {
      setDownloadComplete(true)
    }, 1500)
  }

  const handleInstall = () => {
    // In a real app, this would check if the agent is installed
    setTimeout(() => {
      setInstallComplete(true)
      setCurrentStep(2)
    }, 1500)
  }

  const handleConnect = () => {
    // In a real app, this would check if the agent is connected
    setTimeout(() => {
      setAgentConnected(true)
      setCurrentStep(3)
    }, 1500)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            DMA Toolkit Setup Wizard
          </h1>
          <p className="mt-2 text-base text-gray-300">
            Complete these steps to get started with the DMA Toolkit.
          </p>
        </motion.div>

        <nav aria-label="Progress" className="mt-12">
          <ol role="list" className="divide-y divide-gray-700 rounded-md border border-gray-700 md:flex md:divide-y-0">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className="relative md:flex md:flex-1">
                {stepIdx < currentStep ? (
                  <Link to="#" className="group flex w-full items-center">
                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600">
                        <CheckCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                      <span className="ml-4 text-sm font-medium text-white">{step.name}</span>
                    </span>
                  </Link>
                ) : stepIdx === currentStep ? (
                  <Link to="#" className="flex items-center px-6 py-4 text-sm font-medium" aria-current="step">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-500">
                      <span className="text-indigo-500">{stepIdx + 1}</span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-indigo-500">{step.name}</span>
                  </Link>
                ) : (
                  <Link to="#" className="group flex items-center">
                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-500">
                        <span className="text-gray-500">{stepIdx + 1}</span>
                      </span>
                      <span className="ml-4 text-sm font-medium text-gray-500">{step.name}</span>
                    </span>
                  </Link>
                )}

                {stepIdx !== steps.length - 1 ? (
                  <>
                    <div className="absolute right-0 top-0 hidden h-full w-5 md:block" aria-hidden="true">
                      <svg
                        className="h-full w-full text-gray-700"
                        viewBox="0 0 22 80"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 -2L20 40L0 82"
                          vectorEffect="non-scaling-stroke"
                          stroke="currentcolor"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </>
                ) : null}
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 rounded-lg bg-gray-800 p-8 shadow-lg">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-xl font-semibold text-white">Step 1: Download the Local Agent</h2>
                <p className="mt-2 text-gray-300">
                  The DMA Toolkit requires a local agent to interact with your hardware. Download the agent for your operating system.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <button
                    onClick={handleDownload}
                    className={`flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
                      !downloadComplete
                        ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        : 'bg-green-600 text-white'
                    }`}
                    disabled={downloadComplete}
                  >
                    {downloadComplete ? (
                      <>
                        <CheckCircleIcon className="mr-2 h-5 w-5" />
                        Downloaded
                      </>
                    ) : (
                      <>
                        <ArrowDownTrayIcon className="mr-2 h-5 w-5" />
                        Download for Windows
                      </>
                    )}
                  </button>
                  
                  <button
                    className="flex items-center justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500"
                  >
                    <ArrowDownTrayIcon className="mr-2 h-5 w-5" />
                    Download for macOS
                  </button>
                </div>
                <div className="mt-6 flex">
                  <button
                    onClick={() => {
                      if (downloadComplete) setCurrentStep(1)
                    }}
                    className={`ml-auto flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
                      downloadComplete
                        ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!downloadComplete}
                  >
                    Next Step
                    <ChevronRightIcon className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-xl font-semibold text-white">Step 2: Install the Agent</h2>
                <p className="mt-2 text-gray-300">
                  Install the agent on your system by running the installer you just downloaded.
                </p>
                <div className="mt-4 rounded-md bg-gray-900 p-4">
                  <pre className="text-sm text-gray-300">
                    <code>
                      1. Double-click the downloaded installer<br />
                      2. Follow the on-screen instructions<br />
                      3. Allow the agent to run on your system when prompted
                    </code>
                  </pre>
                </div>
                <div className="mt-6 flex">
                  <button
                    onClick={() => setCurrentStep(0)}
                    className="flex items-center rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleInstall}
                    className={`ml-auto flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
                      !installComplete
                        ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                        : 'bg-green-600 text-white'
                    }`}
                  >
                    {installComplete ? (
                      <>
                        <CheckCircleIcon className="mr-2 h-5 w-5" />
                        Installed
                      </>
                    ) : (
                      'I have installed the agent'
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-xl font-semibold text-white">Step 3: Connect the Agent</h2>
                <p className="mt-2 text-gray-300">
                  Connect the DMA Toolkit to your local agent. Make sure the agent is running in the background.
                </p>
                <div className="mt-6 flex flex-col items-center">
                  <div className="relative h-16 w-16">
                    {agentConnected ? (
                      <CheckCircleIcon className="h-16 w-16 text-green-500" />
                    ) : (
                      <svg
                        className="h-16 w-16 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                  </div>
                  <span className="mt-2 text-center text-gray-300">
                    {agentConnected ? 'Agent connected successfully!' : 'Connecting to agent...'}
                  </span>
                  <button
                    onClick={handleConnect}
                    className={`mt-6 flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 ${
                      agentConnected ? 'hidden' : ''
                    }`}
                  >
                    Connect Agent
                  </button>
                  {agentConnected && (
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="mt-6 flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                      Next Step
                      <ChevronRightIcon className="ml-2 h-5 w-5" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
                <h2 className="mt-4 text-xl font-semibold text-white">Setup Complete!</h2>
                <p className="mt-2 text-gray-300">
                  You have successfully set up the DMA Toolkit. You can now start using all the tools.
                </p>
                <div className="mt-6">
                  <Link
                    to="/"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  >
                    <ArrowRightCircleIcon className="mr-2 h-5 w-5" />
                    Go to Dashboard
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
} 