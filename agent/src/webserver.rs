use axum::{
    extract::ws::{Message, WebSocket, WebSocketUpgrade},
    response::IntoResponse,
    routing::get,
    Router,
};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;
use tokio::sync::broadcast;
use crate::commands::DmaOperations;

#[derive(Debug, Serialize, Deserialize)]
struct AgentCommand {
    command: String,
    payload: Option<serde_json::Value>,
    timestamp: String,
}

#[derive(Debug, Serialize)]
struct AgentResponse {
    success: bool,
    data: Option<serde_json::Value>,
    error: Option<String>,
}

pub async fn start_server() -> Result<(), Box<dyn std::error::Error>> {
    let app = Router::new()
        .route("/ws", get(ws_handler))
        .route("/health", get(health_check));

    let addr = SocketAddr::from(([127, 0, 0, 1], 8081));
    println!("Agent webserver running on {}", addr);

    axum::serve(
        tokio::net::TcpListener::bind(addr).await?,
        app.into_make_service(),
    )
    .await?;

    Ok(())
}

async fn health_check() -> &'static str {
    "DMA Agent is running"
}

async fn ws_handler(ws: WebSocketUpgrade) -> impl IntoResponse {
    ws.on_upgrade(handle_socket)
}

async fn handle_socket(mut socket: WebSocket) {
    println!("New WebSocket connection established");

    while let Some(msg) = socket.recv().await {
        let msg = if let Ok(msg) = msg {
            msg
        } else {
            // client disconnected
            return;
        };

        if let Message::Text(text) = msg {
            let command: AgentCommand = match serde_json::from_str(&text) {
                Ok(cmd) => cmd,
                Err(e) => {
                    let response = AgentResponse {
                        success: false,
                        data: None,
                        error: Some(format!("Invalid command format: {}", e)),
                    };
                    if let Ok(response_text) = serde_json::to_string(&response) {
                        let _ = socket.send(Message::Text(response_text)).await;
                    }
                    continue;
                }
            };

            let response = handle_command(command).await;
            if let Ok(response_text) = serde_json::to_string(&response) {
                let _ = socket.send(Message::Text(response_text)).await;
            }
        }
    }

    println!("WebSocket connection closed");
}

async fn handle_command(command: AgentCommand) -> AgentResponse {
    match command.command.as_str() {
        "detect_devices" => {
            match DmaOperations::detect_devices() {
                Ok(devices) => AgentResponse {
                    success: true,
                    data: Some(serde_json::to_value(devices).unwrap()),
                    error: None,
                },
                Err(e) => AgentResponse {
                    success: false,
                    data: None,
                    error: Some(e.to_string()),
                },
            }
        }
        "get_dma_id" => {
            if let Some(payload) = command.payload {
                if let Some(device_id) = payload.get("deviceId") {
                    match DmaOperations::get_dma_id(device_id.as_str().unwrap_or("")) {
                        Ok(dma_id) => AgentResponse {
                            success: true,
                            data: Some(serde_json::json!({ "dmaId": dma_id })),
                            error: None,
                        },
                        Err(e) => AgentResponse {
                            success: false,
                            data: None,
                            error: Some(e.to_string()),
                        },
                    }
                } else {
                    AgentResponse {
                        success: false,
                        data: None,
                        error: Some("Device ID not provided".to_string()),
                    }
                }
            } else {
                AgentResponse {
                    success: false,
                    data: None,
                    error: Some("No payload provided".to_string()),
                }
            }
        }
        "speed_test" => {
            if let Some(payload) = command.payload {
                if let Some(device_id) = payload.get("deviceId") {
                    match DmaOperations::run_speed_test(device_id.as_str().unwrap_or("")) {
                        Ok((read_speed, write_speed)) => AgentResponse {
                            success: true,
                            data: Some(serde_json::json!({
                                "readSpeed": read_speed,
                                "writeSpeed": write_speed
                            })),
                            error: None,
                        },
                        Err(e) => AgentResponse {
                            success: false,
                            data: None,
                            error: Some(e.to_string()),
                        },
                    }
                } else {
                    AgentResponse {
                        success: false,
                        data: None,
                        error: Some("Device ID not provided".to_string()),
                    }
                }
            } else {
                AgentResponse {
                    success: false,
                    data: None,
                    error: Some("No payload provided".to_string()),
                }
            }
        }
        "system_status" => {
            match DmaOperations::check_system_requirements() {
                Ok((requirements_met, issues)) => AgentResponse {
                    success: true,
                    data: Some(serde_json::json!({
                        "agentVersion": env!("CARGO_PKG_VERSION"),
                        "systemRequirementsMet": requirements_met,
                        "issues": issues
                    })),
                    error: None,
                },
                Err(e) => AgentResponse {
                    success: false,
                    data: None,
                    error: Some(e.to_string()),
                },
            }
        }
        "create_demo_folder" => {
            match DmaOperations::create_demo_folder() {
                Ok(path) => AgentResponse {
                    success: true,
                    data: Some(serde_json::json!({
                        "path": path
                    })),
                    error: None,
                },
                Err(e) => AgentResponse {
                    success: false,
                    data: None,
                    error: Some(e.to_string()),
                },
            }
        }
        _ => AgentResponse {
            success: false,
            data: None,
            error: Some(format!("Unknown command: {}", command.command)),
        },
    }
}
