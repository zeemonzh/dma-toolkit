import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Forum = () => {
  const [loading, setLoading] = useState(true);

  // Handle iframe load event to hide the loading indicator
  const handleIframeLoad = () => {
    setLoading(false);
  };

  // Automatically adjust the height of the iframe to fill the available space
  useEffect(() => {
    const adjustIframeHeight = () => {
      const iframe = document.getElementById('forum-iframe') as HTMLIFrameElement;
      if (iframe) {
        // Calculate available height (viewport height minus header and padding)
        const viewportHeight = window.innerHeight;
        const headerHeight = 64; // Approx header height
        const containerPadding = 20; // Top and bottom padding
        iframe.style.height = `${viewportHeight - headerHeight - containerPadding}px`;
      }
    };

    window.addEventListener('resize', adjustIframeHeight);
    adjustIframeHeight();

    return () => {
      window.removeEventListener('resize', adjustIframeHeight);
    };
  }, []);

  return (
    <div className="-mt-3">
      {/* Iframe container */}
      <motion.div
        className="w-full bg-gray-800/30 rounded-lg overflow-hidden shadow-xl border border-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ height: 'calc(100vh - 84px)' }}
      >
        {loading && (
          <div className="flex justify-center items-center w-full h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}
        <iframe
          id="forum-iframe"
          src="http://localhost:8888"
          className={`w-full h-full ${loading ? 'hidden' : 'block'}`}
          style={{ border: 'none' }}
          title="DMA Toolkit Forum"
          onLoad={handleIframeLoad}
        ></iframe>
      </motion.div>
    </div>
  );
};

export default Forum; 