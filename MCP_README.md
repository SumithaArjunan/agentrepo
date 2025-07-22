# MCP Configuration

This repository contains an MCP (Model Context Protocol) configuration that enables GitHub Copilot to connect to external services.

## Configured Services

### OpenAPI Generator
- **Package**: `@arjun-a-2323/openapi-generator-mcp@1.0.3`
- **Purpose**: Generates code from OpenAPI specifications
- **Environment Variable**: `COPILOT_MCP_NODE_AUTH_TOKEN`

### Azure DevOps (ADO)
- **Package**: `@azure-devops/mcp@1.1.0`
- **Organization**: SumithaArjunan
- **Purpose**: Integrates with Azure DevOps services
- **Environment Variable**: `COPILOT_MCP_AZURE_DEVOPS_ACCESS_TOKEN`

## Setup

1. Set the required environment variables:
   ```bash
   export COPILOT_MCP_NODE_AUTH_TOKEN="your_node_auth_token"
   export COPILOT_MCP_AZURE_DEVOPS_ACCESS_TOKEN="your_ado_access_token"
   ```

2. The MCP configuration is defined in `mcp-config.json`

## Usage

This configuration allows the GitHub Copilot agent to:
- Generate code from OpenAPI specifications using the train-travel-api-openapi-source.yaml
- Interact with Azure DevOps services for the SumithaArjunan organization
- Access both services through the MCP protocol for enhanced coding assistance

## Environment Variables

- `COPILOT_MCP_NODE_AUTH_TOKEN`: Authentication token for Node.js package registry access
- `COPILOT_MCP_AZURE_DEVOPS_ACCESS_TOKEN`: Personal Access Token for Azure DevOps with appropriate permissions