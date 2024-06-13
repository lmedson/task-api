const {
  CreateTaskUseCase,
  ListTasksUseCase,
  UpdateTaskUseCase,
  DeleteTaskUseCase,
  CompleteTaskUseCase,
  GetOneTaskUseCase
} = require('../../application/usecases');
const { CreateTaskDTO, UpdateTaskDTO } = require('../../application/dtos');
const TaskMongoRepository = require('../repositories/taskMongoRepository');
const mongoose = require('mongoose');

const taskRepository = new TaskMongoRepository();
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const listTasksUseCase = new ListTasksUseCase(taskRepository);
const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
const completeTaskUseCase = new CompleteTaskUseCase(taskRepository);
const getOneTaskUseCase = new GetOneTaskUseCase(taskRepository);

class TaskController {
  async create(req, res, next) {
    try {
      const createTaskDto = new CreateTaskDTO(req.body);
      const task = await createTaskUseCase.execute(createTaskDto);
      createTaskDto.id = task.id;
      res.status(201).json(createTaskDto);
    } catch (error) {
      next(error);
    }
  }

  async list(req, res, next) {
    try {
      const sortCriteria = req.query.sort || '';
      const filters = {
        completed: req.query.completed,
        categories: req.query.categories ? req.query.categories.split(',') : [],
        priority: req.query.priority,
        dueDate: req.query.dueDate,
        evaluationPoints: req.query.evaluationPoints
      };

      const tasks = await listTasksUseCase.execute(filters, sortCriteria);
      res.status(200).json({ tasks: tasks, count: tasks.length });
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const taskId = req.params.id;
      const task = await getOneTaskUseCase.execute(taskId);
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const updateTaskDto = new UpdateTaskDTO(req.body);
      const task = await updateTaskUseCase.execute(req.params.id, updateTaskDto);
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const taskId = req.params.id;
      await deleteTaskUseCase.execute(taskId);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  async complete(req, res, next) {
    try {
      const taskId = req.params.id;
      const task = await completeTaskUseCase.execute(taskId);
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TaskController();
