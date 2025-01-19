const { CosmosClient } = require("@azure/cosmos");

module.exports = async function (context, req) {
    const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
    const DB_NAME = process.env.DB_NAME;

    try {
        // 1. Initialize the CosmosClient
        const client = new CosmosClient(DB_CONNECTION_STRING);

        // 2. Access the database and container
        const database = client.database(DB_NAME);
        const container = database.container("Tasks");

        // 3. Query all tasks (simple "SELECT * FROM c" approach)
        const querySpec = {
            query: "SELECT * FROM c"
        };
        const { resources: tasks } = await container.items.query(querySpec).fetchAll();

        context.res = {
            status: 200,
            body: tasks
        };
    } catch (err) {
        context.log.error("Error fetching tasks:", err);
        context.res = {
            status: 500,
            body: { error: "Failed to fetch tasks." }
        };
    }
};
