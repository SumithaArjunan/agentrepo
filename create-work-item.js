#!/usr/bin/env node

/**
 * Azure DevOps Work Item Creation Script
 * 
 * This script demonstrates how to create a work item in Azure DevOps
 * using the configured MCP setup for the ArjunAnappara organization.
 * 
 * Work Item: Add user details
 * 
 * Prerequisites:
 * - AZURE_DEVOPS_ACCESS_TOKEN environment variable must be set
 * - Azure DevOps MCP package (@azure-devops/mcp@1.1.0) configured
 */

const workItemDetails = {
  title: "Add user details",
  workItemType: "User Story",
  description: `
    **Objective:** Implement functionality to add user details to the system.
    
    **Acceptance Criteria:**
    - [ ] Create user input form with required fields
    - [ ] Implement validation for user input
    - [ ] Add user details to the database
    - [ ] Display confirmation message upon successful addition
    - [ ] Handle error cases gracefully
    
    **Technical Requirements:**
    - Form should include: Name, Email, Phone Number, Address
    - Email validation should be implemented
    - Phone number should support international formats
    - All fields should have appropriate length limits
    
    **Priority:** Medium
    **Story Points:** 5
  `,
  assignedTo: "", // Will be set during creation
  state: "New",
  priority: 2,
  tags: ["user-management", "frontend", "backend"]
};

/**
 * Instructions for creating the work item using Azure DevOps MCP:
 * 
 * 1. Ensure the AZURE_DEVOPS_ACCESS_TOKEN environment variable is set:
 *    export AZURE_DEVOPS_ACCESS_TOKEN="your_personal_access_token"
 * 
 * 2. Use the MCP configuration to connect to Azure DevOps:
 *    The mcp-config.json already has the Azure DevOps MCP configured
 * 
 * 3. Create the work item using the MCP tools:
 *    - Connect to the ArjunAnappara organization
 *    - Use the work item creation tools provided by the MCP
 *    - Apply the workItemDetails configuration above
 * 
 * 4. The work item should be created with:
 *    - Title: "Add user details"
 *    - Type: User Story
 *    - Description: As specified above with acceptance criteria
 *    - Appropriate tags and priority
 */

console.log("Azure DevOps Work Item Creation Configuration");
console.log("============================================");
console.log(JSON.stringify(workItemDetails, null, 2));
console.log("\nTo create this work item, use the Azure DevOps MCP tools");
console.log("configured in mcp-config.json with the ArjunAnappara organization.");
console.log("\nEnsure AZURE_DEVOPS_ACCESS_TOKEN is set in your environment.");