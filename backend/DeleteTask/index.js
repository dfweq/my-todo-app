// Import the tasks array from AddTask
const AddTaskModule = require('../AddTask/index');

module.exports = async function (context, req) {
    const { id } = req.body || {};

    if (!id) {
        context.res = {
            status: 400,
            body: { error: "Task ID is required." }
        };
        return;
    }

    // Filter out the task
    AddTaskModule.tasks = AddTaskModule.tasks.filter(task => task.id !== id);

    context.res = {
        status: 200,
        body: { message: `Task with id ${id} deleted.` }
    };
};
