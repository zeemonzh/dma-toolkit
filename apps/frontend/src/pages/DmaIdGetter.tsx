import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  InformationCircleIcon, 
  ArrowPathIcon, 
  ClipboardIcon,
  CheckIcon
} from '@heroicons/react/24/outline'

interface Device {
  id: string
  type: string
  vendorId: string
  deviceId: string
  firmwareVersion: string
  status: 'available' | 'in-use' | 'error'
}

export default function DmaIdGetter() {
  const [isScanning, setIsScanning] = useState(false)
  const [showCopied, setShowCopied] = useState<string | null>(null)
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 'ftdi-1234-5678',
      type: 'FTDI FT601',
      vendorId: '0x0403',
      deviceId: '0x601f',
      firmwareVersion: '1.2.3',
      status: 'available'
    }
  ])

  const handleScan = () => {
    setIsScanning(true)
    
    // Simulate scanning for devices
    setTimeout(() => {
      setDevices([
        {
          id: 'ftdi-1234-5678',
          type: 'FTDI FT601',
          vendorId: '0x0403',
          deviceId: '0x601f',
          firmwareVersion: '1.2.3',
          status: 'available'
        },
        {
          id: 'usb-9876-5432',
          type: 'USB 3.0 DMA Adapter',
          vendorId: '0x2109',
          deviceId: '0x2812',
          firmwareVersion: '2.0.1',
          status: 'available'
        },
        {
          id: 'pcie-abcd-ef01',
          type: 'PCIe FPGA Card',
          vendorId: '0x1172',
          deviceId: '0xe001',
          firmwareVersion: '3.5.2',
          status: 'available'
        }
      ])
      setIsScanning(false)
    }, 2000)
  }

  const copyToClipboard = (text: string, device: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setShowCopied(device)
      setTimeout(() => setShowCopied(null), 2000)
    })
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'available':
        return 'text-green-400';
      case 'in-use':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold text-white">DMA ID Getter</h1>
        <p className="mt-2 text-sm text-gray-300">
          Detect and identify DMA devices connected to your system.
        </p>
      </motion.div>

      <div className="mt-6 overflow-hidden rounded-lg bg-gray-800 shadow">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <InformationCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <p className="ml-2 text-sm text-gray-300">
                This tool detects DMA devices and retrieves their unique identifiers.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleScan}
              disabled={isScanning}
            >
              {isScanning ? (
                <>
                  <ArrowPathIcon className="mr-1.5 h-5 w-5 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <ArrowPathIcon className="mr-1.5 h-5 w-5" />
                  Scan for Devices
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">
                  Device Type
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                  Vendor ID
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                  Device ID
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                  Firmware
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                  Status
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                  Unique ID
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Copy</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-gray-900">
              {devices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-sm text-gray-400">
                    {isScanning ? (
                      <div className="flex flex-col items-center">
                        <ArrowPathIcon className="h-8 w-8 animate-spin text-indigo-500" />
                        <p className="mt-2">Scanning for DMA devices...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <p>No devices detected</p>
                        <button
                          type="button"
                          className="mt-2 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                          onClick={handleScan}
                        >
                          <ArrowPathIcon className="mr-1.5 h-5 w-5" />
                          Scan for Devices
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                devices.map((device) => (
                  <motion.tr 
                    key={device.id}
                    whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">
                      {device.type}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{device.vendorId}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{device.deviceId}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{device.firmwareVersion}</td>
                    <td className={`whitespace-nowrap px-3 py-4 text-sm ${getStatusColor(device.status)}`}>
                      {device.status}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm font-mono text-gray-300">{device.id}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        onClick={() => copyToClipboard(device.id, device.id)}
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        {showCopied === device.id ? (
                          <CheckIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <ClipboardIcon className="h-5 w-5" />
                        )}
                        <span className="sr-only">Copy ID</span>
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <div className="mt-6 rounded-md bg-gray-800 p-4">
        <h3 className="text-sm font-medium text-white">Device Information</h3>
        <p className="mt-1 text-sm text-gray-300">
          The unique identifiers shown above can be used in your DMA configuration files to specify which device to use.
          Most DMA tools use these identifiers to establish a connection with the hardware.
        </p>
        <div className="mt-2 rounded-md bg-gray-900 p-3">
          <pre className="text-xs text-gray-300 font-mono">
            <code>
              # Example configuration<br />
              device_identifier = "{devices[0]?.id || 'ftdi-1234-5678'}"<br />
              device_type = "{devices[0]?.type || 'FTDI FT601'}"
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
} 