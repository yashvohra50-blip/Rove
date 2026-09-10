$port = 8090
$root = "C:\Users\Yash Vohra\.gemini\antigravity-ide\scratch\rove"

for ($p = 8090; $p -le 8110; $p++) {
    try {
        $listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $p)
        $listener.Start()
        $port = $p
        break
    } catch {}
}

Write-Output "ROVE_SERVER_ONLINE_AT: http://localhost:$port"

$mimeTypes = @{
    ".html"  = "text/html; charset=utf-8"
    ".css"   = "text/css; charset=utf-8"
    ".js"    = "application/javascript; charset=utf-8"
    ".json"  = "application/json; charset=utf-8"
    ".png"   = "image/png"
    ".jpg"   = "image/jpeg"
    ".jpeg"  = "image/jpeg"
    ".svg"   = "image/svg+xml"
    ".ico"   = "image/x-icon"
    ".webp"  = "image/webp"
    ".woff2" = "font/woff2"
}

$buffer = New-Object byte[] 65536

while ($true) {
    try {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $bytesRead = $stream.Read($buffer, 0, $buffer.Length)
        if ($bytesRead -gt 0) {
            $requestText = [System.Text.Encoding]::UTF8.GetString($buffer, 0, $bytesRead)
            $firstLine = $requestText.Split("`n")[0].Trim()
            $tokens = $firstLine.Split(' ')
            if ($tokens.Length -ge 2) {
                $urlPath = $tokens[1].Split('?')[0]
                if ($urlPath -eq "/" -or $urlPath -eq "") {
                    $urlPath = "/index.html"
                }
                $safePath = $urlPath.TrimStart('/').Replace('/', '\')
                $filePath = Join-Path $root $safePath
                if (-not (Test-Path $filePath -PathType Leaf)) {
                    # SPA Fallback for client-side routing
                    $filePath = Join-Path $root "index.html"
                }

                if (Test-Path $filePath -PathType Leaf) {
                    $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                    $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
                    $fileBytes = [System.IO.File]::ReadAllBytes($filePath)
                    $header = "HTTP/1.1 200 OK`r`nContent-Type: $contentType`r`nContent-Length: $($fileBytes.Length)`r`nAccess-Control-Allow-Origin: *`r`nConnection: close`r`n`r`n"
                    $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
                    $stream.Write($headerBytes, 0, $headerBytes.Length)
                    $stream.Write($fileBytes, 0, $fileBytes.Length)
                } else {
                    $notFound = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain`r`nContent-Length: 9`r`nConnection: close`r`n`r`nNot Found"
                    $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($notFound)
                    $stream.Write($headerBytes, 0, $headerBytes.Length)
                }
            }
        }
        $stream.Flush()
        $client.Close()
    } catch {
        # continue on error
    }
}
