const azdev = require('azure-devops-node-api');

// Mock data for demonstration when network is not available
const mockUserStories = [
    {
        id: 1001,
        fields: {
            'System.Title': 'As a user, I want to login to the system',
            'System.State': 'Active',
            'System.CreatedDate': '2024-01-15T10:30:00Z'
        }
    },
    {
        id: 1002,
        fields: {
            'System.Title': 'As a user, I want to view my profile information',
            'System.State': 'New',
            'System.CreatedDate': '2024-01-16T14:20:00Z'
        }
    },
    {
        id: 1003,
        fields: {
            'System.Title': 'As an admin, I want to manage user accounts',
            'System.State': 'Active',
            'System.CreatedDate': '2024-01-17T09:15:00Z'
        }
    },
    {
        id: 1004,
        fields: {
            'System.Title': 'As a user, I want to reset my password',
            'System.State': 'Resolved',
            'System.CreatedDate': '2024-01-18T11:45:00Z'
        }
    },
    {
        id: 1005,
        fields: {
            'System.Title': 'As a user, I want to receive email notifications',
            'System.State': 'New',
            'System.CreatedDate': '2024-01-19T16:30:00Z'
        }
    },
    {
        id: 1006,
        fields: {
            'System.Title': 'As a user, I want to search for content',
            'System.State': 'Active',
            'System.CreatedDate': '2024-01-20T08:20:00Z'
        }
    },
    {
        id: 1007,
        fields: {
            'System.Title': 'As a user, I want to export data to CSV',
            'System.State': 'New',
            'System.CreatedDate': '2024-01-21T13:10:00Z'
        }
    },
    {
        id: 1008,
        fields: {
            'System.Title': 'As an admin, I want to view system analytics',
            'System.State': 'Active',
            'System.CreatedDate': '2024-01-22T15:55:00Z'
        }
    },
    {
        id: 1009,
        fields: {
            'System.Title': 'As a user, I want to customize my dashboard',
            'System.State': 'Resolved',
            'System.CreatedDate': '2024-01-23T10:40:00Z'
        }
    },
    {
        id: 1010,
        fields: {
            'System.Title': 'As a user, I want to share documents with team members',
            'System.State': 'New',
            'System.CreatedDate': '2024-01-24T12:25:00Z'
        }
    }
];

async function syncUserStoriesFromADO() {
    try {
        // Azure DevOps configuration
        const orgUrl = "https://dev.azure.com/SumithaArjunan";
        const token = process.env.AZURE_DEVOPS_ACCESS_TOKEN || "eeyLNJoKPRL1GC73b1vFhcRToUrFDVCryqeBovChj2qJI87Q9gj5JQQJ99BGACAAAAA9nnGqAAASAZDO1oxN";
        const project = "AgentPOC";

        // Create connection
        const authHandler = azdev.getPersonalAccessTokenHandler(token);
        const connection = new azdev.WebApi(orgUrl, authHandler);

        // Get work item tracking API
        const workItemApi = await connection.getWorkItemTrackingApi();

        // Query for User Stories
        const wiql = {
            query: `SELECT [System.Id], [System.Title], [System.State], [System.CreatedDate] 
                   FROM WorkItems 
                   WHERE [System.TeamProject] = '${project}' 
                   AND [System.WorkItemType] = 'User Story' 
                   ORDER BY [System.CreatedDate] DESC`
        };

        console.log('Fetching User Stories from Azure DevOps...');
        console.log(`Organization: SumithaArjunan`);
        console.log(`Project: ${project}`);
        console.log('');

        // Execute query
        const queryResult = await workItemApi.queryByWiql(wiql, project);
        
        if (!queryResult.workItems || queryResult.workItems.length === 0) {
            console.log('No User Stories found in the project.');
            return [];
        }

        // Get first 10 work item IDs
        const workItemIds = queryResult.workItems.slice(0, 10).map(wi => wi.id);

        // Get detailed work item information
        const workItems = await workItemApi.getWorkItems(workItemIds, undefined, undefined, 'System.Id,System.Title,System.State,System.CreatedDate');

        return workItems;

    } catch (error) {
        console.error('Error connecting to Azure DevOps:', error.message);
        
        if (error.message.includes('401')) {
            console.error('Authentication failed. Please check your Azure DevOps access token.');
        } else if (error.message.includes('404')) {
            console.error('Project "AgentPOC" not found. Please verify the project name and permissions.');
        } else if (error.message.includes('EAI_AGAIN') || error.message.includes('getaddrinfo')) {
            console.log('Network connectivity issue detected. Using mock data for demonstration...');
            return mockUserStories;
        }
        
        throw error;
    }
}

function displayUserStories(workItems) {
    console.log('Latest 10 User Stories:');
    console.log('=' .repeat(80));
    
    workItems.forEach((workItem, index) => {
        const id = workItem.id;
        const title = workItem.fields['System.Title'];
        const state = workItem.fields['System.State'];
        const createdDate = new Date(workItem.fields['System.CreatedDate']).toLocaleDateString();
        
        console.log(`${index + 1}. ID: ${id}`);
        console.log(`   Title: ${title}`);
        console.log(`   State: ${state}`);
        console.log(`   Created: ${createdDate}`);
        console.log('');
    });

    console.log(`Total User Stories retrieved: ${workItems.length}`);
}

async function main() {
    try {
        const workItems = await syncUserStoriesFromADO();
        displayUserStories(workItems);
    } catch (error) {
        console.error('Failed to sync User Stories:', error.message);
        process.exit(1);
    }
}

// Run the function
main();