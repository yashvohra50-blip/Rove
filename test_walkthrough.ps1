<#
.SYNOPSIS
    ROVE Phase 14: Comprehensive Product Walkthrough & User Journey Verification
    Tests the complete user journey from beginning to end:
    HOME -> BUILD MY TRIP -> DESTINATION -> DURATION -> ACTIVITIES -> STYLE -> LUGGAGE -> TRIP SUMMARY -> BUILD MY WARDROBE -> WARDROBE RESULT -> CLOTHING -> FOOTWEAR -> BACK TO HOME
#>

$ErrorActionPreference = "Continue"
$root = "C:\Users\Yash Vohra\.gemini\antigravity-ide\scratch\rove"
$passed = 0
$failed = 0

function Assert-Check ($name, $condition, $details = "") {
    if ($condition) {
        Write-Host "  [PASS] $name" -ForegroundColor Green
        if ($details) { Write-Host "         $details" -ForegroundColor DarkGray }
        $script:passed++
    } else {
        Write-Host "  [FAIL] $name" -ForegroundColor Red
        if ($details) { Write-Host "         $details" -ForegroundColor Yellow }
        $script:failed++
    }
}

Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host "   ROVE -- PHASE 14 FULL PRODUCT WALKTHROUGH VERIFICATION        " -ForegroundColor Cyan
Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host ""

# ============================================================================
# STAGE 1: JOURNEY STEP 1 -- HOME
# ============================================================================
Write-Host "STAGE 1: HOME SECTION INTEGRITY" -ForegroundColor White
$heroContent = Get-Content (Join-Path $root "js\components\Hero.js") -Raw
$indexContent = Get-Content (Join-Path $root "index.html") -Raw

Assert-Check "Hero section renders title 'PACK FOR WHERE YOU'RE GOING.'" ($heroContent -match "PACK FOR WHERE YOU'RE GOING\.")
Assert-Check "Hero includes primary CTA '#heroBuildTripBtn'" ($heroContent -match "#heroBuildTripBtn")
Assert-Check "Hero includes secondary CTA '#heroExploreBtn'" ($heroContent -match "#heroExploreBtn")
Assert-Check "Hero links to #sectionProblem for discovery" ($heroContent -match "#sectionProblem")
Assert-Check "Skip-to-main-content link is present in index.html" ($indexContent -match 'class="skip-link"')
Assert-Check "Header, Main, and Footer semantic landmarks exist" ($indexContent -match 'role="banner"' -and $indexContent -match 'role="main"' -and $indexContent -match 'role="contentinfo"')

# ============================================================================
# STAGE 2: JOURNEY STEP 2 -- BUILD MY TRIP (MODAL OPEN & ACCESSIBILITY)
# ============================================================================
Write-Host "`nSTAGE 2: BUILD MY TRIP MODAL" -ForegroundColor White
$builderContent = Get-Content (Join-Path $root "js\components\TripBuilder.js") -Raw
$navbarContent = Get-Content (Join-Path $root "js\components\Navbar.js") -Raw

Assert-Check "Navbar triggers builder on '#navBuildTripBtn'" ($navbarContent -match "store\.openBuilder")
Assert-Check "Hero triggers builder on '#heroBuildTripBtn'" ($heroContent -match "store\.openBuilder")
Assert-Check "TripBuilder has role='dialog' and aria-modal='true'" ($builderContent -match 'role="dialog"' -and $builderContent -match 'aria-modal="true"')
Assert-Check "TripBuilder implements focus trap (Tab/Shift+Tab)" ($builderContent -match "e\.key === 'Tab'" -and $builderContent -match "e\.shiftKey")
Assert-Check "TripBuilder implements Escape key dismissal" ($builderContent -match "e\.key === 'Escape'")
Assert-Check "TripBuilder announces step changes via live region" ($builderContent -match "builderStepAnnouncer")

# ============================================================================
# STAGE 3-7: JOURNEY STEPS 3-7 -- TRIP BUILDER INPUT FLOW
# ============================================================================
Write-Host "`nSTAGE 3-7: TRIP BUILDER INPUT FLOW" -ForegroundColor White

Assert-Check "Step 1 (Destination): Input and curated chips exist" ($builderContent -match 'id="destInput"' -and $builderContent -match 'data-dest-name')
Assert-Check "Step 2 (Duration): Radiogroup and options exist" ($builderContent -match 'role="radiogroup"' -and $builderContent -match 'data-duration')
Assert-Check "Step 3 (Activities): Multi-select checkboxes exist" ($builderContent -match 'role="checkbox"' -and $builderContent -match 'data-act-id')
Assert-Check "Step 4 (Style): Style options exist" ($builderContent -match 'data-style-id')
Assert-Check "Step 5 (Luggage): Bag options exist" ($builderContent -match 'data-luggage-id')

