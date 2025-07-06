import { ITodo } from '../interfaces/todo.interface';
import { TodoRepository } from '../repositories/todo.repository';

export class TodoService {
  constructor(private repository: TodoRepository) {}

  async getAllTodos(): Promise<ITodo[]> {
    return this.repository.findAll();
  }

  async getTodoById(id: number): Promise<ITodo | null> {
    return this.repository.findById(id);
  }

  async createTodo(todoData: Omit<ITodo, 'id'>): Promise<ITodo> {
    // Additional business logic can be added here
    if (!todoData.title) {
      throw new Error('Title is required');
    }
    return this.repository.create(todoData);
  }

  async updateTodo(id: number, todoData: Partial<ITodo>): Promise<ITodo | null> {
    const existingTodo = await this.repository.findById(id);
    if (!existingTodo) {
      throw new Error('Todo not found');
    }
    return this.repository.update(id, todoData);
  }

}