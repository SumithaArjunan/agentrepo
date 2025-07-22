# Azure DevOps Task Creation Guide

## Task Details
This document provides instructions for creating the required Azure DevOps task in the SumithaArjunan organization.

### Task Information
- **Organization**: SumithaArjunan
- **Project**: AgentPOC
- **Title**: Refactor Login Module
- **Description**: Clean up legacy code, add validation, and improve error handling.
- **Work Item Type**: Task

## Method 1: Using Azure CLI

If you have Azure CLI installed and configured:

```bash
# Configure the default organization
az devops configure --defaults organization=https://dev.azure.com/SumithaArjunan project=AgentPOC

# Login with your PAT (Personal Access Token)
echo "YOUR_PAT_TOKEN" | az devops login

# Create the task
az boards work-item create \
  --title "Refactor Login Module" \
  --type "Task" \
  --description "Clean up legacy code, add validation, and improve error handling."
```

## Method 2: Using Azure DevOps REST API

You can create the task using a direct REST API call:

```bash
curl -X POST \
  -H "Content-Type: application/json-patch+json" \
  -H "Authorization: Basic $(echo -n :YOUR_PAT_TOKEN | base64)" \
  "https://dev.azure.com/SumithaArjunan/AgentPOC/_apis/wit/workitems/\$Task?api-version=7.0" \
  -d '[
    {
      "op": "add",
      "path": "/fields/System.Title",
      "value": "Refactor Login Module"
    },
    {
      "op": "add", 
      "path": "/fields/System.Description",
      "value": "Clean up legacy code, add validation, and improve error handling."
    }
  ]'
```

## Method 3: Using Python Script

Run the provided Python script:

```bash
python3 create-ado-task.py
```

This script uses the `requests` library to make the REST API call. Install requests if needed:

```bash
pip install requests
```

## Method 4: Using Azure DevOps Web Interface

1. Navigate to: https://dev.azure.com/SumithaArjunan/AgentPOC
2. Go to "Boards" → "Work items"
3. Click "New Work Item" → "Task"
4. Fill in the details:
   - **Title**: Refactor Login Module
   - **Description**: Clean up legacy code, add validation, and improve error handling.
5. Click "Save"

## Notes

- The Personal Access Token configured in the MCP configuration has the necessary permissions
- The task will be created in the AgentPOC project under the SumithaArjunan organization
- This task is part of issue #17 resolution