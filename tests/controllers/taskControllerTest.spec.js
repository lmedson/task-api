const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../infrastructure/server');
const api = request(app);
const TaskMongoRepository = require('../../infrastructure/repositories/taskMongoRepository');
const taskRepository = new TaskMongoRepository();

describe('Task Controller Integration', () => {
  let taskId;

  beforeEach(async () => {
    await mongoose.connection.dropDatabase();
  });

  it('should create a new task', async () => {
    const taskData = {
      title: 'Task title',
      description: 'Task description',
      priority: 'High',
      dueDate: new Date().toISOString(),
      completed: false,
      categories: ['Work'],
      evaluationPoints: 10
    };

    const response = await api
      .post('/api/v1/tasks')
      .send(taskData)
      .expect(201);

    expect(response.body).toMatchObject(taskData);
  });

  it('should list tasks', async () => {
    const taskData = {
      title: 'Task title',
      description: 'Task description',
      priority: 'High',
      dueDate: new Date(),
      completed: false,
      categories: ['Work'],
      evaluationPoints: 10
    };
    await taskRepository.create(taskData);

    const response = await request(app)
      .get('/api/v1/tasks')
      .expect(200);

    expect(response.body.tasks.length).toEqual(1);
  });

  it('should update tasks', async () => {
    const taskDataToCreate = {
      title: 'Task title',
      description: 'Task description',
      priority: 'High',
      dueDate: new Date(),
      completed: false,
      categories: ['Work'],
      evaluationPoints: 10
    };
    const taskDataUpdated = {
      title: 'Task title 2',
      description: 'Task description 2',
      priority: 'Low',
      completed: false,
      categories: ['Home'],
      evaluationPoints: 15
    };
    const taskEntity = await taskRepository.create(taskDataToCreate);

    const response = await request(app)
      .put('/api/v1/tasks/' + taskEntity.id)
      .send(taskDataUpdated)
      .expect(200);

    expect(response.body.id).toEqual(taskEntity.id);
    expect(response.body.title).toEqual(taskDataUpdated.title);
    expect(response.body.description).toEqual(taskDataUpdated.description);
    expect(response.body.categories).toEqual(taskDataUpdated.categories);
    expect(response.body.priority).toEqual(taskDataUpdated.priority);
    expect(response.body.evaluationPoints).toEqual(taskDataUpdated.evaluationPoints);
  });

  it('error on update tasks not found', async () => {
    const taskId = new mongoose.Types.ObjectId();
    const taskDataToUpdate = {
      title: 'Task title',
      description: 'Task description',
      priority: 'High',
      dueDate: new Date(),
      completed: false,
      categories: ['Work'],
      evaluationPoints: 10
    };

    const response = await request(app)
      .put('/api/v1/tasks/' + taskId)
      .send(taskDataToUpdate)
      .expect(404);

    expect(response.body).toEqual({ statusCode: 404, message: 'Task not found' });
  });

  it('should delete one task', async () => {
    const taskDataToCreate = {
      title: 'Task title',
      description: 'Task description',
      priority: 'High',
      dueDate: new Date(),
      completed: false,
      categories: ['Work'],
      evaluationPoints: 10
    };
    const taskEntity = await taskRepository.create(taskDataToCreate);

    const response = await request(app)
      .delete('/api/v1/tasks/' + taskEntity.id)
      .send()
      .expect(204);

    expect(response.body).toMatchObject({});
  });

  it('fail on delete one task', async () => {
    const taskId = new mongoose.Types.ObjectId();

    const response = await request(app)
      .delete('/api/v1/tasks/' + taskId)
      .send()
      .expect(404);

    expect(response.body).toMatchObject({
      'statusCode': 404,
      'message': 'Task not found'
    });
  });

  it('should list tasks without any filters', async () => {
    const tasksToCreate = [
      {
        title: 'Fix customers problem',
        description: 'Error on receive payments with apple pay',
        priority: 'High',
        dueDate: new Date().toISOString(),
        completed: false,
        categories: ['Work'],
        evaluationPoints: 13
      },
      {
        title: 'Cook the dinner',
        description: '',
        priority: 'Low',
        completed: false,
        categories: ['Home'],
        evaluationPoints: 21
      }
    ];
    const createPromises = tasksToCreate.map(task => taskRepository.create(task));
    await Promise.all(createPromises);

    const response = await request(app)
      .get('/api/v1/tasks')
      .expect(200);

    tasksToCreate.forEach(task => {
      expect(response.body.tasks).toContainEqual(expect.objectContaining(task));
    });

    expect(response.body.count).toEqual(tasksToCreate.length);
    expect(response.body.tasks.length).toEqual(tasksToCreate.length);
  });

  it('should list tasks with optional filters', async () => {
    const tasksToCreate = [
      {
        title: 'Fix customers problem',
        description: 'Error on receive payments with apple pay',
        priority: 'High',
        dueDate: new Date().toISOString(),
        completed: false,
        categories: ['Work'],
        evaluationPoints: 13
      },
      {
        title: 'Cook the dinner',
        description: '',
        priority: 'Normal',
        dueDate: new Date('2024-06-12T18:47:31.360Z').toISOString(),
        completed: false,
        categories: ['Home'],
        evaluationPoints: 21
      },
      {
        title: 'Cook the breakfast',
        description: '',
        priority: 'Normal',
        dueDate: new Date('2024-06-13T09:00:00.000Z').toISOString(),
        completed: false,
        categories: ['Home'],
        evaluationPoints: 13
      }
    ];

    const createPromises = tasksToCreate.map(task => taskRepository.create(task));
    await Promise.all(createPromises);

    const response = await request(app)
      .get('/api/v1/tasks')
      .query({
        priority: 'Normal',
        sort: 'dueDate'
      })
      .expect(200);

    expect(response.body.tasks[0].title).toEqual(tasksToCreate[1].title);
    expect(response.body.tasks[0].description).toEqual(tasksToCreate[1].description);
    expect(response.body.tasks[0].priority).toEqual(tasksToCreate[1].priority);
    expect(response.body.tasks[0].dueDate).toEqual(tasksToCreate[1].dueDate);
    expect(response.body.tasks[0].completed).toEqual(tasksToCreate[1].completed);
    expect(response.body.tasks[0].categories).toEqual(tasksToCreate[1].categories);
    expect(response.body.tasks[0].evaluationPoints).toEqual(tasksToCreate[1].evaluationPoints);
    expect(response.body.count).toEqual(2);
    expect(response.body.tasks.length).toEqual(2);
  });


  it('should mark one task as completed', async () => {
    const taskDataToCreate = {
      title: 'Task title',
      description: 'Task description',
      priority: 'High',
      dueDate: new Date(),
      completed: false,
      categories: ['Work'],
      evaluationPoints: 10
    };
    const taskEntity = await taskRepository.create(taskDataToCreate);

    const response = await request(app)
      .put(`/api/v1/tasks/${taskEntity.id}/completed`)
      .send()
      .expect(200);

    expect(response.body.id).toEqual(taskEntity.id);
    expect(response.body.completed).toEqual(true);
  });

  it('error on mark one task as completed', async () => {
    const taskId = new mongoose.Types.ObjectId();
    const response = await request(app)
      .put(`/api/v1/tasks/${taskId}/completed`)
      .send()
      .expect(404);

    expect(response.body).toEqual({ statusCode: 404, message: 'Task not found' });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
