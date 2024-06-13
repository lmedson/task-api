const AppError = require('../../common/errors/appError');
const ErrorCodes = require('../../common/errors/errorCodes');

class UpdateTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(id, updateTaskDto) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new AppError(ErrorCodes.TASK_NOT_FOUND_CODE, 'Task not found', 404);
    }
    await task.updateTask(updateTaskDto);
    return task.toResponseDTO();
  }
}

module.exports = UpdateTaskUseCase;
