const { CosmosClient } = require("@azure/cosmos");

module.exports = async function (context, req) {
    const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
    const DB_NAME = process.env.DB_NAME;
    const { id } = req.body || {};

    if (!id) {
        context.res = {
            status: 400,
            body: { error: "Task ID is required to delete a task." }
        };
        return;
    }

    try {
        // 1. Initialize the CosmosClient
        const client = new CosmosClient(DB_CONNECTION_STRING);

        // 2. Access the database and container
        const database = client.database(DB_NAME);
        const container = database.container("Tasks");

        // 3. Attempt to delete item by ID and partition key
        //    If you have a partition key (e.g., /id), pass it as the second argument
        await container.item(id, id).delete(); 

        context.res = {
            status: 200,
            body: { message: `Task with ID ${id} deleted.` }
        };
    } catch (err) {
        context.log.error("Error deleting task:", err);

        // If the item to delete doesn't exist, the delete() call will throw an error
        context.res = {
            status: 500,
            body: { error: `Failed to delete task with ID ${id}.` }
        };
    }
};
