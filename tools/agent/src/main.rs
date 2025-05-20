mod webserver;
mod commands;

#[tokio::main]
async fn main() {
    println!("DMA agent starting...");
    
    // Check system requirements on startup
    match commands::DmaOperations::check_system_requirements() {
        Ok((requirements_met, issues)) => {
            if !requirements_met {
                eprintln!("System requirement issues found:");
                for issue in issues {
                    eprintln!("- {}", issue);
                }
                eprintln!("Warning: Some features may not work properly");
            }
        }
        Err(e) => {
            eprintln!("Failed to check system requirements: {}", e);
        }
    }
    
    if let Err(err) = webserver::start_server().await {
        eprintln!("Server error: {}", err);
        std::process::exit(1);
    }
}
