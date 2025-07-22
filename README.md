# agentrepo
AgentRepo

This repository contains an MCP (Model Context Protocol) configuration for GitHub Copilot integration with external services.

## Features
- OpenAPI code generation from the included train travel API specification
- Azure DevOps integration for the ArjunAnappara organization
- Work item creation automation with predefined templates

## Setup
See [MCP_README.md](MCP_README.md) for detailed configuration instructions.

## Work Item Creation
To create the "Add user details" work item in Azure DevOps:
1. See [WORK_ITEM_CREATION.md](WORK_ITEM_CREATION.md) for detailed instructions
2. Run `node create-work-item.js` to view the work item configuration
3. Use the Azure DevOps MCP tools to create the work item with the provided specification
