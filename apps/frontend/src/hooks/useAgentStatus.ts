import { useState, useEffect } from 'react';
import { agentWs } from '../utils/websocket';

export type AgentStatus = {
  isConnected: boolean;
  message: string;
  lastError: string | null;
};

export function useAgentStatus() {
  const [status, setStatus] = useState<AgentStatus>({
    isConnected: false,
    message: 'Disconnected',
    lastError: null
  });

  useEffect(() => {
    let reconnectTimeout: number;
    let pingInterval: number;

    const connect = async () => {
      try {
        await agentWs.connect();
        setStatus({
          isConnected: true,
          message: 'Connected',
          lastError: null
        });

        // Send system status command periodically to verify connection
        pingInterval = window.setInterval(async () => {
          try {
            await agentWs.sendCommand('system_status');
          } catch (error) {
            setStatus({
              isConnected: false,
              message: 'Disconnected',
              lastError: null
            });
            reconnect();
          }
        }, 5000);

      } catch (error) {
        setStatus({
          isConnected: false,
          message: 'Disconnected',
          lastError: null
        });
        reconnect();
      }
    };

    const reconnect = () => {
      clearInterval(pingInterval);
      reconnectTimeout = window.setTimeout(connect, 2000);
    };

    connect();

    return () => {
      clearTimeout(reconnectTimeout);
      clearInterval(pingInterval);
      agentWs.disconnect();
    };
  }, []);

  return status;
} 