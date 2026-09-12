$guid = [Guid]::NewGuid().ToString()
$index = Invoke-WebRequest -Uri "https://yashvohra50-blip.github.io/Rove/index.html?nocache=$guid" -UseBasicParsing
$css = Invoke-WebRequest -Uri "https://yashvohra50-blip.github.io/Rove/css/editorial.css?nocache=$guid" -UseBasicParsing
$js = Invoke-WebRequest -Uri "https://yashvohra50-blip.github.io/Rove/js/components/StorySection.js?nocache=$guid" -UseBasicParsing

Write-Host "Index Status: $($index.StatusCode)"
Write-Host "Index has preconnect: $($index.Content.Contains('images.unsplash.com'))"
Write-Host "Index has fetchpriority: $($index.Content.Contains('fetchpriority'))"
Write-Host "CSS Status: $($css.StatusCode)"
Write-Host "CSS has mobile pieces grid (2 1fr): $($css.Content.Contains('grid-template-columns: repeat(2, 1fr)'))"
Write-Host "CSS has formula 2x2: $($css.Content.Contains('grid-template-columns: repeat(2, 1fr);'))"
Write-Host "JS Status: $($js.StatusCode)"
Write-Host "JS has setupMobileObserver: $($js.Content.Contains('setupMobileObserver'))"
