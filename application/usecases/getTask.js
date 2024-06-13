const ErrorCodes = require('../../common/errors/errorCodes');
const AppError = require('../../common/errors/appError');

class GetOneTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(taskId) {
    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new AppError(ErrorCodes.TASK_NOT_FOUND_CODE, 'Task not found', 404);
    }
    return task.toResponseDTO();
  }
}

module.exports = GetOneTaskUseCase;
