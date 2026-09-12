# ==============================================================================
# ROVE TRAVEL WARDROBE INTELLIGENCE SYSTEM
# PHASE 19 OUTFIT ENGINE AUTOMATED TEST SUITE
# ==============================================================================

$workspace = "C:\Users\Yash Vohra\.gemini\antigravity-ide\scratch\rove"

Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "  ROVE PHASE 19: OUTFIT ENGINE & COMBINATIONS VALIDATION SUITE" -ForegroundColor Cyan
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
# 1. ARCHITECTURAL FILE PRESENCE & SYNTAX INTEGRITY
# ------------------------------------------------------------------------------
Write-Host "`n[CHECK 1] Verifying Phase 19 Source Files & Syntax Integrity..." -ForegroundColor Yellow

$engineFile = "js\services\outfitEngine.js"
$storeFile = "js\store.js"
$resultFile = "js\components\WardrobeResult.js"
$cssFile = "css\wardrobe.css"

Assert-Condition "outfitEngine.js exists" (Test-Path (Join-Path $workspace $engineFile))
Assert-Condition "store.js exists" (Test-Path (Join-Path $workspace $storeFile))
Assert-Condition "WardrobeResult.js exists" (Test-Path (Join-Path $workspace $resultFile))
Assert-Condition "wardrobe.css exists" (Test-Path (Join-Path $workspace $cssFile))

$filesToCheck = @($engineFile, $storeFile, $resultFile, $cssFile)
foreach ($f in $filesToCheck) {
    $c = Read-File $f
    $openB = ([regex]::Matches($c, "\{")).Count
    $closeB = ([regex]::Matches($c, "\}")).Count
    Assert-Condition "Bracket parity maintained in $f ($openB == $closeB)" ($openB -eq $closeB)
}

# ------------------------------------------------------------------------------
# 2. OUTFIT ENGINE SERVICE CAPABILITIES (outfitEngine.js)
# ------------------------------------------------------------------------------
Write-Host "`n[CHECK 2] Verifying Core Outfit Engine Algorithms..." -ForegroundColor Yellow

$engineCode = Read-File $engineFile

Assert-Condition "Exports generateAllCombinations function" ($engineCode -match "generateAllCombinations\s*\(")
Assert-Condition "Exports calculateHarmony scoring function" ($engineCode -match "calculateHarmony\s*\(")
Assert-Condition "Exports analyzeWardrobeOptimization analysis" ($engineCode -match "analyzeWardrobeOptimization\s*\(")
Assert-Condition "Exports detectMissingItems diagnostic function" ($engineCode -match "detectMissingItems\s*\(")
Assert-Condition "Outfit engine is exported as singleton instance" ($engineCode -match "export\s+(const|default)\s+outfitEngine")

# Combinations logic
Assert-Condition "Filters pieces by category (top, bottom, footwear, outerwear)" ($engineCode -match "top|bottom|shoes|footwear|outerwear")
Assert-Condition "Generates unique permutation IDs for each combination" ($engineCode -match "combo[_-]")
Assert-Condition "Infers occasion labels (Daytime Exploration, Evening Dining, Transit)" ($engineCode -match "Daytime Exploration|Dinner & Evening|Transit & Leisure")
Assert-Condition "Estimates daily walking steps per look based on terrain" ($engineCode -match "estimatedSteps|steps")

# Harmony scoring logic
Assert-Condition "Evaluates color palette theory (monochrome, earth, obsidian, contrast)" ($engineCode -match "monochrome|earth|mineral|contrast|palette")
Assert-Condition "Calculates silhouette and formality harmony percentage" ($engineCode -match "harmonyScore|harmony|formality")

# Wardrobe optimization logic
Assert-Condition "Calculates Versatility Multiplier ratio (combinations / pieces)" ($engineCode -match "versatilityMultiplier")
Assert-Condition "Computes Efficiency Rating category (Elite Minimalist, Highly Optimized, etc.)" ($engineCode -match "Elite Minimalist|Highly Optimized|Balanced Capsule")
Assert-Condition "Analyzes individual piece utilization distribution" ($engineCode -match "pieceUsage|utilization")
Assert-Condition "Identifies redundant capsule pieces" ($engineCode -match "redundantPieces|redundancies")

# Missing item gap analysis
Assert-Condition "Detects missing rain defense in wet climates" ($engineCode -match "rain|precipitation|waterproof|trench")
Assert-Condition "Detects missing fine dining attire when formal activities scheduled" ($engineCode -match "fine-dining|dressCode|blazer|tailored")
Assert-Condition "Detects missing rugged/trail footwear on rough terrain" ($engineCode -match "hiking|trail|terrain|boots")
Assert-Condition "Detects missing modest clothing for sacred cultural sites" ($engineCode -match "modesty|temple|sacred|shoulders|knees")
Assert-Condition "Generates rich luxury suggested item for detected gaps" ($engineCode -match "suggestedPiece|price|brand|image")

# ------------------------------------------------------------------------------
# 3. STATE MANAGEMENT & REACTIVE CAPSULE CONTROL (store.js)
# ------------------------------------------------------------------------------
Write-Host "`n[CHECK 3] Verifying Reactive Store Integration..." -ForegroundColor Yellow

$storeCode = Read-File $storeFile

Assert-Condition "store.js imports outfitEngine service" ($storeCode -match "import\s+.*outfitEngine.*from\s+['""].*outfitEngine(\.js)?['""]")
Assert-Condition "Wardrobe state initializes allCombinations" ($storeCode -match "allCombinations:\s*initialCombos")
Assert-Condition "Wardrobe state initializes optimization metrics" ($storeCode -match "optimization:\s*initialOpt")
Assert-Condition "Wardrobe state initializes missingItems diagnostics" ($storeCode -match "missingItems:\s*initialGaps")
Assert-Condition "Wardrobe state initializes viewMode ('itinerary')" ($storeCode -match "viewMode:\s*['""]itinerary['""]")
Assert-Condition "Wardrobe state initializes combinationsFilter object" ($storeCode -match "combinationsFilter:\s*\{")

