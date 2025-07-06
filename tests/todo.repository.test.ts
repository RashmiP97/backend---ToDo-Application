import { TodoRepository } from '../src/repositories/todo.repository';
import { query } from '../src/config/database';
import { ITodo } from '../src/interfaces/todo.interface';

jest.mock('../src/config/database', () => ({
  query: jest.fn(),
}));

describe('TodoRepository', () => {
  let repository: TodoRepository;

  beforeEach(() => {
    repository = new TodoRepository();
    jest.clearAllMocks();
  });

  it('should return all todos', async () => {
    const mockRows: ITodo[] = [{ id: 1, title: 'T1', description: '', completed: false }];
    (query as jest.Mock).mockResolvedValue({ rows: mockRows });

    const result = await repository.findAll();
    expect(result).toEqual(mockRows);
  });

  it('should find todo by ID', async () => {
    const todo: ITodo = { id: 1, title: 'Find Me', description: '', completed: false };
    (query as jest.Mock).mockResolvedValue({ rows: [todo] });

    const result = await repository.findById(1);
    expect(result).toEqual(todo);
  });

  it('should return null if not found by ID', async () => {
    (query as jest.Mock).mockResolvedValue({ rows: [] });

    const result = await repository.findById(999);
    expect(result).toBeNull();
  });

  it('should create a new todo', async () => {
    const newTodo = { title: 'Create Me', description: '', completed: false };
    const createdTodo = { id: 1, ...newTodo };
    (query as jest.Mock).mockResolvedValue({ rows: [createdTodo] });

    const result = await repository.create(newTodo);
    expect(result).toEqual(createdTodo);
  });

  it('should update a todo', async () => {
    const updated = { id: 1, title: 'Updated', description: '', completed: true };
    (query as jest.Mock).mockResolvedValue({ rows: [updated] });

    const result = await repository.update(1, { completed: true });
    expect(result).toEqual(updated);
  });

  it('should throw if no update fields provided', async () => {
    await expect(repository.update(1, {})).rejects.toThrow('No valid fields provided for update');
  });
});
