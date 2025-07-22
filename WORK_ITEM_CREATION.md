# Azure DevOps Work Item Creation Guide

This guide explains how to create work items in Azure DevOps using the configured MCP (Model Context Protocol) setup.

## Overview

The repository is configured to work with Azure DevOps through the `@azure-devops/mcp@1.1.0` package, targeting the **ArjunAnappara** organization.

## Prerequisites

1. **Azure DevOps Access Token**: Set the environment variable:
   ```bash
   export AZURE_DEVOPS_ACCESS_TOKEN="your_personal_access_token"
   ```

2. **MCP Configuration**: The `mcp-config.json` file is already configured with the Azure DevOps MCP server.

## Creating the "Add user details" Work Item

### Work Item Specification

**Title:** Add user details  
**Type:** User Story  
**Priority:** Medium  
**Story Points:** 5  

### Description

Implement functionality to add user details to the system.

#### Acceptance Criteria
- [ ] Create user input form with required fields (Name, Email, Phone Number, Address)
- [ ] Implement validation for user input
- [ ] Add user details to the database
- [ ] Display confirmation message upon successful addition
- [ ] Handle error cases gracefully

#### Technical Requirements
- Email validation should be implemented
- Phone number should support international formats
- All fields should have appropriate length limits
- Form should be responsive and accessible

### Tags
- `user-management`
- `frontend`
- `backend`

## Using the MCP Configuration

### Method 1: Direct MCP Command
```bash
npx @azure-devops/mcp@1.1.0 ArjunAnappara
```

### Method 2: Using the Configuration Script
```bash
node create-work-item.js
```

This script provides the structured data and instructions for creating the work item.

## MCP Server Configuration

The MCP server for Azure DevOps is configured in `mcp-config.json`:

```json
{
  "ado": {
    "type": "local",
    "command": "npx",
    "args": ["-y", "@azure-devops/mcp@1.1.0", "ArjunAnappara"],
    "tools": ["*"],
    "env": {
      "AZURE_DEVOPS_ACCESS_TOKEN": "COPILOT_MCP_AZURE_DEVOPS_ACCESS_TOKEN"
    }
  }
}
```

## Next Steps

1. Set up your Azure DevOps access token
2. Run the MCP server using the configuration
3. Use the work item details from `create-work-item.js` to create the work item
4. Assign the work item to the appropriate team member
5. Move the work item to the active sprint if needed

## Troubleshooting

- Ensure your Azure DevOps access token has the necessary permissions
- Verify the organization name "ArjunAnappara" is correct
- Check that the MCP package version matches your requirements