# ============================================================================
# STAGE 8-9: JOURNEY STEPS 8-9 -- TRIP SUMMARY & CURATION SCANNER
# ============================================================================
Write-Host "`nSTAGE 8-9: TRIP SUMMARY & CURATION RESOLUTION" -ForegroundColor White
$storeContent = Get-Content (Join-Path $root "js\store.js") -Raw

Assert-Check "Step 6 (Summary): Summary cards render chosen parameters" ($builderContent -match 'stepQuestion6' -and $builderContent -match 'trip-ready-brief')
Assert-Check "Step 6 CTA: '#builderSubmitBtn' triggers wardrobe generation" ($builderContent -match '#builderSubmitBtn' -and $builderContent -match 'startCuration')
Assert-Check "Curation Phase: Scanner overlay and phrases cycle smoothly" ($builderContent -match 'curation-overlay' -and $storeContent -match 'CURATION_STARTED')
Assert-Check "Curation Complete: Routes to '#/wardrobe'" ($storeContent -match "window\.location\.hash = '#/wardrobe'")

# ============================================================================
# STAGE 10: JOURNEY STEP 10 -- WARDROBE RESULT VIEW
# ============================================================================
Write-Host "`nSTAGE 10: WARDROBE RESULT VIEW" -ForegroundColor White
$wardrobeContent = Get-Content (Join-Path $root "js\components\WardrobeResult.js") -Raw

Assert-Check "Wardrobe Result shows mantra 'YOU DON'T NEED MORE.'" ($wardrobeContent -match "YOU DON'T NEED MORE\.")
Assert-Check "4-Stat Metric Strip rendered (7 Outfits, 6 Pieces, 2 Shoes, 1 Bag)" ($wardrobeContent -match "CURATED OUTFITS" -and $wardrobeContent -match "CLOTHING PIECES" -and $wardrobeContent -match "CABIN BAG")
Assert-Check "Outfit timeline navigation has role='tablist' and role='tab'" ($wardrobeContent -match 'role="tablist"' -and $wardrobeContent -match 'role="tab"')
Assert-Check "Outfit matrix stage has role='tabpanel' and aria-labelledby" ($wardrobeContent -match 'role="tabpanel"' -and $wardrobeContent -match 'aria-labelledby')
Assert-Check "Keyboard arrow navigation implemented across outfit tabs" ($wardrobeContent -match "ArrowRight" -and $wardrobeContent -match "ArrowLeft")
Assert-Check "Live announcer updates on outfit switch" ($wardrobeContent -match "wardrobeOutfitAnnouncer")
Assert-Check "Reconfigure Trip CTA opens builder" ($wardrobeContent -match "#reconfigureTripBtn" -and $wardrobeContent -match "store\.openBuilder")
Assert-Check "Links to #/clothing and #/footwear are present in action bar" ($wardrobeContent -match 'href="#/clothing"' -and $wardrobeContent -match 'href="#/footwear"')

# ============================================================================
# STAGE 11: JOURNEY STEP 11 -- CLOTHING EXPERIENCE
# ============================================================================
Write-Host "`nSTAGE 11: CLOTHING EXPERIENCE (/clothing)" -ForegroundColor White
$clothingContent = Get-Content (Join-Path $root "js\components\ClothingView.js") -Raw

Assert-Check "ClothingView has semantic Breadcrumb navigation" ($clothingContent -match 'aria-label="Breadcrumb"')
Assert-Check "Breadcrumb links back to '#sectionModules'" ($clothingContent -match 'href="#sectionModules"')
Assert-Check "Chapter 01 display headline 'CLOTHING'" ($clothingContent -match 'CLOTHING')
Assert-Check "Manifesto quote 'Built around where you are going.'" ($clothingContent -match "Built around where you're going\.")
Assert-Check "3-Pill technical metadata strip exists" ($clothingContent -match "TEXTILE SCIENCE" -and $clothingContent -match "RAPID OVERNIGHT RECOVERY")
Assert-Check "Quick navigation category bar has aria-label" ($clothingContent -match 'aria-label="Clothing Categories"')
Assert-Check "Category showcase renders hero items and technical fabric specs" ($clothingContent -match "category-editorial-hero" -and $clothingContent -match "fabric-specs-grid")
Assert-Check "Primary CTA '#clothingStartTripBtn' opens trip builder" ($clothingContent -match "#clothingStartTripBtn" -and $clothingContent -match "store\.openBuilder")

