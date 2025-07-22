# Azure DevOps User Stories Sync

This script connects to Azure DevOps and retrieves the latest 10 User Stories from the "AgentPOC" project in the "SumithaArjunan" organization.

## Configuration

The script uses the Azure DevOps configuration from `mcp-config.json` and requires an access token for authentication.

### Environment Variables

- `AZURE_DEVOPS_ACCESS_TOKEN`: Personal Access Token for Azure DevOps with Work Items read permissions

### Azure DevOps Settings

- **Organization**: SumithaArjunan
- **Project**: AgentPOC
- **Work Item Type**: User Story

## Usage

### Run the sync script:

```bash
npm run sync-user-stories
```

### Or run directly:

```bash
node sync-user-stories.js
```

## Output

The script displays the following information for each User Story:

- **ID**: Work item identifier
- **Title**: User story title/description
- **State**: Current state (New, Active, Resolved, etc.)
- **Created Date**: When the user story was created

## Features

- Fetches the latest 10 User Stories ordered by creation date
- Handles authentication and network errors gracefully
- Includes mock data for demonstration when network connectivity is unavailable
- Provides detailed error messages for troubleshooting

## Dependencies

- `azure-devops-node-api`: Official Azure DevOps Node.js API client

## Error Handling

The script handles various scenarios:

- **Network connectivity issues**: Falls back to mock data for demonstration
- **Authentication failures**: Clear error message about access token
- **Project not found**: Guidance on verifying project name and permissions
- **No User Stories found**: Informative message when project is empty

## Sample Output

```
Fetching User Stories from Azure DevOps...
Organization: SumithaArjunan
Project: AgentPOC

Latest 10 User Stories:
================================================================================
1. ID: 1001
   Title: As a user, I want to login to the system
   State: Active
   Created: 1/15/2024

2. ID: 1002
   Title: As a user, I want to view my profile information
   State: New
   Created: 1/16/2024

...

Total User Stories retrieved: 10
```