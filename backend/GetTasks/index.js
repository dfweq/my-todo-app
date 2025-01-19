// Import the tasks array from AddTask for demonstration 
// In a real app, you'd query the DB
const AddTaskModule = require('../AddTask/index');

module.exports = async function (context, req) {
    const tasks = AddTaskModule.tasks;
    context.res = {
        status: 200,
        body: tasks
    };
};
