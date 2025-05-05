import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowPathIcon, PlayIcon, StopIcon } from '@heroicons/react/24/outline'

type TestResult = {
  timestamp: string
  readSpeed: number
  writeSpeed: number
  latency: number
}

export default function SpeedTest() {
  const [isRunning, setIsRunning] = useState(false)
  const [readSpeed, setReadSpeed] = useState(0)
  const [writeSpeed, setWriteSpeed] = useState(0)
  const [latency, setLatency] = useState(0)
  const [progress, setProgress] = useState(0)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [selectedDevice, setSelectedDevice] = useState('ftdi-1234-5678')
  
  const devices = [
    { id: 'ftdi-1234-5678', name: 'FTDI FT601' },
    { id: 'usb-9876-5432', name: 'USB 3.0 DMA Adapter' },
    { id: 'pcie-abcd-ef01', name: 'PCIe FPGA Card' },
  ]
  
  const timer = useRef<number | null>(null)
  
  useEffect(() => {
    return () => {
      if (timer.current) {
        clearInterval(timer.current)
      }
    }
  }, [])
  
  const startTest = () => {
    setIsRunning(true)
    setProgress(0)
    setReadSpeed(0)
    setWriteSpeed(0)
    setLatency(0)
    
    // Simulate increasing speed test progress
    timer.current = window.setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1
        if (newProgress >= 100) {
          if (timer.current) clearInterval(timer.current)
          endTest()
          return 100
        }
        
        // Simulate fluctuating speeds during test
        const randomFactor = 0.9 + Math.random() * 0.2 // 0.9 to 1.1
        const progressFactor = newProgress / 100
        
        const deviceSpeedMultiplier = 
          selectedDevice === 'ftdi-1234-5678' ? 1 :
          selectedDevice === 'usb-9876-5432' ? 1.5 :
          selectedDevice === 'pcie-abcd-ef01' ? 4 : 1
        
        // Generate realistic speeds based on device type
        setReadSpeed(Math.floor(100 * progressFactor * randomFactor * deviceSpeedMultiplier))
        setWriteSpeed(Math.floor(80 * progressFactor * randomFactor * deviceSpeedMultiplier))
        setLatency(Math.floor(50 - 40 * progressFactor * randomFactor))
        
        return newProgress
      })
    }, 100)
  }
  
  const endTest = () => {
    setIsRunning(false)
    
    // Add test result to history
    const newResult: TestResult = {
      timestamp: new Date().toLocaleTimeString(),
      readSpeed,
      writeSpeed,
      latency,
    }
    
    setTestResults([newResult, ...testResults])
  }
  
  const cancelTest = () => {
    if (timer.current) {
      clearInterval(timer.current)
    }
    setIsRunning(false)
  }
  
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold text-white">DMA Speed Test</h1>
        <p className="mt-2 text-gray-300">
          Measure the throughput performance of your DMA device.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="overflow-hidden rounded-lg bg-gray-800 shadow">
            <div className="p-6">
              <div className="mb-6">
                <label htmlFor="device-selector" className="block text-sm font-medium text-white">
                  Select Device
                </label>
                <select
                  id="device-selector"
                  className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 py-2 pl-3 pr-10 text-white focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={selectedDevice}
                  onChange={(e) => setSelectedDevice(e.target.value)}
                  disabled={isRunning}
                >
                  {devices.map((device) => (
                    <option key={device.id} value={device.id}>
                      {device.name} ({device.id})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Speed Test Progress</h3>
                  <span className="text-sm text-gray-300">{progress}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-700">
                  <div
                    className="h-2 rounded-full bg-indigo-500"
                    style={{ width: `${progress}%`, transition: 'width 0.1s ease-in-out' }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-gray-700 p-4">
                  <div className="text-sm font-medium text-gray-300">Read Speed</div>
                  <div className="mt-1 flex items-baseline">
                    <div className="text-2xl font-semibold text-white">{readSpeed}</div>
                    <div className="ml-2 text-sm text-gray-400">MB/s</div>
                  </div>
                </div>
                
                <div className="rounded-lg bg-gray-700 p-4">
                  <div className="text-sm font-medium text-gray-300">Write Speed</div>
                  <div className="mt-1 flex items-baseline">
                    <div className="text-2xl font-semibold text-white">{writeSpeed}</div>
                    <div className="ml-2 text-sm text-gray-400">MB/s</div>
                  </div>
                </div>
                
                <div className="rounded-lg bg-gray-700 p-4">
                  <div className="text-sm font-medium text-gray-300">Latency</div>
                  <div className="mt-1 flex items-baseline">
                    <div className="text-2xl font-semibold text-white">{latency}</div>
                    <div className="ml-2 text-sm text-gray-400">ms</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex">
                {!isRunning ? (
                  <button
                    type="button"
                    onClick={startTest}
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <PlayIcon className="mr-1.5 h-5 w-5" />
                    Start Test
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={cancelTest}
                    className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    <StopIcon className="mr-1.5 h-5 w-5" />
                    Cancel Test
                  </button>
                )}
                
                <button
                  type="button"
                  className="ml-3 inline-flex items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
                  onClick={() => {
                    setTestResults([])
                  }}
                >
                  <ArrowPathIcon className="mr-1.5 h-5 w-5" />
                  Reset History
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="overflow-hidden rounded-lg bg-gray-800 shadow">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-white">Test History</h3>
              <div className="mt-4 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    {testResults.length === 0 ? (
                      <div className="text-center text-sm text-gray-400 py-4">
                        No test results yet
                      </div>
                    ) : (
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                          <tr>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                              Time
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                              Read
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                              Write
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                          {testResults.map((result, index) => (
                            <tr key={index}>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                {result.timestamp}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                {result.readSpeed} MB/s
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                {result.writeSpeed} MB/s
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 overflow-hidden rounded-lg bg-gray-800 shadow">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-white">Device Information</h3>
              <div className="mt-2 text-sm text-gray-300">
                <p>Testing the performance of your DMA device allows you to understand its real-world capabilities.</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
                  <li>Expected PCIe Gen3 x1: 500-800 MB/s</li>
                  <li>Expected USB 3.0: 200-300 MB/s</li>
                  <li>Expected FTDI FT601: 100-200 MB/s</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 