import { motion } from 'framer-motion';

export default function DMAInfo() {
  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800/50 rounded-xl p-8 shadow-xl backdrop-blur-sm border border-gray-700"
      >
        <h1 className="text-3xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          DMA Information Guide
        </h1>
        
        <div className="prose prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-white mt-4 mb-4">What is Direct Memory Access (DMA)?</h2>
          <p className="text-gray-300 mb-4">
            Direct Memory Access (DMA) is a feature of computer systems that allows certain hardware subsystems to access 
            main system memory (RAM) independently of the central processing unit (CPU). DMA enables high-speed data transfers 
            between hardware devices and memory while freeing the CPU to perform other tasks.
          </p>
          
          <h2 className="text-xl font-semibold text-white mt-8 mb-4">How DMA Works</h2>
          <p className="text-gray-300 mb-4">
            Unlike normal memory access where the CPU is responsible for initiating data transfers, DMA 
            operations are handled by a specialized controller (DMA controller) that takes control of the system 
            bus to transfer data directly between memory and peripherals.
          </p>
          
          <p className="text-gray-300 mb-4">
            The basic operation includes:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-gray-300">
            <li>The CPU sets up the DMA transfer by programming the DMA controller with source/destination addresses and transfer size</li>
            <li>The CPU signals the DMA controller to begin the operation</li>
            <li>The DMA controller takes control of the system bus</li>
            <li>Data is transferred directly between the device and memory</li>
            <li>Upon completion, the DMA controller signals the CPU that the transfer is complete</li>
          </ol>
          
          <h2 className="text-xl font-semibold text-white mt-8 mb-4">DMA Modes and Types</h2>
          <div className="rounded-lg bg-gray-900/50 p-4 mb-6">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Standard DMA</h3>
            <p className="text-gray-300">
              In standard DMA, the DMA controller temporarily takes control of the system bus to perform data transfers 
              between memory and I/O devices. This is the most common form of DMA.
            </p>
          </div>
          
          <div className="rounded-lg bg-gray-900/50 p-4 mb-6">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">Bus Mastering DMA</h3>
            <p className="text-gray-300">
              In this approach, intelligent peripheral devices can take control of the system bus to directly 
              read/write system memory without CPU intervention. Most modern PCIe devices use this approach.
            </p>
          </div>
          
          <div className="rounded-lg bg-gray-900/50 p-4 mb-6">
            <h3 className="text-lg font-medium text-indigo-400 mb-2">First-Party DMA</h3>
            <p className="text-gray-300">
              The device itself initiates and controls data transfers directly to and from memory, 
              requiring minimal CPU involvement. This provides the highest performance.
            </p>
          </div>
          
          <h2 className="text-xl font-semibold text-white mt-8 mb-4">Common Applications</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><span className="font-semibold text-indigo-300">Hard Disk Controllers:</span> Use DMA to transfer data between the disk and memory without CPU intervention</li>
            <li><span className="font-semibold text-indigo-300">Network Interface Cards:</span> Transmit/receive network packets directly to/from system memory</li>
            <li><span className="font-semibold text-indigo-300">Graphics Cards:</span> Access frame buffer memory for rendering operations</li>
            <li><span className="font-semibold text-indigo-300">Sound Cards:</span> Stream audio data directly from memory</li>
            <li><span className="font-semibold text-indigo-300">Hardware-based Encryption:</span> Process large data blocks with minimal CPU overhead</li>
            <li><span className="font-semibold text-indigo-300">External Bus Adapters:</span> PCIe, USB 3.0, Thunderbolt utilize DMA for high-speed transfers</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-white mt-8 mb-4">Security Considerations</h2>
          <p className="text-gray-300 mb-4">
            DMA can pose security risks as devices with DMA capabilities can potentially read from or write to 
            any part of system memory, bypassing operating system protections. Modern systems implement 
            I/O Memory Management Units (IOMMUs) to provide virtualization and protection for DMA transfers.
          </p>
          
          <div className="bg-gray-900/60 rounded-lg p-4 my-6 border-l-4 border-yellow-500">
            <h3 className="text-lg font-medium text-yellow-400 mb-2">Security Note</h3>
            <p className="text-gray-300">
              DMA can be exploited to create attack vectors if malicious devices gain bus access. IOMMUs (like Intel VT-d or 
              AMD-Vi) provide protection by creating memory translation tables that restrict where DMA devices can access.
            </p>
          </div>
          
          <h2 className="text-xl font-semibold text-white mt-8 mb-4">Troubleshooting DMA Issues</h2>
          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="font-medium text-indigo-300">Problem: Poor DMA Performance</p>
              <p className="text-gray-300 mt-1">
                Check for proper driver installation, configuration issues, or conflicts with other 
                devices. Ensure your device is using the optimal DMA mode for your system.
              </p>
            </div>
            
            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="font-medium text-indigo-300">Problem: System Crashes During DMA Operations</p>
              <p className="text-gray-300 mt-1">
                May indicate memory addressing issues, buffer overruns, or timing problems. Update firmware and 
                drivers to the latest version, and check for hardware compatibility issues.
              </p>
            </div>
            
            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="font-medium text-indigo-300">Problem: DMA Errors in Device Manager</p>
              <p className="text-gray-300 mt-1">
                Try changing the DMA channel settings if possible, update drivers, or reseat the hardware 
                component. In some cases, BIOS updates may resolve compatibility issues.
              </p>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-white mt-8 mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-800/50">
              <h3 className="text-lg font-medium text-indigo-400 mb-2">DMA Programming Guide</h3>
              <p className="text-gray-300 text-sm">
                Comprehensive guide to programming DMA controllers for device drivers and firmware development.
              </p>
            </div>
            
            <div className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-800/50">
              <h3 className="text-lg font-medium text-indigo-400 mb-2">DMA Security Best Practices</h3>
              <p className="text-gray-300 text-sm">
                Learn about securing DMA operations and implementing proper IOMMU protections for your systems.
              </p>
            </div>
            
            <div className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-800/50">
              <h3 className="text-lg font-medium text-indigo-400 mb-2">Hardware Compatibility Database</h3>
              <p className="text-gray-300 text-sm">
                Find DMA compatibility information for various hardware components and operating systems.
              </p>
            </div>
            
            <div className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-800/50">
              <h3 className="text-lg font-medium text-indigo-400 mb-2">Performance Optimization Guide</h3>
              <p className="text-gray-300 text-sm">
                Techniques for maximizing DMA throughput and minimizing latency in high-performance applications.
              </p>
            </div>
          </div>
          
          <p className="text-gray-400 text-sm mt-8">
            This information is provided as a general guide to understanding Direct Memory Access technology. 
            Specific implementations may vary based on hardware, operating systems, and firmware.
          </p>
        </div>
      </motion.div>
    </div>
  );
} 