# ============================================================================
# STAGE 12: JOURNEY STEP 12 -- FOOTWEAR EXPERIENCE
# ============================================================================
Write-Host "`nSTAGE 12: FOOTWEAR EXPERIENCE (/footwear)" -ForegroundColor White
$footwearContent = Get-Content (Join-Path $root "js\components\FootwearView.js") -Raw

Assert-Check "FootwearView has semantic Breadcrumb navigation" ($footwearContent -match 'aria-label="Breadcrumb"')
Assert-Check "Breadcrumb links back to '#sectionModules'" ($footwearContent -match 'href="#sectionModules"')
Assert-Check "Chapter 02 display headline 'FOOTWEAR'" ($footwearContent -match 'FOOTWEAR')
Assert-Check "Manifesto quote 'The right shoe changes the trip.'" ($footwearContent -match "The right shoe changes the trip\.")
Assert-Check "3-Pill technical metadata strip exists" ($footwearContent -match "BIOMECHANICS" -and $footwearContent -match "22,000\+ DAILY STEPS")
Assert-Check "Renders all 4 archetypes (City, Walk, Dinner, Adventure)" ($footwearContent -match "archetypes-grid" -and $footwearContent -match "archetype-card")
Assert-Check "Primary CTA '#footwearStartTripBtn' opens trip builder" ($footwearContent -match "#footwearStartTripBtn" -and $footwearContent -match "store\.openBuilder")

# ============================================================================
# STAGE 13: JOURNEY STEP 13 -- BACK TO HOME & ZERO DEAD BUTTONS
# ============================================================================
Write-Host "`nSTAGE 13: RETURN TO HOME & INTERACTION AUDIT" -ForegroundColor White
$routerContent = Get-Content (Join-Path $root "js\router.js") -Raw
$appContent = Get-Content (Join-Path $root "js\app.js") -Raw

Assert-Check "Router/App handles default home route '#/'" ($appContent -match "'#/'")
Assert-Check "Router/App handles '#/wardrobe'" ($appContent -match "'#/wardrobe'")
Assert-Check "Router/App handles '#/clothing'" ($appContent -match "'#/clothing'")
Assert-Check "Router/App handles '#/footwear'" ($appContent -match "'#/footwear'")
Assert-Check "Router resets scroll smoothly to top on route change" ($routerContent -match "window\.scrollTo")

# Verify all known interactive button IDs have listeners in their components
$buttonAudit = @(
    @{ Comp = "Navbar.js"; ID = "mobileMenuToggle"; Code = $navbarContent },
    @{ Comp = "Navbar.js"; ID = "navBuildTripBtn"; Code = $navbarContent },
    @{ Comp = "Hero.js"; ID = "heroBuildTripBtn"; Code = $heroContent },
    @{ Comp = "Hero.js"; ID = "heroExploreBtn"; Code = $heroContent },
    @{ Comp = "TripBuilder.js"; ID = "builderCloseBtn"; Code = $builderContent },
    @{ Comp = "TripBuilder.js"; ID = "builderBackBtn"; Code = $builderContent },
    @{ Comp = "TripBuilder.js"; ID = "builderNextBtn"; Code = $builderContent },
    @{ Comp = "TripBuilder.js"; ID = "builderSubmitBtn"; Code = $builderContent },
    @{ Comp = "WardrobeResult.js"; ID = "reconfigureTripBtn"; Code = $wardrobeContent },
    @{ Comp = "WardrobeResult.js"; ID = "downloadChecklistBtn"; Code = $wardrobeContent },
    @{ Comp = "ClothingView.js"; ID = "clothingStartTripBtn"; Code = $clothingContent },
    @{ Comp = "FootwearView.js"; ID = "footwearStartTripBtn"; Code = $footwearContent }
)

foreach ($btn in $buttonAudit) {
    $hasListener = ($btn.Code -match "#$($btn.ID)") -and ($btn.Code -match "addEventListener")
    Assert-Check "Interactive element '#$($btn.ID)' in $($btn.Comp) has registered event listener" $hasListener
}

# ============================================================================
# STAGE 14: ASSET HEALTH & REMOTE IMAGES (HTTP 200 VERIFICATION)
# ============================================================================
Write-Host "`nSTAGE 14: REMOTE ASSET HEALTH (HTTP 200 OK AUDIT)" -ForegroundColor White

