import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDownTrayIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

type Tool = {
  id: string
  name: string
  description: string
  size: string
  version: string
  isDownloaded: boolean
  isDownloading: boolean
}

export default function ToolDownloader() {
  const [tools, setTools] = useState<Tool[]>([
    {
      id: '1',
      name: 'PCILeech',
      description: 'DMA Attack Toolkit & Library',
      size: '3.2 MB',
      version: 'v6.0.2',
      isDownloaded: false,
      isDownloading: false,
    },
    {
      id: '2',
      name: 'PCILeech-FPGA',
      description: 'FPGA firmware for PCIe-based DMA devices',
      size: '8.1 MB',
      version: 'v4.12',
      isDownloaded: false,
      isDownloading: false,
    },
    {
      id: '3',
      name: 'MemProcFS',
      description: 'Memory Process File System',
      size: '2.7 MB',
      version: 'v5.1',
      isDownloaded: false,
      isDownloading: false,
    },
    {
      id: '4',
      name: 'LeechCore',
      description: 'Physical Memory Acquisition Library',
      size: '1.5 MB',
      version: 'v2.3',
      isDownloaded: false,
      isDownloading: false,
    },
    {
      id: '5',
      name: 'MemDump',
      description: 'Memory Forensics Utility',
      size: '1.2 MB',
      version: 'v1.4',
      isDownloaded: false,
      isDownloading: false,
    },
    {
      id: '6',
      name: 'DMA Drivers',
      description: 'Drivers for various DMA hardware devices',
      size: '4.8 MB',
      version: 'v3.0',
      isDownloaded: false,
      isDownloading: false,
    },
  ])

  const downloadTool = (id: string) => {
    setTools(
      tools.map((tool) => {
        if (tool.id === id) {
          return { ...tool, isDownloading: true }
        }
        return tool
      })
    )

    // Simulate download
    setTimeout(() => {
      setTools(
        tools.map((tool) => {
          if (tool.id === id) {
            return { ...tool, isDownloading: false, isDownloaded: true }
          }
          return tool
        })
      )
    }, 1500)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <motion.h1 
            className="text-3xl font-semibold leading-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Tool Downloader
          </motion.h1>
          <motion.p 
            className="mt-2 text-sm text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Download DMA-related tools and drivers for your system.
          </motion.p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-500"
            onClick={() => {
              // Download all tools
              tools.forEach((tool) => {
                if (!tool.isDownloaded) {
                  downloadTool(tool.id)
                }
              })
            }}
          >
            Download All
          </button>
        </div>
      </div>
      <motion.div 
        className="mt-8 flow-root"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">
                      Tool
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Version
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Size
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Download</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-gray-900">
                  {tools.map((tool) => (
                    <motion.tr 
                      key={tool.id}
                      whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">
                        <div>
                          <div className="font-medium text-white">{tool.name}</div>
                          <div className="text-gray-500">{tool.description}</div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{tool.version}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{tool.size}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        {tool.isDownloaded ? (
                          <span className="flex items-center justify-end text-green-500">
                            <CheckCircleIcon className="mr-1.5 h-5 w-5" />
                            Downloaded
                          </span>
                        ) : tool.isDownloading ? (
                          <span className="flex items-center justify-end text-indigo-500">
                            <svg className="mr-1.5 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Downloading...
                          </span>
                        ) : (
                          <button
                            onClick={() => downloadTool(tool.id)}
                            className="flex items-center justify-end text-indigo-400 hover:text-indigo-300"
                          >
                            <ArrowDownTrayIcon className="mr-1.5 h-5 w-5" />
                            Download
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 