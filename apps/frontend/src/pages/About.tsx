import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function About() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={mounted ? { opacity: 0, y: 20 } : false}
        animate={mounted ? { opacity: 1, y: 0 } : false}
        transition={{ duration: 0.5 }}
        className="bg-gray-800/50 rounded-xl p-8 shadow-xl backdrop-blur-sm border border-gray-700"
      >
        <h1 className="text-3xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          About
        </h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-4">
            DMA Toolkit is an all-in-one web-based utility platform designed to simplify working with
            Direct Memory Access (DMA) setups. It provides a clean, intuitive interface for tasks like
            device flashing, speed testing, firmware updates, and more.
          </p>
          
          <h2 className="text-xl font-semibold text-white mt-8 mb-4">Key Features</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>User-friendly setup wizard for first-time users</li>
            <li>Automated tool downloading and dependency management</li>
            <li>DMA device identifier retrieval</li>
            <li>Real-time speed and throughput testing</li>
            <li>Web-based firmware flasher</li>
            <li>System diagnostics and health checks</li>
            <li>Comprehensive logging and monitoring</li>
            <li>Integrated community forum</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-white mt-8 mb-4">Architecture</h2>
          <p className="text-gray-300 mb-4">
            DMA Toolkit features a modern stack with a React frontend, Java Spring Boot backend, 
            and a Rust-based companion agent for hardware-level operations. The platform is designed
            to be cross-platform compatible and user-friendly while maintaining powerful capabilities
            for advanced users.
          </p>
          
          <h2 className="text-xl font-semibold text-white mt-8 mb-4">Getting Started</h2>
          <p className="text-gray-300">
            New users should begin with the Setup Wizard, which guides you through installing
            the companion agent and connecting your DMA hardware. From there, you can explore
            the various tools and utilities provided by the platform.
          </p>
        </div>
      </motion.div>
    </div>
  );
} 