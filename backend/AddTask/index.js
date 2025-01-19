let tasks = []; 
// We'll store tasks here for demonstration; replace with DB calls if using Azure

module.exports = async function (context, req) {
    const { text } = req.body || {};

    if (!text) {
        context.res = {
            status: 400,
            body: { error: "Task text is required." }
        };
        return;
    }

    // Generate a simple ID. In real usage, you'd use a DB auto-generated ID or GUID
    const newTask = {
        id: Date.now().toString(),
        text
    };

    tasks.push(newTask);

    context.res = {
        status: 201,
        body: newTask
    };
};

// Export `tasks` so that other functions can share the same array in memory
module.exports.tasks = tasks;
