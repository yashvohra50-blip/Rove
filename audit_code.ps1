$root = "C:\Users\Yash Vohra\.gemini\antigravity-ide\scratch\rove"

Write-Host "=== AUDITING ROVE SOURCE FILES ===" -ForegroundColor Cyan

# 1. Check all HTML, CSS, JS files exist
$files = Get-ChildItem -Path $root -Recurse -Include *.html, *.css, *.js

Write-Host "Total files found: $($files.Count)"

$hasError = $false

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Check non-empty
    if ([string]::IsNullOrWhiteSpace($content)) {
        Write-Host "[ERROR] File is empty: $($file.Name)" -ForegroundColor Red
        $hasError = $true
        continue
    }

    # Check unmatched braces in JS/CSS
    if ($file.Extension -in @('.js', '.css')) {
        $openCurly = ($content.ToCharArray() | Where-Object { $_ -eq '{' }).Count
        $closeCurly = ($content.ToCharArray() | Where-Object { $_ -eq '}' }).Count
        if ($openCurly -ne $closeCurly) {
            Write-Host "[ERROR] Unmatched braces in $($file.Name): Open={$openCurly}, Close={$closeCurly}" -ForegroundColor Red
            $hasError = $true
        } else {
            Write-Host "[OK] $($file.Name) ({$openCurly} balanced blocks, $($file.Length) bytes)" -ForegroundColor Green
        }
    }
}

# 2. Check import statements in JS
Write-Host "`n=== AUDITING JS IMPORT TARGETS ===" -ForegroundColor Cyan
$jsFiles = Get-ChildItem -Path "$root\js" -Recurse -Filter *.js

foreach ($js in $jsFiles) {
    $lines = Get-Content -Path $js.FullName
    foreach ($line in $lines) {
        if ($line -match "from\s+['""]([^'""]+)['""]") {
            $importRel = $matches[1]
            $importDir = $js.DirectoryName
            $resolvedPath = [System.IO.Path]::GetFullPath((Join-Path $importDir $importRel))
            if (Test-Path $resolvedPath -PathType Leaf) {
                Write-Host "  [OK Import] in $($js.Name) -> $importRel" -ForegroundColor DarkGreen
            } else {
                Write-Host "  [BROKEN Import] in $($js.Name) -> $importRel (Resolved: $resolvedPath)" -ForegroundColor Red
                $hasError = $true
            }
        }
    }
}

if (-not $hasError) {
    Write-Host "`nSUCCESS: Complete ROVE code base is structurally sound, balanced, and all module imports resolve!" -ForegroundColor Green
} else {
    Write-Host "`nFAILED: Some issues detected." -ForegroundColor Red
}