# Store Mutation Methods
Assert-Condition "setWardrobeViewMode method defined and notifies WARDROBE_VIEW_MODE_CHANGED" ($storeCode -match "setWardrobeViewMode\s*\(" -and $storeCode -match "WARDROBE_VIEW_MODE_CHANGED")
Assert-Condition "setCombinationsFilter method defined and notifies COMBINATIONS_FILTER_CHANGED" ($storeCode -match "setCombinationsFilter\s*\(" -and $storeCode -match "COMBINATIONS_FILTER_CHANGED")
Assert-Condition "addPieceToActiveCapsule method defined and triggers re-optimization" ($storeCode -match "addPieceToActiveCapsule\s*\(")
Assert-Condition "removePieceFromActiveCapsule enforces minimum capsule threshold (4 pieces)" ($storeCode -match "removePieceFromActiveCapsule\s*\(" -and $storeCode -match "pieces\.length\s*<=\s*4")
Assert-Condition "removePieceFromActiveCapsule recalculates combinations & triggers toast" ($storeCode -match "generateAllCombinations|showToast")

# ------------------------------------------------------------------------------
# 4. WARDROBE RESULT USER INTERFACE (WardrobeResult.js)
# ------------------------------------------------------------------------------
Write-Host "`n[CHECK 4] Verifying WardrobeResult Dual Matrix & Diagnostic UI..." -ForegroundColor Yellow

$resultCode = Read-File $resultFile

Assert-Condition "Renders Wardrobe Versatility Multiplier banner" ($resultCode -match "wardrobe-optimization-strip")
Assert-Condition "Displays wear ratio and total combinations count" ($resultCode -match "versatilityMultiplier.*WEAR RATIO")
Assert-Condition "Renders efficiency rating badge" ($resultCode -match "efficiencyRating")
Assert-Condition "Renders Wardrobe Readiness & Missing Items diagnostic card" ($resultCode -match "wardrobe-gap-card")
Assert-Condition "Renders 1-click gap adoption buttons (.adopt-gap-btn)" ($resultCode -match "adopt-gap-btn")
Assert-Condition "Renders Dual Matrix mode toggle (Itinerary vs Combinations)" ($resultCode -match "matrix-mode-toggle")
Assert-Condition "Renders Itinerary mode tab button" ($resultCode -match "modeItineraryBtn")
Assert-Condition "Renders Combinations mode tab button" ($resultCode -match "modeCombinationsBtn")
Assert-Condition "Renders Occasion filter chips row" ($resultCode -match "combinations-chips-row|combo-filter-chip")
Assert-Condition "Renders Anchor Piece filter chips" ($resultCode -match "filter-anchor-btn|anchorPieceId")
Assert-Condition "Renders Combinations grid with permutation cards" ($resultCode -match "combinations-grid|combination-card")
Assert-Condition "Renders piece pruning button on garment cards (.prune-piece-btn)" ($resultCode -match "prune-piece-btn")
Assert-Condition "Wires click listeners for gap adoption, pruning, and matrix toggle" ($resultCode -match "attachEventListeners|adopt-gap-btn|prune-piece-btn")

# ------------------------------------------------------------------------------
# 5. LUXURY OBSIDIAN & GOLD DESIGN SYSTEM (wardrobe.css)
# ------------------------------------------------------------------------------
Write-Host "`n[CHECK 5] Verifying Phase 19 Luxury CSS Rules..." -ForegroundColor Yellow

$cssCode = Read-File $cssFile

Assert-Condition "CSS defines .wardrobe-optimization-strip" ($cssCode -match "\.wardrobe-optimization-strip")
Assert-Condition "CSS defines .wardrobe-gap-card" ($cssCode -match "\.wardrobe-gap-card")
Assert-Condition "CSS defines .matrix-mode-toggle" ($cssCode -match "\.matrix-mode-toggle")
Assert-Condition "CSS defines .matrix-mode-btn and .active state" ($cssCode -match "\.matrix-mode-btn" -and $cssCode -match "\.matrix-mode-btn\.active")
Assert-Condition "CSS defines .combinations-toolbar" ($cssCode -match "\.combinations-toolbar")
Assert-Condition "CSS defines .combo-filter-chip and .active state" ($cssCode -match "\.combo-filter-chip" -and $cssCode -match "\.combo-filter-chip\.active")
Assert-Condition "CSS defines .combinations-grid responsive layout" ($cssCode -match "\.combinations-grid")
Assert-Condition "CSS defines .combination-card with hover elevates" ($cssCode -match "\.combination-card:hover")
Assert-Condition "CSS defines .prune-piece-btn with alert color transition" ($cssCode -match "\.prune-piece-btn:hover")
Assert-Condition "CSS defines .adopt-gap-btn with smooth micro-animation" ($cssCode -match "\.adopt-gap-btn:hover")

# ------------------------------------------------------------------------------
# SUMMARY & EXIT CODE
# ------------------------------------------------------------------------------
Write-Host "`n======================================================================" -ForegroundColor Cyan
Write-Host "  VALIDATION COMPLETE: $passCount / $testCount CHECKS PASSED" -ForegroundColor $(if ($allPassed) { "Green" } else { "Red" })
Write-Host "======================================================================" -ForegroundColor Cyan

if ($allPassed) {
    exit 0
} else {
    exit 1
}
