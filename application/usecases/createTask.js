class CreateTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(createTaskDto) {
    const taskEntity = await this.taskRepository.create(createTaskDto);
    return taskEntity.toResponseDTO();
  }
}

module.exports = CreateTaskUseCase;
