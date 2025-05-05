import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Setup from './pages/Setup'
import ToolDownloader from './pages/ToolDownloader'
import DmaIdGetter from './pages/DmaIdGetter'
import SpeedTest from './pages/SpeedTest'
import FirmwareFlasher from './pages/FirmwareFlasher'
import SystemCheckup from './pages/SystemCheckup'
import LogsViewer from './pages/LogsViewer'
import Forum from './pages/Forum'
import About from './pages/About'
import DMAInfo from './pages/DMAInfo'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="setup" element={<Setup />} />
        <Route path="tools" element={<ToolDownloader />} />
        <Route path="id-getter" element={<DmaIdGetter />} />
        <Route path="speed-test" element={<SpeedTest />} />
        <Route path="firmware" element={<FirmwareFlasher />} />
        <Route path="checkup" element={<SystemCheckup />} />
        <Route path="logs" element={<LogsViewer />} />
        <Route path="forum" element={<Forum />} />
        <Route path="about" element={<About />} />
        <Route path="dma-info" element={<DMAInfo />} />
      </Route>
    </Routes>
  )
}

export default App
