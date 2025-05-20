class AgentWebSocket {
    private ws: WebSocket | null = null;
    private static instance: AgentWebSocket;

    private constructor() {}

    public static getInstance(): AgentWebSocket {
        if (!AgentWebSocket.instance) {
            AgentWebSocket.instance = new AgentWebSocket();
        }
        return AgentWebSocket.instance;
    }

    public connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.ws = new WebSocket('ws://localhost:8081/ws');
                this.ws.onopen = () => resolve();
                this.ws.onerror = (error) => reject(error);
            } catch (error) {
                reject(error);
            }
        });
    }

    public disconnect(): void {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    public sendCommand(command: string, payload: any = null): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
                reject(new Error('WebSocket is not connected'));
                return;
            }

            const message = {
                command,
                payload,
                timestamp: new Date().toISOString(),
            };

            this.ws.send(JSON.stringify(message));

            const handleMessage = (event: MessageEvent) => {
                const response = JSON.parse(event.data);
                this.ws?.removeEventListener('message', handleMessage);
                if (response.success) {
                    resolve(response.data);
                } else {
                    reject(new Error(response.error || 'Unknown error'));
                }
            };

            this.ws.addEventListener('message', handleMessage);
        });
    }
}

export const agentWs = AgentWebSocket.getInstance(); 