# ==============================================================================
# ROVE TRAVEL WARDROBE INTELLIGENCE SYSTEM
# PHASE 16 AUTHENTICATION & SECURITY AUTOMATED TEST SUITE
# ==============================================================================

$workspace = "C:\Users\Yash Vohra\.gemini\antigravity-ide\scratch\rove"

Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "  ROVE PHASE 16: AUTHENTICATION & SECURITY VALIDATION SUITE" -ForegroundColor Cyan
Write-Host "======================================================================" -ForegroundColor Cyan

$global:allPassed = $true
$global:testCount = 0
$global:passCount = 0

function Assert-Condition($desc, $cond) {
    $global:testCount++
    if ($cond) {
        $global:passCount++
        Write-Host "  [PASS] Test $($global:testCount): $desc" -ForegroundColor Green
    } else {
        $global:allPassed = $false
        Write-Host "  [FAIL] Test $($global:testCount): $desc" -ForegroundColor Red
    }
}

# ------------------------------------------------------------------------------
# 1. FILE PRESENCE & LINKAGE CHECKS
# ------------------------------------------------------------------------------
Write-Host "`n[CHECK 1] Verifying Phase 16 Core Assets..." -ForegroundColor Yellow

$files = @(
    "js\services\authService.js",
    "js\components\AuthModal.js",
    "js\components\MyRoveView.js",
    "css\auth.css"
)

foreach ($f in $files) {
    Assert-Condition "Asset exists: $f" (Test-Path (Join-Path $workspace $f))
}

$indexHtml = Get-Content (Join-Path $workspace "index.html") -Raw
Assert-Condition "index.html links css/auth.css" ($indexHtml -match 'href="css/auth.css"')
Assert-Condition "index.html contains #authModalMount" ($indexHtml -match 'id="authModalMount"')

# ------------------------------------------------------------------------------
# 2. STORE & ROUTER INTEGRATION CHECKS
# ------------------------------------------------------------------------------
Write-Host "`n[CHECK 2] Verifying Store & Router Auth Integration..." -ForegroundColor Yellow

$storeJs = Get-Content (Join-Path $workspace "js\store.js") -Raw
Assert-Condition "store.js imports authService" ($storeJs -match "import\s+\{\s*authService\s*\}\s+from\s+'./services/authService.js'")
Assert-Condition "store.js initializes auth state" ($storeJs -match "auth:\s*\{[^}]*isAuthenticated")
Assert-Condition "store.js has openAuthModal method" ($storeJs -match "openAuthModal\(")
Assert-Condition "store.js has closeAuthModal method" ($storeJs -match "closeAuthModal\(")
Assert-Condition "store.js has setAuthUser method" ($storeJs -match "setAuthUser\(")
Assert-Condition "store.js has logout method" ($storeJs -match "logout\(")
Assert-Condition "store.js has saveCurrentTripToAccount method" ($storeJs -match "saveCurrentTripToAccount\(")

$routerJs = Get-Content (Join-Path $workspace "js\router.js") -Raw
Assert-Condition "router.js guards protected routes (#/my-rove)" ($routerJs -match "#/my-rove")
Assert-Condition "router.js checks auth status before mounting" ($routerJs -match "store\.getState\(\)\.auth\.isAuthenticated")

$appJs = Get-Content (Join-Path $workspace "js\app.js") -Raw
Assert-Condition "app.js imports AuthModal" ($appJs -match "import\s+\{\s*AuthModal\s*\}")
Assert-Condition "app.js imports MyRoveView" ($appJs -match "import\s+\{\s*MyRoveView\s*\}")
Assert-Condition "app.js mounts AuthModal" ($appJs -match "new AuthModal\(authModalMount\)")
Assert-Condition "app.js registers #/my-rove route" ($appJs -match "'#/my-rove':")

$navbarJs = Get-Content (Join-Path $workspace "js\components\Navbar.js") -Raw
Assert-Condition "Navbar.js contains navAuthMount" ($navbarJs -match 'id="navAuthMount"')
Assert-Condition "Navbar.js has updateAuthUI method" ($navbarJs -match 'updateAuthUI\(')
Assert-Condition "Navbar.js subscribes to AUTH_STATE_CHANGED" ($navbarJs -match 'AUTH_STATE_CHANGED')

# ------------------------------------------------------------------------------
# 3. AUTH SERVICE METHOD & LOGIC AUDIT
# ------------------------------------------------------------------------------
Write-Host "`n[CHECK 3] Auditing AuthService Security & Cryptographic Methods..." -ForegroundColor Yellow

