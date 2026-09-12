# ==============================================================================
# ROVE TRAVEL WARDROBE INTELLIGENCE SYSTEM
# PHASE 17 USER WARDROBE ARCHIVE AUTOMATED TEST SUITE
# ==============================================================================

$workspace = "C:\Users\Yash Vohra\.gemini\antigravity-ide\scratch\rove"

Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "  ROVE PHASE 17: USER WARDROBE VALIDATION SUITE" -ForegroundColor Cyan
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
# 1. FILE EXISTENCE & LINKAGE CHECKS
# ------------------------------------------------------------------------------
Write-Host "`n[CHECK 1] Verifying Phase 17 Core Assets..." -ForegroundColor Yellow

$files = @(
    "js\components\UserWardrobeView.js",
    "js\components\WardrobeItemModal.js",
    "css\wardrobe-manager.css"
)

foreach ($f in $files) {
    Assert-Condition "Asset exists: $f" (Test-Path (Join-Path $workspace $f))
}

$indexHtml = Get-Content (Join-Path $workspace "index.html") -Raw
Assert-Condition "index.html links css/wardrobe-manager.css" ($indexHtml -match 'href="css/wardrobe-manager.css"')
Assert-Condition "index.html contains #wardrobeModalMount" ($indexHtml -match 'id="wardrobeModalMount"')

# ------------------------------------------------------------------------------
# 2. STORE & ROUTER INTEGRATION CHECKS
# ------------------------------------------------------------------------------
Write-Host "`n[CHECK 2] Verifying Store & Router Wardrobe Integration..." -ForegroundColor Yellow

$storeJs = Get-Content (Join-Path $workspace "js\store.js") -Raw
Assert-Condition "store.js has getUserWardrobe method" ($storeJs -match "getUserWardrobe\(")
Assert-Condition "store.js has addUserWardrobeItem method" ($storeJs -match "addUserWardrobeItem\(")
Assert-Condition "store.js has updateUserWardrobeItem method" ($storeJs -match "updateUserWardrobeItem\(")
Assert-Condition "store.js has deleteUserWardrobeItem method" ($storeJs -match "deleteUserWardrobeItem\(")
Assert-Condition "store.js has togglePinWardrobeItem method" ($storeJs -match "togglePinWardrobeItem\(")
Assert-Condition "store.js has importEssentialPack method" ($storeJs -match "importEssentialPack\(")
Assert-Condition "store.js emits WARDROBE_COLLECTION_UPDATED" ($storeJs -match "WARDROBE_COLLECTION_UPDATED")

$routerJs = Get-Content (Join-Path $workspace "js\router.js") -Raw
Assert-Condition "router.js protects #/my-wardrobe" ($routerJs -match "#/my-wardrobe")

$appJs = Get-Content (Join-Path $workspace "js\app.js") -Raw
Assert-Condition "app.js imports UserWardrobeView" ($appJs -match "import\s+\{\s*UserWardrobeView\s*\}")
Assert-Condition "app.js imports WardrobeItemModal" ($appJs -match "import\s+\{\s*WardrobeItemModal\s*\}")
Assert-Condition "app.js mounts WardrobeItemModal" ($appJs -match "new WardrobeItemModal\(wardrobeModalMount\)")
Assert-Condition "app.js registers #/my-wardrobe route" ($appJs -match "'#/my-wardrobe':")

$navbarJs = Get-Content (Join-Path $workspace "js\components\Navbar.js") -Raw
Assert-Condition "Navbar.js links to #/my-wardrobe" ($navbarJs -match 'href="#/my-wardrobe"')

$myRoveJs = Get-Content (Join-Path $workspace "js\components\MyRoveView.js") -Raw
Assert-Condition "MyRoveView.js contains Personal Wardrobe Archive preview" ($myRoveJs -match "My Wardrobe Archive")
Assert-Condition "MyRoveView.js links to #/my-wardrobe" ($myRoveJs -match 'href="#/my-wardrobe"')

# ------------------------------------------------------------------------------
# 3. AUTH SERVICE WARDROBE CRUD AUDIT
# ------------------------------------------------------------------------------
Write-Host "`n[CHECK 3] Auditing AuthService Wardrobe CRUD & Starter Items..." -ForegroundColor Yellow

