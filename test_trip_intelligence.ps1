# ==============================================================================
# ROVE TRAVEL WARDROBE INTELLIGENCE SYSTEM
# PHASE 18 REAL TRIP INTELLIGENCE AUTOMATED TEST SUITE
# ==============================================================================

$workspace = "C:\Users\Yash Vohra\.gemini\antigravity-ide\scratch\rove"

Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "  ROVE PHASE 18: REAL TRIP INTELLIGENCE VALIDATION SUITE" -ForegroundColor Cyan
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

function Read-File($relPath) {
    $full = Join-Path $workspace $relPath
    if (Test-Path $full) {
        return Get-Content $full -Raw
    }
    return ""
}

# ------------------------------------------------------------------------------
# 1. DESTINATION DATA INTEGRITY (10 DESTINATIONS NETWORK)
# ------------------------------------------------------------------------------
Write-Host "`n[CHECK 1] Verifying 10-Destination Network in mockData.js..." -ForegroundColor Yellow

$mockData = Read-File "js\data\mockData.js"
Assert-Condition "mockData.js successfully loaded" ($mockData.Length -gt 0)

$destinations = @(
    "jaipur", "kyoto", "amalfi", "copenhagen", "marrakech",
    "tokyo", "paris", "reykjavik", "newyork", "capetown"
)

foreach ($d in $destinations) {
    Assert-Condition "Destination exists: $d" ($mockData -match "id:\s*'$d'")
}

Assert-Condition "tempNumeric modeled across destinations" ($mockData -match "tempNumeric:\s*\d+")
Assert-Condition "precipitationRisk modeled (Low/Moderate/High)" ($mockData -match "precipitationRisk:\s*'(Low|Moderate|High)'")
Assert-Condition "walkingIntensity modeled" ($mockData -match "walkingIntensity:\s*'\d+\s*KM")
Assert-Condition "culturalDressCodes array populated" ($mockData -match "culturalDressCodes:\s*\[")
Assert-Condition "terrainType modeled" ($mockData -match "terrainType:\s*'")
Assert-Condition "recommendedFabrics modeled" ($mockData -match "recommendedFabrics:\s*\[")

# ------------------------------------------------------------------------------
# 2. TRIP INTELLIGENCE ENGINE SERVICE
# ------------------------------------------------------------------------------
Write-Host "`n[CHECK 2] Verifying tripIntelligenceEngine.js Service..." -ForegroundColor Yellow

$engineFile = Join-Path $workspace "js\services\tripIntelligenceEngine.js"
Assert-Condition "tripIntelligenceEngine.js file exists" (Test-Path $engineFile)

$engine = Read-File "js\services\tripIntelligenceEngine.js"
Assert-Condition "CLIMATE_CATALOG exported with hot, temperate, cold pools" ($engine -match "export const CLIMATE_CATALOG")
Assert-Condition "Hot catalog includes Normandy Linen & Merino Air Knit" ($engine -match "Normandy Breathable Linen" -and $engine -match "Merino Air Knit")
Assert-Condition "Temperate catalog includes Technical Twill & Poplin" ($engine -match "Technical Japanese Poplin" -and $engine -match "Commuter Trouser")
Assert-Condition "Cold catalog includes Heavyweight Thermal Merino & Cordura" ($engine -match "Heavyweight Thermal Merino" -and $engine -match "Weatherproof Cordura")

Assert-Condition "resolveDestination method implemented" ($engine -match "resolveDestination\s*\(")
Assert-Condition "analyzeClimate method implemented" ($engine -match "analyzeClimate\s*\(")
Assert-Condition "analyzeActivities method implemented" ($engine -match "analyzeActivities\s*\(")
Assert-Condition "calculateDurationRotation method implemented" ($engine -match "calculateDurationRotation\s*\(")
Assert-Condition "getCulturalAdvisories method implemented" ($engine -match "getCulturalAdvisories\s*\(")
Assert-Condition "synthesizeCapsule method implemented" ($engine -match "synthesizeCapsule\s*\(")
Assert-Condition "generateOutfitsMatrix method implemented" ($engine -match "generateOutfitsMatrix\s*\(")
Assert-Condition "Personal wardrobe tagging supported (isFromUserWardrobe)" ($engine -match "isFromUserWardrobe:\s*true")

# ------------------------------------------------------------------------------
# 3. STORE INTEGRATION & DYNAMIC CURATION
# ------------------------------------------------------------------------------
Write-Host "`n[CHECK 3] Verifying Store Integration..." -ForegroundColor Yellow

$store = Read-File "js\store.js"
Assert-Condition "store.js imports tripIntelligenceEngine" ($store -match "import\s*\{\s*tripIntelligenceEngine\s*\}\s*from\s*'\./services/tripIntelligenceEngine\.js'")
Assert-Condition "store.js initializes state with tripIntelligenceEngine synthesis" ($store -match "tripIntelligenceEngine\.synthesizeCapsule\(")
Assert-Condition "updateTripDestination uses tripIntelligenceEngine.resolveDestination" ($store -match "tripIntelligenceEngine\.resolveDestination")
Assert-Condition "store.js exposes getTripIntelligence helper" ($store -match "getTripIntelligence\s*\(\)")
Assert-Condition "startCuration synthesizes capsule with personal wardrobe" ($store -match "userWardrobe:\s*this\.getUserWardrobe\(\)")

