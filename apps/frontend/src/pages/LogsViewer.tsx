import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowPathIcon, 
  XMarkIcon, 
  FunnelIcon, 
  ArrowDownTrayIcon,
  ClockIcon, 
  ExclamationCircleIcon, 
  InformationCircleIcon
} from '@heroicons/react/24/outline'

type LogLevel = 'info' | 'warning' | 'error' | 'debug'

interface LogEntry {
  id: string
  timestamp: string
  level: LogLevel
  source: string
  message: string
}

export default function LogsViewer() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isLive, setIsLive] = useState(true)
  const [filter, setFilter] = useState<LogLevel | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  const logContainerRef = useRef<HTMLDivElement>(null)
  const logUpdateTimer = useRef<number | null>(null)
  
  useEffect(() => {
    // Populate initial logs
    const initialLogs: LogEntry[] = [
      {
        id: '1',
        timestamp: '2023-07-15 10:32:45',
        level: 'info',
        source: 'Agent',
        message: 'DMA agent started successfully'
      },
      {
        id: '2',
        timestamp: '2023-07-15 10:32:46',
        level: 'info',
        source: 'Agent',
        message: 'Scanning for DMA devices...'
      },
      {
        id: '3',
        timestamp: '2023-07-15 10:32:47',
        level: 'info',
        source: 'Device',
        message: 'Found DMA device: FTDI FT601 (ftdi-1234-5678)'
      },
      {
        id: '4',
        timestamp: '2023-07-15 10:32:48',
        level: 'info',
        source: 'Device',
        message: 'Found DMA device: PCIe FPGA Card (pcie-abcd-ef01)'
      },
      {
        id: '5',
        timestamp: '2023-07-15 10:32:50',
        level: 'warning',
        source: 'Device',
        message: 'PCIe FPGA Card firmware is outdated'
      },
      {
        id: '6',
        timestamp: '2023-07-15 10:33:01',
        level: 'error',
        source: 'System',
        message: 'Failed to access memory region 0x8A000000-0x8AFFFFFF'
      },
      {
        id: '7',
        timestamp: '2023-07-15 10:33:05',
        level: 'debug',
        source: 'Agent',
        message: 'Attempting to reconnect with elevated privileges'
      },
      {
        id: '8',
        timestamp: '2023-07-15 10:33:10',
        level: 'info',
        source: 'Agent',
        message: 'Connection established with privileged access'
      }
    ]
    
    setLogs(initialLogs)
    
    // Start generating live logs if live mode is enabled
    if (isLive) {
      startLogSimulation()
    }
    
    return () => {
      if (logUpdateTimer.current) {
        clearInterval(logUpdateTimer.current)
      }
    }
  }, [])
  
  useEffect(() => {
    // Scroll to bottom when logs change if in live mode
    if (isLive && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [logs, isLive])
  
  useEffect(() => {
    if (isLive) {
      startLogSimulation()
    } else if (logUpdateTimer.current) {
      clearInterval(logUpdateTimer.current)
      logUpdateTimer.current = null
    }
  }, [isLive])
  
  const startLogSimulation = () => {
    // Clear any existing timer
    if (logUpdateTimer.current) {
      clearInterval(logUpdateTimer.current)
    }
    
    // Generate a new log entry every few seconds
    logUpdateTimer.current = window.setInterval(() => {
      const logMessages = [
        { level: 'info', message: 'Periodic device health check performed' },
        { level: 'info', message: 'Memory read operation completed successfully' },
        { level: 'debug', message: 'Buffer size: 4096 bytes, address: 0x7FFDE000' },
        { level: 'warning', message: 'Memory access latency higher than normal' },
        { level: 'error', message: 'Failed to write to address 0x9A400000' },
        { level: 'info', message: 'Device connection verified' },
        { level: 'debug', message: 'DMA transfer rate: 243 MB/s' },
        { level: 'warning', message: 'System memory pressure high' }
      ]
      
      const sources = ['Agent', 'Device', 'System', 'Memory', 'Transfer']
      
      const randomEntry = logMessages[Math.floor(Math.random() * logMessages.length)]
      const randomSource = sources[Math.floor(Math.random() * sources.length)]
      
      const newEntry: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString(),
        level: randomEntry.level as LogLevel,
        source: randomSource,
        message: randomEntry.message
      }
      
      setLogs(prevLogs => [...prevLogs, newEntry].slice(-1000)) // Keep last 1000 logs
    }, 3000 + Math.random() * 5000) // Random interval between 3-8 seconds
  }
  
  const clearLogs = () => {
    setLogs([])
  }
  
  const getLogLevelClass = (level: LogLevel) => {
    switch (level) {
      case 'error':
        return 'text-red-400'
      case 'warning':
        return 'text-yellow-400'
      case 'info':
        return 'text-blue-400'
      case 'debug':
        return 'text-gray-400'
      default:
        return 'text-gray-300'
    }
  }
  
  const getLogLevelIcon = (level: LogLevel) => {
    switch (level) {
      case 'error':
        return <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
      case 'warning':
        return <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />
      case 'info':
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />
      case 'debug':
        return <ClockIcon className="h-5 w-5 text-gray-500" />
      default:
        return null
    }
  }
  
  // Filter logs based on level and search query
  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'all' || log.level === filter
    const matchesSearch = searchQuery === '' || 
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.source.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesFilter && matchesSearch
  })
  
  const downloadLogs = () => {
    const logText = filteredLogs.map(
      log => `[${log.timestamp}] [${log.level.toUpperCase()}] [${log.source}] ${log.message}`
    ).join('\n')
    
    const blob = new Blob([logText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dma-logs-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold text-white">Logs Viewer</h1>
        <p className="mt-2 text-gray-300">
          View and filter logs from the DMA agent and connected devices.
        </p>
      </motion.div>
      
      <div className="border-b border-gray-700 pb-5 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center">
          <span className="isolate inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-semibold  ring-1 ring-inset ring-gray-700 focus:z-10 ${
                filter === 'all' ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilter('info')}
              className={`relative -ml-px inline-flex items-center px-3 py-2 text-sm font-semibold  ring-1 ring-inset ring-gray-700 focus:z-10 ${
                filter === 'info' ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Info
            </button>
            <button
              type="button"
              onClick={() => setFilter('warning')}
              className={`relative -ml-px inline-flex items-center px-3 py-2 text-sm font-semibold  ring-1 ring-inset ring-gray-700 focus:z-10 ${
                filter === 'warning' ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Warning
            </button>
            <button
              type="button"
              onClick={() => setFilter('error')}
              className={`relative -ml-px inline-flex items-center px-3 py-2 text-sm font-semibold  ring-1 ring-inset ring-gray-700 focus:z-10 ${
                filter === 'error' ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Error
            </button>
            <button
              type="button"
              onClick={() => setFilter('debug')}
              className={`relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold  ring-1 ring-inset ring-gray-700 focus:z-10 ${
                filter === 'debug' ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Debug
            </button>
          </span>
          
          <div className="mt-3 ml-4 sm:ml-4 sm:mt-0">
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FunnelIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-md border-0 bg-gray-800 py-1.5 pl-10 text-white ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Filter logs..."
              />
            </div>
          </div>
        </div>
        
        <div className="mt-3 flex sm:ml-4 sm:mt-0">
          <button
            type="button"
            onClick={() => setIsLive(!isLive)}
            className={`mr-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              isLive 
                ? 'bg-green-600 text-white hover:bg-green-500 focus-visible:outline-green-600' 
                : 'bg-gray-600 text-white hover:bg-gray-500 focus-visible:outline-gray-600'
            }`}
          >
            {isLive ? 'Live Mode: On' : 'Live Mode: Off'}
          </button>
          
          <button
            type="button"
            onClick={clearLogs}
            className="mr-3 inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            <XMarkIcon className="mr-1.5 h-5 w-5" />
            Clear
          </button>
          
          <button
            type="button"
            onClick={downloadLogs}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <ArrowDownTrayIcon className="mr-1.5 h-5 w-5" />
            Download
          </button>
        </div>
      </div>
      
      <div className="mt-6 overflow-hidden rounded-lg bg-gray-800 shadow">
        <div className="p-2">
          <div 
            ref={logContainerRef}
            className="max-h-[calc(100vh-320px)] min-h-[400px] overflow-y-auto font-mono text-xs"
          >
            {filteredLogs.length === 0 ? (
              <div className="flex h-full items-center justify-center text-gray-400">
                <p>No logs matching your criteria</p>
              </div>
            ) : (
              <table className="min-w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-semibold text-white">
                      Level
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-semibold text-white">
                      Timestamp
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-semibold text-white">
                      Source
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-semibold text-white">
                      Message
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredLogs.map((log) => (
                    <motion.tr 
                      key={log.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="hover:bg-gray-700"
                    >
                      <td className="whitespace-nowrap px-2 py-2 text-left">
                        <div className="flex items-center">
                          {getLogLevelIcon(log.level)}
                          <span className={`ml-1.5 ${getLogLevelClass(log.level)}`}>
                            {log.level.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-gray-300">
                        {log.timestamp}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-gray-300">
                        {log.source}
                      </td>
                      <td className="px-2 py-2 text-gray-300">
                        {log.message}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        
        <div className="border-t border-gray-700 px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing {filteredLogs.length} of {logs.length} logs
            </div>
            <div className="text-sm text-gray-400 flex items-center">
              {isLive && (
                <>
                  <ArrowPathIcon className="mr-1.5 h-4 w-4 animate-spin text-indigo-400" />
                  <span>Live updates enabled</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 overflow-hidden rounded-lg bg-gray-800 p-4 shadow">
        <h2 className="text-lg font-medium text-white">Understanding Log Levels</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md bg-gray-700 p-3">
            <div className="flex items-center">
              <InformationCircleIcon className="h-5 w-5 text-blue-500" />
              <span className="ml-2 font-medium text-blue-400">INFO</span>
            </div>
            <p className="mt-2 text-xs text-gray-300">
              General information about system operation and status.
            </p>
          </div>
          
          <div className="rounded-md bg-gray-700 p-3">
            <div className="flex items-center">
              <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />
              <span className="ml-2 font-medium text-yellow-400">WARNING</span>
            </div>
            <p className="mt-2 text-xs text-gray-300">
              Potential issues that might require attention but don't prevent operation.
            </p>
          </div>
          
          <div className="rounded-md bg-gray-700 p-3">
            <div className="flex items-center">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <span className="ml-2 font-medium text-red-400">ERROR</span>
            </div>
            <p className="mt-2 text-xs text-gray-300">
              Critical issues that prevent expected operation or functionality.
            </p>
          </div>
          
          <div className="rounded-md bg-gray-700 p-3">
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 text-gray-500" />
              <span className="ml-2 font-medium text-gray-400">DEBUG</span>
            </div>
            <p className="mt-2 text-xs text-gray-300">
              Detailed diagnostic information for troubleshooting.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 