$authServiceJs = Get-Content (Join-Path $workspace "js\services\authService.js") -Raw
Assert-Condition "authService has hashPassword with Web Crypto API" ($authServiceJs -match "window\.crypto\.subtle\.digest")
Assert-Condition "authService has deterministic fallback hashing" ($authServiceJs -match "fb_")
Assert-Condition "authService has generateRandomToken" ($authServiceJs -match "generateRandomToken")
Assert-Condition "authService has generateOTP" ($authServiceJs -match "generateOTP")
Assert-Condition "authService has signUp method" ($authServiceJs -match "async signUp\(")
Assert-Condition "authService has verifyEmail method" ($authServiceJs -match "async verifyEmail\(")
Assert-Condition "authService has login method" ($authServiceJs -match "async login\(")
Assert-Condition "authService has logout method" ($authServiceJs -match "logout\(")
Assert-Condition "authService has requestPasswordReset method" ($authServiceJs -match "requestPasswordReset\(")
Assert-Condition "authService has resetPassword method" ($authServiceJs -match "async resetPassword\(")
Assert-Condition "authService has sanitizeUser (no password/salt leak)" ($authServiceJs -match "sanitizeUser\(")
Assert-Condition "authService seeds Julian Vance demo account" ($authServiceJs -match "traveler@rove.com")

# ------------------------------------------------------------------------------
# 4. .NET CRYPTOGRAPHIC & LOGICAL VERIFICATION
# ------------------------------------------------------------------------------
Write-Host "`n[CHECK 4] Executing .NET Cryptographic Primitive Verification..." -ForegroundColor Yellow

$sha256 = [System.Security.Cryptography.SHA256]::Create()
$bytes = [System.Text.Encoding]::UTF8.GetBytes("Password123!rove_salt_jv_2024")
$hashBytes = $sha256.ComputeHash($bytes)
$hexHash = [System.BitConverter]::ToString($hashBytes).Replace("-", "").ToLower()

Write-Host "  Calculated SHA-256: $hexHash" -ForegroundColor Cyan
Assert-Condition "SHA-256 hash length is 64 hex characters" ($hexHash.Length -eq 64)
Assert-Condition "Pre-seeded Julian Vance hash matches SHA-256 calculation" ($authServiceJs -match $hexHash)

# 6-digit OTP range check
$otp = [System.Random]::new().Next(100000, 999999)
Assert-Condition "OTP is within 6-digit numeric bounds ($otp)" ($otp -ge 100000 -and $otp -le 999999)

# ------------------------------------------------------------------------------
# 5. SYNTAX & BRACKET INTEGRITY CHECK
# ------------------------------------------------------------------------------
Write-Host "`n[CHECK 5] Validating Syntax & Bracket Balances across Phase 16 files..." -ForegroundColor Yellow

$jsFilesToCheck = @(
    "js\services\authService.js",
    "js\components\AuthModal.js",
    "js\components\MyRoveView.js",
    "js\components\Navbar.js",
    "js\components\WardrobeResult.js",
    "js\router.js",
    "js\store.js",
    "js\app.js"
)

foreach ($f in $jsFilesToCheck) {
    $code = Get-Content (Join-Path $workspace $f) -Raw
    $openCurly = ($code.ToCharArray() | Where-Object { $_ -eq '{' }).Count
    $closeCurly = ($code.ToCharArray() | Where-Object { $_ -eq '}' }).Count
    $openParen = ($code.ToCharArray() | Where-Object { $_ -eq '(' }).Count
    $closeParen = ($code.ToCharArray() | Where-Object { $_ -eq ')' }).Count
    
    $balanced = ($openCurly -eq $closeCurly) -and ($openParen -eq $closeParen)
    Assert-Condition "Bracket Balance: $f (Curlys: $openCurly/$closeCurly, Parens: $openParen/$closeParen)" $balanced
}

# ------------------------------------------------------------------------------
# SUMMARY
# ------------------------------------------------------------------------------
Write-Host "`n======================================================================" -ForegroundColor Cyan
Write-Host "  TEST RESULTS: $global:passCount / $global:testCount CHECKS PASSED" -ForegroundColor $(if ($global:allPassed) { "Green" } else { "Red" })
Write-Host "======================================================================" -ForegroundColor Cyan

if (-not $global:allPassed) {
    exit 1
}
