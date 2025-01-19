const { CosmosClient } = require("@azure/cosmos");

module.exports = async function (context, req) {
    const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
    const DB_NAME = process.env.DB_NAME;
    const { text } = req.body || {};

    if (!text) {
        context.res = {
            status: 400,
            body: { error: "Task text is required." }
        };
        return;
    }

    try {
        // 1. Initialize the CosmosClient
        const client = new CosmosClient(DB_CONNECTION_STRING);
        
        // 2. Access the database and container
        const database = client.database(DB_NAME);
        const container = database.container("Tasks");

        // 3. Create a new task item
        //    Use your preferred ID generation approach. Using Date.now() for simplicity
        const newTask = {
            id: Date.now().toString(),
            text: text
        };
        
        // 4. Insert the new document into Cosmos DB
        await container.items.create(newTask);

        context.res = {
            status: 201,
            body: newTask
        };
    } catch (err) {
        context.log.error("Error adding task:", err);
        context.res = {
            status: 500,
            body: { error: "Failed to add task." }
        };
    }
};
