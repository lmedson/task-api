const ErrorCodes = require('../../common/errors/errorCodes');
const AppError = require('../../common/errors/appError');

class DeleteTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(id) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new AppError(ErrorCodes.TASK_NOT_FOUND_CODE, 'Task not found', 404);
    }
    return this.taskRepository.delete(id);
  }
}

module.exports = DeleteTaskUseCase;
