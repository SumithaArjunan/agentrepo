# PowerShell script to create Azure DevOps Task
# Usage: .\create-ado-task.ps1

param(
    [string]$Organization = "SumithaArjunan",
    [string]$Project = "AgentPOC",
    [string]$PAT = "eeyLNJoKPRL1GC73b1vFhcRToUrFDVCryqeBovChj2qJI87Q9gj5JQQJ99BGACAAAAA9nnGqAAASAZDO1oxN"
)

# Task details
$TaskTitle = "Refactor Login Module"
$TaskDescription = "Clean up legacy code, add validation, and improve error handling."

# Create base64 encoded authentication header
$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(":$PAT"))

# API endpoint
$uri = "https://dev.azure.com/$Organization/$Project/_apis/wit/workitems/`$Task?api-version=7.0"

# Request body
$body = @(
    @{
        op = "add"
        path = "/fields/System.Title"
        value = $TaskTitle
    },
    @{
        op = "add"
        path = "/fields/System.Description"
        value = $TaskDescription
    }
) | ConvertTo-Json

# Headers
$headers = @{
    "Authorization" = "Basic $base64AuthInfo"
    "Content-Type" = "application/json-patch+json"
}

try {
    Write-Host "Creating Azure DevOps Task..." -ForegroundColor Yellow
    Write-Host "Organization: $Organization" -ForegroundColor Cyan
    Write-Host "Project: $Project" -ForegroundColor Cyan
    Write-Host "Title: $TaskTitle" -ForegroundColor Cyan
    
    $response = Invoke-RestMethod -Uri $uri -Method Post -Headers $headers -Body $body
    
    Write-Host "✅ Task created successfully!" -ForegroundColor Green
    Write-Host "Task ID: $($response.id)" -ForegroundColor Green
    Write-Host "Task URL: $($response._links.html.href)" -ForegroundColor Green
    
    return $response
}
catch {
    Write-Host "❌ Error creating task:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    throw
}