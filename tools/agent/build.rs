#[cfg(windows)]
fn main() {
    let mut res = winres::WindowsResource::new();
    
    // Only set icon if it exists
    if std::path::Path::new("resources/agent.ico").exists() {
        res.set_icon("resources/agent.ico");
    }
    
    res.set("FileDescription", "DMA Toolkit Agent")
        .set("ProductName", "DMA Toolkit")
        .set("OriginalFilename", "dma-toolkit-agent.exe")
        .set("LegalCopyright", "Copyright © 2024")
        .set("CompanyName", "DMA Toolkit");
    
    if let Err(e) = res.compile() {
        eprintln!("Error: {}", e);
        std::process::exit(1);
    }
}

#[cfg(not(windows))]
fn main() {} 