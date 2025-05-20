interface AgentDownload {
    version: string;
    url: string;
    checksum: string;
    platform: 'windows' | 'linux' | 'macos';
}

const AGENT_DOWNLOADS: AgentDownload[] = [
    {
        version: '0.1.0',
        url: '/api/agent/download/windows',
        checksum: '', // TODO: Add SHA256 checksum
        platform: 'windows'
    }
];

export class DownloadService {
    static async getLatestAgentDownload(platform: 'windows' | 'linux' | 'macos'): Promise<AgentDownload | null> {
        // In a real app, this would fetch from an API
        return AGENT_DOWNLOADS.find(d => d.platform === platform) || null;
    }

    static async downloadAgent(platform: 'windows' | 'linux' | 'macos'): Promise<void> {
        const download = await this.getLatestAgentDownload(platform);
        if (!download) {
            throw new Error(`No agent available for platform: ${platform}`);
        }

        // Create a temporary anchor element to trigger download
        const link = document.createElement('a');
        link.href = download.url;
        link.download = `dma-toolkit-agent-${platform}.exe`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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