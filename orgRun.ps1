# 1. מתקין git-ai
irm http://usegitai.com/install.ps1 | iex

# 2. קונפיג git-ai
$configDir = "$env:USERPROFILE\.git-ai"
$configPath = "$configDir\config.json"
New-Item -ItemType Directory -Force -Path $configDir | Out-Null

@"
{
    "git_path": "C:\\Program Files\\Git\\cmd\\git-og.exe",
    "prompt_storage": "notes",
    "telemetry_oss": "off",
    "allow_repositories": ["https://github.com/nice-cxone/*"],
    "disable_auto_updates": true,
    "disable_version_checks": true,
    "quiet": true
}
"@ | Set-Content -Path $configPath

# 3. קונפיג git גלובלי - דחיפת notes אוטומטית
git config --global --add remote.origin.push 'refs/notes/*'

# 4. מתקין hooks לAgent
git-ai install-hooks