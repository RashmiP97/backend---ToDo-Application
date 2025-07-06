import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";
import { ITodo } from "../interfaces/todo.interface";

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodos(req: Request, res: Response): Promise<void> {
    try {
      const todos = await this.todoService.getAllTodos();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ message: "Error fetching todos", error: (error as Error).message });
    }
  }

  async createTodo(req: Request, res: Response): Promise<void> {
    try {
      const todoData: Omit<ITodo, "id"> = req.body;
      const newTodo = await this.todoService.createTodo({ ...todoData, completed: false });
      res.status(201).json({ newTodo });
    } catch (error) {
      res.status(400).json({ message: "Error creating todo", error: (error as Error).message });
    }
  }

  async updateTodo(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const todoData: Partial<ITodo> = req.body;
      const updatedTodo = await this.todoService.updateTodo(id, todoData);
      if (updatedTodo) {
        res.status(200).json(updatedTodo);
      } else {
        res.status(404).json({ message: "Todo not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Error updating todo", error: (error as Error).message });
    }
  }
}
