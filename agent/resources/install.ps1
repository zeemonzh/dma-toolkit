# Requires -RunAsAdministrator

$ErrorActionPreference = "Stop"

# Configuration
$agentName = "dma-toolkit-agent"
$installDir = "$env:ProgramFiles\DMA Toolkit"
$exePath = "$installDir\$agentName.exe"
$startupPath = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup\$agentName.lnk"

Write-Host "Installing DMA Toolkit Agent..."

# Create installation directory
if (-not (Test-Path $installDir)) {
    New-Item -ItemType Directory -Path $installDir | Out-Null
}

# Copy executable
Copy-Item ".\$agentName.exe" -Destination $exePath -Force

# Create autostart shortcut
$WScriptShell = New-Object -ComObject WScript.Shell
$shortcut = $WScriptShell.CreateShortcut($startupPath)
$shortcut.TargetPath = $exePath
$shortcut.WorkingDirectory = $installDir
$shortcut.Description = "DMA Toolkit Agent"
$shortcut.Save()

# Create and start the service
$serviceName = "DMAToolkitAgent"
$serviceDisplayName = "DMA Toolkit Agent"
$serviceDescription = "Local agent for DMA Toolkit hardware operations"

# Remove existing service if it exists
if (Get-Service -Name $serviceName -ErrorAction SilentlyContinue) {
    sc.exe delete $serviceName
    Start-Sleep -Seconds 2
}

# Create new service
sc.exe create $serviceName binPath= "$exePath" start= auto DisplayName= "$serviceDisplayName"
sc.exe description $serviceName "$serviceDescription"

# Start the service
Start-Service -Name $serviceName

Write-Host "Installation complete! The agent will start automatically when you restart your computer."
Write-Host "Service status: $((Get-Service -Name $serviceName).Status)" 