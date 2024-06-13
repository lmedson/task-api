const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: { type: String, enum: ['Low', 'Normal', 'High', 'Critical'], default: 'Normal', required: false },
  dueDate: Date,
  completed: { type: Boolean, default: false },
  categories: [{ type: String, enum: ['Home', 'Work', 'Personal', 'Shopping'], required: false }],
  evaluationPoints: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

taskSchema.methods.updateTask = async function(updates) {
  Object.assign(this, updates);
  await this.save();
};

taskSchema.methods.markAsCompleted = async function() {
  this.completed = true;
  await this.save();
};

taskSchema.statics.filterAndSort = async function(filters, sortCriteria) {
  let query = this.find();

  if (filters.completed !== undefined) {
    query = query.where('completed').equals(filters.completed);
  }
  if (filters.categories && filters.categories.length > 0) {
    query = query.where('categories').in(filters.categories);
  }
  if (filters.priority) {
    query = query.where('priority').equals(filters.priority);
  }
  if (filters.dueDate) {
    query = query.where('dueDate').equals(filters.dueDate);
  }
  if (filters.evaluationPoints) {
    query = query.where('evaluationPoints').equals(filters.evaluationPoints);
  }

  if (sortCriteria) {
    query = query.sort(sortCriteria);
  }

  return query.exec();
};

taskSchema.methods.toResponseDTO = function() {
  return {
    id: this._id,
    title: this.title,
    description: this.description,
    priority: this.priority,
    dueDate: this.dueDate,
    completed: this.completed,
    categories: this.categories,
    evaluationPoints: this.evaluationPoints
  };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
