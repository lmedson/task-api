const ListTasksUseCase = require('./listTasks');
const CreateTaskUseCase = require('./createTask');
const UpdateTaskUseCase = require('./updateTask');
const DeleteTaskUseCase = require('./deleteTask');
const CompleteTaskUseCase = require('./completeTask');
const GetOneTaskUseCase = require('./getTask');

module.exports = {
  ListTasksUseCase,
  CreateTaskUseCase,
  UpdateTaskUseCase,
  DeleteTaskUseCase,
  CompleteTaskUseCase,
  GetOneTaskUseCase
};