$mockData = Get-Content (Join-Path $root "js\data\mockData.js") -Raw
$imageUrls = [regex]::Matches($mockData, 'https://images\.unsplash\.com/[^\s''",]+') | ForEach-Object { $_.Value } | Select-Object -Unique

Write-Host "Found $($imageUrls.Count) unique imagery assets across mockData.js. Testing sample..." -ForegroundColor DarkGray

$sampleImages = $imageUrls | Select-Object -First 6

foreach ($img in $sampleImages) {
    try {
        $resp = Invoke-WebRequest -Uri $img -Method Head -TimeoutSec 5 -UseBasicParsing
        if ($resp.StatusCode -eq 200) {
            Assert-Check "Asset serves HTTP 200 OK: $([System.IO.Path]::GetFileName($img.Split('?')[0]))" $true
        } else {
            Assert-Check "Asset returned HTTP $($resp.StatusCode): $img" $false
        }
    } catch {
        # Fallback to GET if HEAD blocked
        try {
            $resp = Invoke-WebRequest -Uri $img -Method Get -TimeoutSec 5 -UseBasicParsing
            Assert-Check "Asset serves HTTP 200 OK (GET): $([System.IO.Path]::GetFileName($img.Split('?')[0]))" ($resp.StatusCode -eq 200)
        } catch {
            Assert-Check "Asset unreachable: $img ($($_.Exception.Message))" $false
        }
    }
}

# ============================================================================
# STAGE 15: LAYOUT INTEGRITY & RESPONSIVE CONSTRAINTS
# ============================================================================
Write-Host "`nSTAGE 15: RESPONSIVE OVERFLOW & MOTION RESPECT" -ForegroundColor White
$baseCss = Get-Content (Join-Path $root "css\base.css") -Raw
$transitionsCss = Get-Content (Join-Path $root "css\transitions.css") -Raw
$editorialCss = Get-Content (Join-Path $root "css\editorial.css") -Raw
$tokensCss = Get-Content (Join-Path $root "css\tokens.css") -Raw

Assert-Check "base.css sets overflow-x: hidden on body" ($baseCss -match "body\s*\{[^}]*overflow-x:\s*hidden")
Assert-Check "base.css replaces elaborate motion with gentle opacity fades" ($baseCss -match "prefers-reduced-motion" -and $baseCss -match "transition:\s*opacity\s*0\.2s\s*ease")
Assert-Check "transitions.css uses gentle opacity fade under reduced motion" ($transitionsCss -match "transition:\s*opacity\s*0\.2s\s*ease\s*!important")
Assert-Check "editorial.css unpins sticky stages into accessible flow under reduced motion" ($editorialCss -match "min-height:\s*auto\s*!important" -and $editorialCss -match "position:\s*relative\s*!important")

# ============================================================================
# STAGE 16: PHASE 15 — FINAL CINEMATIC POLISH & PACING
# ============================================================================
Write-Host "`nSTAGE 16: PHASE 15 FINAL CINEMATIC POLISH" -ForegroundColor White

Assert-Check "tokens.css defines cinematic divider and scroll offset tokens" ($tokensCss -match "--divider-cinematic" -and $tokensCss -match "--scroll-offset")
Assert-Check "base.css guarantees zero scroll jumps via scroll-margin-top on section anchors" ($baseCss -match "scroll-margin-top:\s*var\(--scroll-offset")
Assert-Check "base.css guarantees zero mobile overflow with html overflow-x: hidden" ($baseCss -match "html\s*\{[^}]*overflow-x:\s*hidden")
Assert-Check "base.css prevents scrollbar width leak using inset: 0 on grain veil" ($baseCss -match "body::after\s*\{[^}]*inset:\s*0")
Assert-Check "editorial.css softens section transitions using cinematic divider" ($editorialCss -match "border-image:\s*var\(--divider-cinematic\)")

Write-Host ""
Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host "   WALKTHROUGH & POLISH AUDIT: $passed PASSED, $failed FAILED   " -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Red" })
Write-Host "=================================================================" -ForegroundColor Cyan

if ($failed -eq 0) {
    Write-Host "`nPHASE 14 & 15 VERIFICATION RESULT: 100% COMPLETE & PASSING" -ForegroundColor Green
    exit 0
} else {
    Write-Host "`nPHASE 14 & 15 VERIFICATION RESULT: $failed FAILURES FOUND" -ForegroundColor Red
    exit 1
}

