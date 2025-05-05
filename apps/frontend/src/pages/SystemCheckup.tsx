import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircleIcon,
  XCircleIcon,
  PlayIcon,
  ArrowPathIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

interface CheckItem {
  id: string
  name: string
  description: string
  status: 'idle' | 'checking' | 'success' | 'error'
  details: string
}

export default function SystemCheckup() {
  const [isRunning, setIsRunning] = useState(false)
  const [checkItems, setCheckItems] = useState<CheckItem[]>([
    {
      id: 'agent',
      name: 'DMA Agent Connection',
      description: 'Check if the local DMA agent is running and connected',
      status: 'idle',
      details: ''
    },
    {
      id: 'device',
      name: 'DMA Device Detection',
      description: 'Check if DMA hardware is detected',
      status: 'idle',
      details: ''
    },
    {
      id: 'driver',
      name: 'Driver Status',
      description: 'Verify that required drivers are installed and working',
      status: 'idle',
      details: ''
    },
    {
      id: 'firmware',
      name: 'Firmware Version',
      description: 'Check if firmware is up to date',
      status: 'idle',
      details: ''
    },
    {
      id: 'permissions',
      name: 'System Permissions',
      description: 'Verify that the agent has the necessary system permissions',
      status: 'idle',
      details: ''
    }
  ])

  const runSystemCheck = () => {
    setIsRunning(true)
    
    // Reset all check items
    setCheckItems(
      checkItems.map(item => ({
        ...item,
        status: 'checking',
        details: ''
      }))
    )
    
    // Simulate check process for each item with different timing and outcomes
    setTimeout(() => {
      setCheckItems(prev => 
        prev.map(item => 
          item.id === 'agent' ? {
            ...item,
            status: 'success',
            details: 'Agent is running and connected (v1.2.3)'
          } : item
        )
      )
      
      setTimeout(() => {
        setCheckItems(prev => 
          prev.map(item => 
            item.id === 'device' ? {
              ...item,
              status: 'success',
              details: 'Found 2 DMA devices (FTDI FT601, PCIe FPGA Card)'
            } : item
          )
        )
        
        setTimeout(() => {
          setCheckItems(prev => 
            prev.map(item => 
              item.id === 'driver' ? {
                ...item,
                status: 'success',
                details: 'All required drivers are installed and running'
              } : item
            )
          )
          
          setTimeout(() => {
            setCheckItems(prev => 
              prev.map(item => 
                item.id === 'firmware' ? {
                  ...item,
                  status: 'error',
                  details: 'PCIe FPGA Card firmware is outdated (current: v3.5.2, latest: v4.0.1)'
                } : item
              )
            )
            
            setTimeout(() => {
              setCheckItems(prev => 
                prev.map(item => 
                  item.id === 'permissions' ? {
                    ...item,
                    status: Math.random() > 0.5 ? 'success' : 'error',
                    details: Math.random() > 0.5 
                      ? 'Agent has all required permissions' 
                      : 'Agent lacks direct memory access permissions. Run as administrator.'
                  } : item
                )
              )
              
              setIsRunning(false)
            }, 800)
          }, 600)
        }, 500)
      }, 700)
    }, 1000)
  }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
      case 'error':
        return <XCircleIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
      case 'checking':
        return <ArrowPathIcon className="h-6 w-6 text-indigo-500 animate-spin" aria-hidden="true" />
      default:
        return <InformationCircleIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
    }
  }
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-900/20'
      case 'error':
        return 'bg-red-900/20'
      case 'checking':
        return 'bg-indigo-900/20'
      default:
        return 'bg-gray-800'
    }
  }

  const allChecksComplete = checkItems.every(item => item.status === 'success' || item.status === 'error')
  const hasErrors = checkItems.some(item => item.status === 'error')
  
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold text-white">System Checkup</h1>
        <p className="mt-2 text-gray-300">
          Verify that your DMA setup is working correctly.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <motion.div
            className="overflow-hidden rounded-lg bg-gray-800 shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Diagnostics</h2>
                <button
                  type="button"
                  className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${
                    isRunning
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-500'
                  }`}
                  onClick={runSystemCheck}
                  disabled={isRunning}
                >
                  {isRunning ? (
                    <>
                      <ArrowPathIcon className="mr-1.5 h-5 w-5 animate-spin" />
                      Running checks...
                    </>
                  ) : (
                    <>
                      <PlayIcon className="mr-1.5 h-5 w-5" />
                      Run System Check
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-4">
                {checkItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className={`rounded-lg p-4 ${getStatusClass(item.status)}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex">
                      <div className="mr-4 flex-shrink-0">
                        {getStatusIcon(item.status)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-white">
                          {item.name}
                        </h3>
                        <div className="mt-1 text-sm text-gray-300">
                          <p>{item.description}</p>
                          {item.details && (
                            <p className={`mt-2 ${
                              item.status === 'error' ? 'text-red-400' : 
                              item.status === 'success' ? 'text-green-400' : 
                              'text-gray-400'
                            }`}>
                              {item.details}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {allChecksComplete && (
                <div className={`mt-6 rounded-lg p-4 ${hasErrors ? 'bg-red-900/20' : 'bg-green-900/20'}`}>
                  <div className="flex">
                    <div className="mr-4 flex-shrink-0">
                      {hasErrors ? (
                        <XCircleIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
                      ) : (
                        <CheckCircleIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white">
                        {hasErrors ? 'System Check Failed' : 'System Check Passed'}
                      </h3>
                      <p className="mt-1 text-sm text-gray-300">
                        {hasErrors
                          ? 'One or more checks failed. Review the errors above and take corrective action.'
                          : 'All system checks passed. Your DMA setup is working correctly.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <div>
          <motion.div
            className="overflow-hidden rounded-lg bg-gray-800 shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-6">
              <h2 className="text-lg font-medium text-white">System Requirements</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-white">Hardware</h3>
                  <ul className="mt-2 list-disc pl-5 text-sm text-gray-300">
                    <li>Compatible DMA device</li>
                    <li>USB 3.0 or PCIe slot (device dependent)</li>
                    <li>Minimum 4GB RAM</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Software</h3>
                  <ul className="mt-2 list-disc pl-5 text-sm text-gray-300">
                    <li>DMA Agent v1.0 or higher</li>
                    <li>Device-specific drivers</li>
                    <li>Administrator privileges</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-6 overflow-hidden rounded-lg bg-gray-800 shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="p-6">
              <h2 className="text-lg font-medium text-white">Troubleshooting</h2>
              <div className="mt-4 space-y-4 text-sm text-gray-300">
                <div>
                  <h3 className="text-sm font-medium text-white">Device Not Detected</h3>
                  <ul className="mt-2 list-disc pl-5">
                    <li>Ensure device is properly connected</li>
                    <li>Check device power status</li>
                    <li>Reinstall device drivers</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Permission Issues</h3>
                  <ul className="mt-2 list-disc pl-5">
                    <li>Run the DMA agent as administrator</li>
                    <li>Check system security settings</li>
                    <li>Disable secure boot (if necessary)</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 