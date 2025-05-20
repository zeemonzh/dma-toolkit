interface AgentDownload {
    version: string;
    url: string;
    checksum: string;
    platform: 'windows' | 'linux' | 'macos';
}

// Set static file URLs
const AGENT_DOWNLOADS: AgentDownload[] = [
    {
        version: '0.1.0',
        url: '/downloads/dma-toolkit-agent.exe',
        checksum: '', // TODO: Add SHA256 checksum
        platform: 'windows'
    }
];

export class DownloadService {
    static async getLatestAgentDownload(platform: 'windows' | 'linux' | 'macos'): Promise<AgentDownload | null> {
        // In a real app, this would fetch from an API
        return AGENT_DOWNLOADS.find(d => d.platform === platform) || null;
    }

    static async checkBackendStatus(): Promise<boolean> {
        try {
            // Check if the static file exists
            const response = await fetch('/downloads/dma-toolkit-agent.exe', {
                method: 'HEAD',
                cache: 'no-store'
            });
            
            return response.ok;
        } catch (error) {
            console.error('Failed to check agent file:', error);
            return false;
        }
    }

    static async downloadAgent(platform: 'windows' | 'linux' | 'macos'): Promise<void> {
        const download = await this.getLatestAgentDownload(platform);
        if (!download) {
            throw new Error(`No agent available for platform: ${platform}`);
        }

        // Add cache busting to URL
        const cacheBuster = `?t=${Date.now()}`;
        const downloadUrl = `${download.url}${cacheBuster}`;

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `dma-toolkit-agent-${platform}.exe`;
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(link);
        }, 100);
        
        return Promise.resolve();
    }

    static getInstallInstructions(platform: 'windows' | 'linux' | 'macos'): string[] {
        switch (platform) {
            case 'windows':
                return [
                    '1. Download the agent executable',
                    '2. Right-click the downloaded file and select "Run as administrator"',
                    '3. Accept the UAC prompt when asked for administrator privileges',
                    '4. The agent will start automatically'
                ];
            case 'linux':
                return ['Linux support coming soon'];
            case 'macos':
                return ['macOS support coming soon'];
        }
    }
} 