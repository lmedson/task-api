/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the task
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: The description of the task
 *         priority:
 *           type: string
 *           enum: [Low, Normal, High, Critical]
 *           description: The priority of the task
 *         dueDate:
 *           type: string
 *           format: date
 *           description: The due date of the task
 *         completed:
 *           type: boolean
 *           description: Whether the task is completed
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *             enum: [Home, Work, Personal, Shopping]
 *           description: The categories of the task
 *         evaluationPoints:
 *           type: number
 *           description: The evaluation points of the task
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the task was created
 *       example:
 *         id: 60c72b1f9b1d4c39f8e9b1b1
 *         title: "My Task"
 *         description: "A description of the task"
 *         priority: "Normal"
 *         dueDate: "2021-06-15"
 *         completed: false
 *         categories: ["Home", "Personal"]
 *         evaluationPoints: 10
 *         createdAt: "2021-06-14T00:00:00.000Z"
 */
