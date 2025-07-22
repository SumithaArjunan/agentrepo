# agentrepo
AgentRepo

This repository contains an MCP (Model Context Protocol) configuration for GitHub Copilot integration with external services.

## Features
- OpenAPI code generation from the included train travel API specification
- Azure DevOps integration for the SumithaArjunan organization
- User Stories sync functionality from Azure DevOps project "AgentPOC"

## Quick Start

### Sync User Stories from Azure DevOps
```bash
npm install
npm run sync-user-stories
```

This will fetch the latest 10 User Stories from the "AgentPOC" project, displaying their ID, title, and state.

## Setup
See [MCP_README.md](MCP_README.md) for detailed configuration instructions.
See [SYNC_README.md](SYNC_README.md) for Azure DevOps sync functionality details.
