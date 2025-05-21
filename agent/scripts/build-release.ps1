# Build release version
Write-Host "Building release version..."
cargo build --release

# Create release directory
$releaseDir = "release"
if (Test-Path $releaseDir) {
    Remove-Item -Path $releaseDir -Recurse -Force
}
New-Item -ItemType Directory -Path $releaseDir | Out-Null

# Copy files to release directory
Copy-Item "target\release\dma-toolkit-agent.exe" -Destination $releaseDir
Copy-Item "resources\install.ps1" -Destination $releaseDir

# Create ZIP archive
$version = (cargo pkgid).Split('#')[-1]
$zipName = "dma-toolkit-agent-windows-$version.zip"
Compress-Archive -Path "$releaseDir\*" -DestinationPath $zipName -Force

Write-Host "Release package created: $zipName" 