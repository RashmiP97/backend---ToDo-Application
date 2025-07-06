import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';
import { TodoService } from '../services/todo.service';
import { TodoRepository } from '../repositories/todo.repository';

const router = Router();

// Dependency injection
const todoRepository = new TodoRepository();
const todoService = new TodoService(todoRepository);
const todoController = new TodoController(todoService);

router.get('/', todoController.getAllTodos.bind(todoController));
router.post('/', todoController.createTodo.bind(todoController));
router.put('/:id', todoController.updateTodo.bind(todoController));

export default router;