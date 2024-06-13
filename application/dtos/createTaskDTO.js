class CreateTaskDto {
  constructor({ title, description, priority, dueDate, completed, categories, evaluationPoints }) {
    this.title = title;
    this.description = description;
    this.priority = priority || 'Normal';
    this.dueDate = dueDate || null;
    this.completed = completed || false;
    this.categories = categories || [];
    this.evaluationPoints = evaluationPoints || 0;
  }
}

module.exports = CreateTaskDto;
