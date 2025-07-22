#!/bin/bash

# Bash script to create Azure DevOps Task
# Usage: ./create-ado-task.sh

set -e

# Configuration
ORGANIZATION="SumithaArjunan"
PROJECT="AgentPOC"
PAT="eeyLNJoKPRL1GC73b1vFhcRToUrFDVCryqeBovChj2qJI87Q9gj5JQQJ99BGACAAAAA9nnGqAAASAZDO1oxN"

# Task details
TASK_TITLE="Refactor Login Module"
TASK_DESCRIPTION="Clean up legacy code, add validation, and improve error handling."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Creating Azure DevOps Task...${NC}"
echo -e "${CYAN}Organization: $ORGANIZATION${NC}"
echo -e "${CYAN}Project: $PROJECT${NC}"
echo -e "${CYAN}Title: $TASK_TITLE${NC}"

# Create base64 encoded auth
AUTH=$(echo -n ":$PAT" | base64)

# API endpoint
API_URL="https://dev.azure.com/$ORGANIZATION/$PROJECT/_apis/wit/workitems/\$Task?api-version=7.0"

# Request body
BODY='[
  {
    "op": "add",
    "path": "/fields/System.Title",
    "value": "'"$TASK_TITLE"'"
  },
  {
    "op": "add",
    "path": "/fields/System.Description", 
    "value": "'"$TASK_DESCRIPTION"'"
  }
]'

# Make the API call
response=$(curl -s -X POST \
  -H "Content-Type: application/json-patch+json" \
  -H "Authorization: Basic $AUTH" \
  -d "$BODY" \
  "$API_URL")

# Check if the request was successful
if echo "$response" | grep -q '"id"'; then
    task_id=$(echo "$response" | grep -o '"id":[0-9]*' | cut -d':' -f2)
    echo -e "${GREEN}✅ Task created successfully!${NC}"
    echo -e "${GREEN}Task ID: $task_id${NC}"
    echo -e "${GREEN}Task URL: https://dev.azure.com/$ORGANIZATION/$PROJECT/_workitems/edit/$task_id${NC}"
else
    echo -e "${RED}❌ Error creating task:${NC}"
    echo "$response"
    exit 1
fi