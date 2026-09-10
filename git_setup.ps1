$git = "C:\Users\Yash Vohra\.gemini\antigravity-ide\scratch\tools\git\cmd\git.exe"
$repo = "C:\Users\Yash Vohra\.gemini\antigravity-ide\scratch\rove"

Write-Host "Initializing Git in $repo..."
& $git -C $repo init
& $git -C $repo config user.name "Yash Vohra"
& $git -C $repo config user.email "yashvohra@users.noreply.github.com"
& $git -C $repo add .
& $git -C $repo commit -m "feat: complete Phase 1 frontend foundation for ROVE travel wardrobe intelligence system"
& $git -C $repo branch -M main

# Set remote origin
& $git -C $repo remote remove origin 2>$null
& $git -C $repo remote add origin https://github.com/yashvohra50-blip/Rove.git

Write-Host "Local Git status:"
& $git -C $repo status
Write-Host "Git commit log:"
& $git -C $repo log -n 1
