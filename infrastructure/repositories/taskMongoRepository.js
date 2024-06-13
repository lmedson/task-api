const TaskRepository = require('../../domain/repositories/taskRepositoryInterface');
const Task = require('../../domain/entities/taskEntity');

class TaskMongoRepository extends TaskRepository {
  async create(task) {
    const newTask = new Task(task);
    return newTask.save();
  }

  async findAll(filters, sortCriteria) {
    return Task.filterAndSort(filters, sortCriteria);
  }

  async findById(id) {
    return Task.findById(id).exec();
  }

  async update(id, task) {
    return Task.findByIdAndUpdate(id, task, { new: true }).exec();
  }

  async delete(id) {
    return Task.findByIdAndDelete(id).exec();
  }
}

module.exports = TaskMongoRepository;
