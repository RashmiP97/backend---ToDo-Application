import { query } from "../config/database";
import { ITodo, ITodoRepository } from "../interfaces/todo.interface";

export class TodoRepository implements ITodoRepository {
  async findAll(): Promise<ITodo[]> {
    const result = await query("SELECT * FROM todos WHERE completed = false ORDER BY created_at DESC LIMIT 5");
    return result.rows;
  }

  async findById(id: number): Promise<ITodo | null> {
    const result = await query("SELECT * FROM todos WHERE id = $1", [id]);
    return result.rows[0] || null;
  }

  async create(todo: Omit<ITodo, "id">): Promise<ITodo> {
    const { title, description, completed } = todo;
    const result = await query("INSERT INTO todos (title, description, completed) VALUES ($1, $2, $3) RETURNING *", [title, description, completed]);
    return result.rows[0];
  }

  async update(id: number, todo: Partial<ITodo>): Promise<ITodo | null> {
    const { completed } = todo;
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (completed !== undefined) {
      updates.push(`completed = $${paramIndex}`);
      values.push(completed);
      paramIndex++;
    }

    if (updates.length === 0) {
      throw new Error("No valid fields provided for update");
    }

    values.push(id);
    const queryText = `UPDATE todos SET ${updates.join(", ")}, updated_at = NOW() WHERE id = $${paramIndex} RETURNING *`;

    const result = await query(queryText, values);
    return result.rows[0] || null;
  }
}