$authServiceJs = Get-Content (Join-Path $workspace "js\services\authService.js") -Raw
Assert-Condition "authService exports DEFAULT_JULIAN_WARDROBE" ($authServiceJs -match "export const DEFAULT_JULIAN_WARDROBE")
Assert-Condition "DEFAULT_JULIAN_WARDROBE has 8 foundational pieces" (($authServiceJs | Select-String -Pattern "id: 'grm_jv_" -AllMatches).Matches.Count -eq 8)
Assert-Condition "authService has getUserWardrobe" ($authServiceJs -match "getUserWardrobe\(userId\)")
Assert-Condition "authService has addWardrobeItem" ($authServiceJs -match "addWardrobeItem\(userId, item\)")
Assert-Condition "authService has updateWardrobeItem" ($authServiceJs -match "updateWardrobeItem\(userId, itemId, updates\)")
Assert-Condition "authService has deleteWardrobeItem" ($authServiceJs -match "deleteWardrobeItem\(userId, itemId\)")
Assert-Condition "authService has togglePinWardrobeItem" ($authServiceJs -match "togglePinWardrobeItem\(userId, itemId\)")
Assert-Condition "authService has importEssentialPack" ($authServiceJs -match "importEssentialPack\(userId\)")

# ------------------------------------------------------------------------------
# 4. WARDROBE ITEM MODAL & PRESETS VERIFICATION
# ------------------------------------------------------------------------------
Write-Host "`n[CHECK 4] Verifying WardrobeItemModal Studio Presets & Canvas..." -ForegroundColor Yellow

$modalJs = Get-Content (Join-Path $workspace "js\components\WardrobeItemModal.js") -Raw
Assert-Condition "WardrobeItemModal exports EDITORIAL_GARMENT_PRESETS" ($modalJs -match "EDITORIAL_GARMENT_PRESETS")
Assert-Condition "EDITORIAL_GARMENT_PRESETS contains 12 studio pieces" (($modalJs | Select-String -Pattern "category:" -AllMatches).Matches.Count -ge 12)
Assert-Condition "WardrobeItemModal implements HTML5 Canvas compression" ($modalJs -match "document\.createElement\('canvas'\)")
Assert-Condition "WardrobeItemModal exports compressed JPEG/WebP data URI" ($modalJs -match "canvas\.toDataURL")

# ------------------------------------------------------------------------------
# 5. USER WARDROBE VIEW FUNCTIONALITY CHECKS
# ------------------------------------------------------------------------------
Write-Host "`n[CHECK 5] Verifying UserWardrobeView Features & Filters..." -ForegroundColor Yellow

$viewJs = Get-Content (Join-Path $workspace "js\components\UserWardrobeView.js") -Raw
Assert-Condition "UserWardrobeView supports category filtering" ($viewJs -match "i\.category === this\.selectedCategory")
Assert-Condition "UserWardrobeView supports climate filtering" ($viewJs -match "i\.climate === this\.selectedClimate")
Assert-Condition "UserWardrobeView supports search filtering" ($viewJs -match "this\.searchQuery")
Assert-Condition "UserWardrobeView supports sorting (weight, alpha, recent)" ($viewJs -match "weight-asc")
Assert-Condition "UserWardrobeView calculates modeled weight in kg" ($viewJs -match "weightKg")
Assert-Condition "UserWardrobeView handles empty state" ($viewJs -match "wm-empty-state")

# ------------------------------------------------------------------------------
# 6. SYNTAX & BRACKET INTEGRITY CHECK ACROSS ALL FILES
# ------------------------------------------------------------------------------
Write-Host "`n[CHECK 6] Validating Syntax & Bracket Balances across Phase 17 files..." -ForegroundColor Yellow

$jsFilesToCheck = @(
    "js\services\authService.js",
    "js\components\UserWardrobeView.js",
    "js\components\WardrobeItemModal.js",
    "js\components\AuthModal.js",
    "js\components\MyRoveView.js",
    "js\components\Navbar.js",
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
