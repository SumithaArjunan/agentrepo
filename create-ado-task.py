#!/usr/bin/env python3
"""
Python script to create Azure DevOps Task
Usage: python3 create-ado-task.py
"""

import requests
import base64
import json
import sys

# Configuration
ORGANIZATION = "SumithaArjunan"
PROJECT = "AgentPOC"
PAT = "eeyLNJoKPRL1GC73b1vFhcRToUrFDVCryqeBovChj2qJI87Q9gj5JQQJ99BGACAAAAA9nnGqAAASAZDO1oxN"

# Task details
TASK_TITLE = "Refactor Login Module"
TASK_DESCRIPTION = "Clean up legacy code, add validation, and improve error handling."

def create_ado_task():
    """Create Azure DevOps task using REST API"""
    
    print(f"🔄 Creating Azure DevOps Task...")
    print(f"   Organization: {ORGANIZATION}")
    print(f"   Project: {PROJECT}")
    print(f"   Title: {TASK_TITLE}")
    
    # Prepare authentication
    auth_string = f":{PAT}"
    auth_bytes = auth_string.encode('ascii')
    auth_b64 = base64.b64encode(auth_bytes).decode('ascii')
    
    # API endpoint
    url = f"https://dev.azure.com/{ORGANIZATION}/{PROJECT}/_apis/wit/workitems/$Task?api-version=7.0"
    
    # Headers
    headers = {
        "Content-Type": "application/json-patch+json",
        "Authorization": f"Basic {auth_b64}"
    }
    
    # Request body
    body = [
        {
            "op": "add",
            "path": "/fields/System.Title",
            "value": TASK_TITLE
        },
        {
            "op": "add",
            "path": "/fields/System.Description",
            "value": TASK_DESCRIPTION
        }
    ]
    
    try:
        response = requests.post(url, headers=headers, json=body)
        response.raise_for_status()
        
        result = response.json()
        task_id = result.get('id')
        task_url = result.get('_links', {}).get('html', {}).get('href', '')
        
        print("✅ Task created successfully!")
        print(f"   Task ID: {task_id}")
        print(f"   Task URL: {task_url}")
        
        return result
        
    except requests.exceptions.RequestException as e:
        print(f"❌ Error creating task: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"   Response: {e.response.text}")
        sys.exit(1)

if __name__ == "__main__":
    create_ado_task()