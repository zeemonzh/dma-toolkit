import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowUpTrayIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

export default function FirmwareFlasher() {
  const [selectedDevice, setSelectedDevice] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isFlashing, setIsFlashing] = useState(false)
  const [flashProgress, setFlashProgress] = useState(0)
  const [flashStatus, setFlashStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const progressTimer = useRef<number | null>(null)
  
  const devices = [
    { id: 'ftdi-1234-5678', name: 'FTDI FT601', firmwareType: 'ft60x_firmware' },
    { id: 'usb-9876-5432', name: 'USB 3.0 DMA Adapter', firmwareType: 'usb3_dma_firmware' },
    { id: 'pcie-abcd-ef01', name: 'PCIe FPGA Card', firmwareType: 'fpga_bitstream' },
  ]
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setSelectedFile(files[0])
      setFlashStatus('idle')
      setStatusMessage('')
    }
  }
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  
  const startFlashing = () => {
    if (!selectedDevice || !selectedFile) {
      setFlashStatus('error')
      setStatusMessage('Please select both a device and firmware file')
      return
    }
    
    setIsFlashing(true)
    setFlashProgress(0)
    setFlashStatus('idle')
    
    // Simulate flashing process
    progressTimer.current = window.setInterval(() => {
      setFlashProgress((prev) => {
        const newProgress = prev + Math.random() * 5
        if (newProgress >= 100) {
          if (progressTimer.current) clearInterval(progressTimer.current)
          completeFlashing()
          return 100
        }
        return newProgress
      })
    }, 200)
  }
  
  const completeFlashing = () => {
    setIsFlashing(false)
    
    // Randomly succeed or fail for demo purposes
    const isSuccess = Math.random() > 0.2
    
    if (isSuccess) {
      setFlashStatus('success')
      setStatusMessage('Firmware flashed successfully')
    } else {
      setFlashStatus('error')
      setStatusMessage('Error flashing firmware: Device disconnected during transfer')
    }
  }
  
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold text-white">Firmware Flasher</h1>
        <p className="mt-2 text-gray-300">
          Upload and flash firmware to your DMA devices.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <motion.div 
            className="overflow-hidden rounded-lg bg-gray-800 shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white">Flash Firmware</h2>
              <p className="mt-1 text-sm text-gray-300">
                Select a device and firmware file to begin the flashing process.
              </p>
              
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="device" className="block text-sm font-medium text-white">
                    Device
                  </label>
                  <select
                    id="device"
                    name="device"
                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 py-2 pl-3 pr-10 text-white focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={selectedDevice}
                    onChange={(e) => setSelectedDevice(e.target.value)}
                    disabled={isFlashing}
                  >
                    <option value="">Select a device</option>
                    {devices.map((device) => (
                      <option key={device.id} value={device.id}>
                        {device.name} ({device.id})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium text-white">
                    Firmware File
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept=".bin,.hex,.img,.fw"
                      onChange={handleFileChange}
                      disabled={isFlashing}
                    />
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="inline-flex items-center rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      disabled={isFlashing}
                    >
                      <ArrowUpTrayIcon className="mr-2 h-5 w-5" />
                      {selectedFile ? 'Change File' : 'Select File'}
                    </button>
                    {selectedFile && (
                      <span className="ml-3 text-sm text-gray-300">{selectedFile.name}</span>
                    )}
                  </div>
                </div>
                
                {selectedFile && (
                  <div className="sm:col-span-6">
                    <div className="rounded-md bg-gray-700 p-3">
                      <div className="flex">
                        <div className="mr-3 flex-shrink-0">
                          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                        </div>
                        <div className="text-sm text-gray-300">
                          <p>
                            Flashing firmware can potentially damage your device if interrupted or if the wrong firmware is uploaded.
                            Make sure you've selected the correct firmware for your device.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {isFlashing && (
                  <div className="sm:col-span-6">
                    <div className="mb-1 flex items-center justify-between">
                      <h3 className="text-sm font-medium text-white">Flashing Firmware</h3>
                      <span className="text-sm text-gray-300">{Math.floor(flashProgress)}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                      <div
                        className="h-2 rounded-full bg-indigo-500"
                        style={{ width: `${flashProgress}%`, transition: 'width 0.2s ease-in-out' }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-400">Do not disconnect the device during firmware update.</p>
                  </div>
                )}
                
                {!isFlashing && flashStatus !== 'idle' && (
                  <div className="sm:col-span-6">
                    <div className={`rounded-md p-4 ${flashStatus === 'success' ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
                      <div className="flex">
                        <div className="flex-shrink-0">
                          {flashStatus === 'success' ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                          ) : (
                            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                          )}
                        </div>
                        <div className="ml-3">
                          <h3 className={`text-sm font-medium ${flashStatus === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                            {flashStatus === 'success' ? 'Success' : 'Error'}
                          </h3>
                          <div className="mt-2 text-sm text-gray-300">
                            <p>{statusMessage}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="sm:col-span-6">
                  <button
                    type="button"
                    onClick={startFlashing}
                    disabled={!selectedDevice || !selectedFile || isFlashing}
                    className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm ${
                      !selectedDevice || !selectedFile || isFlashing
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-500'
                    }`}
                  >
                    Flash Firmware
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div>
          <motion.div 
            className="overflow-hidden rounded-lg bg-gray-800 shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="p-6">
              <h2 className="text-lg font-medium text-white">Device Information</h2>
              
              {selectedDevice ? (
                <div className="mt-4">
                  {devices.map((device) => 
                    device.id === selectedDevice && (
                      <div key={device.id}>
                        <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <div className="text-gray-400">Device Name:</div>
                          <div className="text-white">{device.name}</div>
                          
                          <div className="text-gray-400">Device ID:</div>
                          <div className="text-white">{device.id}</div>
                          
                          <div className="text-gray-400">Firmware Type:</div>
                          <div className="text-white">{device.firmwareType}</div>
                        </div>
                        
                        <div className="mt-4 rounded-md bg-gray-700 p-3">
                          <h3 className="text-sm font-medium text-white">Compatible Firmware</h3>
                          <p className="mt-1 text-xs text-gray-300">
                            This device accepts {device.firmwareType} files. Please make sure your firmware is compatible.
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="mt-4 rounded-md bg-gray-700 p-3 text-center text-sm text-gray-300">
                  Select a device to see information
                </div>
              )}
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-6 overflow-hidden rounded-lg bg-gray-800 shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}  
          >
            <div className="p-6">
              <h2 className="text-lg font-medium text-white">Firmware Guide</h2>
              <ul className="mt-4 space-y-3 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 text-lg font-bold">1.</span>
                  <span>Select your connected DMA device from the dropdown</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-lg font-bold">2.</span>
                  <span>Upload the firmware file (usually .bin or .hex format)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-lg font-bold">3.</span>
                  <span>Click "Flash Firmware" to begin the update process</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-lg font-bold">4.</span>
                  <span>Wait for the process to complete. Do not disconnect the device</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 