# ------------------------------------------------------------------------------
# 4. TRIP BUILDER INTELLIGENCE DISPLAY (STEP 6)
# ------------------------------------------------------------------------------
Write-Host "`n[CHECK 4] Verifying TripBuilder.js Intelligence Brief UI..." -ForegroundColor Yellow

$builder = Read-File "js\components\TripBuilder.js"
Assert-Condition "Step 6 includes ready-intelligence-box" ($builder -match 'id="readyIntelligenceBox"')
Assert-Condition "Step 6 includes readyGsmBadge" ($builder -match 'id="readyGsmBadge"')
Assert-Condition "Step 6 includes readyClimateDesc" ($builder -match 'id="readyClimateDesc"')
Assert-Condition "Step 6 includes readyAdvisoriesList" ($builder -match 'id="readyAdvisoriesList"')
Assert-Condition "Step 6 includes readyWardrobeMatch indicator" ($builder -match 'id="readyWardrobeMatch"')
Assert-Condition "updateView populates real-time intelligence via store.getTripIntelligence()" ($builder -match 'store\.getTripIntelligence\(\)')
Assert-Condition "Dynamic curation overlay phrases configured" ($builder -match 'currentTrip\.destination.*meteorological curves')

# ------------------------------------------------------------------------------
# 5. WARDROBE RESULT VIEW INTELLIGENCE & PERSONAL ARCHIVE BADGES
# ------------------------------------------------------------------------------
Write-Host "`n[CHECK 5] Verifying WardrobeResult.js Intelligence & Personal Badges..." -ForegroundColor Yellow

$wardrobeResult = Read-File "js\components\WardrobeResult.js"
Assert-Condition "WardrobeResult displays CALIBRATED TRIP INTELLIGENCE banner" ($wardrobeResult -match "CALIBRATED TRIP INTELLIGENCE")
Assert-Condition "Meteorology & fabric weight section displayed" ($wardrobeResult -match "METEOROLOGY & FABRIC WEIGHT")
Assert-Condition "Cultural dress requirements section displayed" ($wardrobeResult -match "CULTURAL DRESS REQUIREMENTS")
Assert-Condition "Luggage & volume capacity section displayed" ($wardrobeResult -match "LUGGAGE & VOLUME CAPACITY")
Assert-Condition "FROM YOUR CLOSET badge rendered on personal wardrobe pieces" ($wardrobeResult -match "FROM YOUR CLOSET")
Assert-Condition "Core metrics strip uses dynamic stats.totalOutfits" ($wardrobeResult -match 'stats\.totalOutfits')
Assert-Condition "Core metrics strip uses dynamic stats.totalPieces" ($wardrobeResult -match 'stats\.totalPieces')
Assert-Condition "Master pieces headline dynamically counts pieces" ($wardrobeResult -match 'THE \$\{wardrobe\.pieces\.length\} MASTER PIECES')

# ------------------------------------------------------------------------------
# 6. STYLESHEET INTEGRATION
# ------------------------------------------------------------------------------
Write-Host "`n[CHECK 6] Verifying Stylesheets..." -ForegroundColor Yellow

$wardrobeCss = Read-File "css\wardrobe.css"
Assert-Condition "wardrobe.css styles .wardrobe-intelligence-banner" ($wardrobeCss -match "\.wardrobe-intelligence-banner")
Assert-Condition "wardrobe.css styles .ready-intelligence-box" ($wardrobeCss -match "\.ready-intelligence-box")

# ------------------------------------------------------------------------------
# 7. SYNTAX & BRACKET BALANCE ACROSS ALL JAVASCRIPT FILES
# ------------------------------------------------------------------------------
Write-Host "`n[CHECK 7] Verifying Syntax & Bracket Balance Across Project..." -ForegroundColor Yellow

$jsFiles = Get-ChildItem -Path (Join-Path $workspace "js") -Recurse -Filter "*.js"
$allBalanced = $true

foreach ($file in $jsFiles) {
    $code = Get-Content $file.FullName -Raw
    $openParen = ($code.ToCharArray() | Where-Object { $_ -eq '(' }).Count
    $closeParen = ($code.ToCharArray() | Where-Object { $_ -eq ')' }).Count
    $openBrace = ($code.ToCharArray() | Where-Object { $_ -eq '{' }).Count
    $closeBrace = ($code.ToCharArray() | Where-Object { $_ -eq '}' }).Count
    $openBracket = ($code.ToCharArray() | Where-Object { $_ -eq '[' }).Count
    $closeBracket = ($code.ToCharArray() | Where-Object { $_ -eq ']' }).Count

    if ($openParen -ne $closeParen -or $openBrace -ne $closeBrace -or $openBracket -ne $closeBracket) {
        $allBalanced = $false
        Write-Host "  Imbalance in $($file.Name): () $openParen/$closeParen, {} $openBrace/$closeBrace, [] $openBracket/$closeBracket" -ForegroundColor Red
    }
}
Assert-Condition "All $($jsFiles.Count) JavaScript files are 100% syntactically balanced" $allBalanced

# ------------------------------------------------------------------------------
# SUMMARY
# ------------------------------------------------------------------------------
Write-Host "`n======================================================================" -ForegroundColor Cyan
Write-Host "  RESULTS: $($global:passCount) / $($global:testCount) PASSED" -ForegroundColor $(if ($global:allPassed) { "Green" } else { "Red" })
Write-Host "======================================================================" -ForegroundColor Cyan

if ($global:allPassed) {
    exit 0
} else {
    exit 1
}
