import { TodoService } from '../src/services/todo.service';
import { TodoRepository } from '../src/repositories/todo.repository';
import { ITodo } from '../src/interfaces/todo.interface';

jest.mock('../src/repositories/todo.repository');

describe('TodoService', () => {
  let todoService: TodoService;
  let mockRepo: jest.Mocked<TodoRepository>;

  beforeEach(() => {
    mockRepo = new TodoRepository() as jest.Mocked<TodoRepository>;
    todoService = new TodoService(mockRepo);
  });

  it('should return all todos', async () => {
    const mockTodos: ITodo[] = [{ id: 1, title: 'Test', description: 'Test desc', completed: false }];
    mockRepo.findAll.mockResolvedValue(mockTodos);

    const result = await todoService.getAllTodos();
    expect(result).toEqual(mockTodos);
    expect(mockRepo.findAll).toHaveBeenCalled();
  });

  it('should create a todo with valid data', async () => {
    const newTodo = { title: 'New', description: 'New desc', completed: false };
    const createdTodo = { id: 1, ...newTodo };
    mockRepo.create.mockResolvedValue(createdTodo);

    const result = await todoService.createTodo(newTodo);
    expect(result).toEqual(createdTodo);
    expect(mockRepo.create).toHaveBeenCalledWith(newTodo);
  });

  it('should throw error if title is missing', async () => {
    const invalidTodo = { description: 'No title', completed: false };
    await expect(todoService.createTodo(invalidTodo as any)).rejects.toThrow('Title is required');
  });

  it('should update an existing todo', async () => {
    const existingTodo = { id: 1, title: 'Old', description: '', completed: false };
    const updates = { completed: true };
    const updatedTodo = { ...existingTodo, ...updates };

    mockRepo.findById.mockResolvedValue(existingTodo);
    mockRepo.update.mockResolvedValue(updatedTodo);

    const result = await todoService.updateTodo(1, updates);
    expect(result).toEqual(updatedTodo);
    expect(mockRepo.findById).toHaveBeenCalledWith(1);
    expect(mockRepo.update).toHaveBeenCalledWith(1, updates);
  });

  it('should throw error if todo not found during update', async () => {
    mockRepo.findById.mockResolvedValue(null);
    await expect(todoService.updateTodo(999, { completed: true })).rejects.toThrow('Todo not found');
  });
});
