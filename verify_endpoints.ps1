$endpoints = @(
    "/",
    "/index.html",
    "/css/tokens.css",
    "/css/base.css",
    "/css/components.css",
    "/css/hero.css",
    "/css/editorial.css",
    "/css/builder.css",
    "/css/wardrobe.css",
    "/css/clothing.css",
    "/css/footwear.css",
    "/css/transitions.css",
    "/js/app.js",
    "/js/router.js",
    "/js/store.js",
    "/js/data/mockData.js",
    "/js/components/Navbar.js",
    "/js/components/Hero.js",
    "/js/components/ProblemSection.js",
    "/js/components/StorySection.js",
    "/js/components/KillerIdeaSection.js",
    "/js/components/ExperienceModules.js",
    "/js/components/TripBuilder.js",
    "/js/components/WardrobeResult.js",
    "/js/components/ClothingView.js",
    "/js/components/FootwearView.js",
    "/js/components/Footer.js",
    "/js/components/ToastModal.js",
    "/js/components/AuthModal.js",
    "/js/components/MyRoveView.js",
    "/js/components/UserWardrobeView.js",
    "/js/components/WardrobeItemModal.js",
    "/js/services/authService.js",
    "/js/services/tripIntelligenceEngine.js",
    "/js/services/outfitEngine.js",
    "/css/auth.css",
    "/css/wardrobe-manager.css"
)

$port = 8090
$allSuccess = $true

Write-Host "=== VERIFYING ROVE APPLICATION STATIC & SCRIPT ENDPOINTS (Port $port) ===" -ForegroundColor Cyan

foreach ($ep in $endpoints) {
    try {
        $uri = "http://localhost:$port$ep"
        $res = Invoke-WebRequest -Uri $uri -UseBasicParsing -TimeoutSec 5
        if ($res.StatusCode -eq 200) {
            Write-Host "[200 OK] $ep ($($res.Content.Length) bytes)" -ForegroundColor Green
        } else {
            Write-Host "[$($res.StatusCode)] $ep" -ForegroundColor Yellow
            $allSuccess = $false
        }
    } catch {
        Write-Host "[FAILED] $ep : $_" -ForegroundColor Red
        $allSuccess = $false
    }
}

if ($allSuccess) {
    Write-Host "`nSUCCESS: All 28 core ROVE assets and modules serve 200 OK with zero errors!" -ForegroundColor Green
} else {
    Write-Host "`nWARNING: Some endpoints failed." -ForegroundColor Red
}
