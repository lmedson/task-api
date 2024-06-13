class ListTasksUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(filters, sortCriteria) {
    const tasksEntity = await this.taskRepository.findAll(filters, sortCriteria);
    return tasksEntity.map(task => task.toResponseDTO());
  }
}

module.exports = ListTasksUseCase;
