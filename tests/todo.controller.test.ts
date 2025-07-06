import { Request, Response } from "express";
import { TodoController } from "../src/controllers/todo.controller";
import { TodoService } from "../src/services/todo.service";
import { ITodo } from "../src/interfaces/todo.interface";
import { TodoRepository } from "../src/repositories/todo.repository";

describe("TodoController", () => {
  let controller: TodoController;
  let mockRepository: Partial<jest.Mocked<TodoRepository>>;
  let mockService: TodoService;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
    };
    mockService = new TodoService(mockRepository as TodoRepository);

    controller = new TodoController(mockService);

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("getAllTodos", () => {
    it("should respond with todos", async () => {
      const todos: ITodo[] = [{ id: 1, title: "T1", description: "", completed: false }];
      mockService.getAllTodos();

      await controller.getAllTodos({} as Request, mockRes as Response);

      expect(mockService.getAllTodos).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(todos);
    });

    it("should handle errors", async () => {
      mockService.getAllTodos();

      await controller.getAllTodos({} as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Error fetching todos",
        error: "DB error",
      });
    });
  });

  describe("createTodo", () => {
    it("should create and return a new todo", async () => {
      const body = { title: "New", description: "" };
      const createdTodo = { id: 1, ...body, completed: false };
      mockService.createTodo(createdTodo);

      mockReq = { body };

      await controller.createTodo(mockReq as Request, mockRes as Response);

      expect(mockService.createTodo).toHaveBeenCalledWith({ ...body, completed: false });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ newTodo: createdTodo });
    });

    it("should handle errors on creation", async () => {
      mockService.createTodo = jest.fn().mockRejectedValue(new Error("Validation error"));
      mockReq = { body: { description: "" } };

      await controller.createTodo(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Error creating todo",
        error: "Validation error",
      });
    });
  });

  describe("updateTodo", () => {
    it("should update and return a todo", async () => {
      const updated = { id: 1, title: "T1", description: "", completed: true };
      mockService.updateTodo = jest.fn().mockResolvedValue(updated);

      mockReq = {
        params: { id: "1" },
        body: { completed: true },
      };

      await controller.updateTodo(mockReq as Request, mockRes as Response);

      expect(mockService.updateTodo).toHaveBeenCalledWith(1, { completed: true });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(updated);
    });

    it("should return 404 if todo not found", async () => {
      mockService.updateTodo = jest.fn().mockResolvedValue(null);
      mockReq = { params: { id: "99" }, body: { completed: true } };

      await controller.updateTodo(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Todo not found" });
    });

    it("should handle errors on update", async () => {
      mockService.updateTodo = jest.fn().mockRejectedValue(new Error("Update error"));
      mockReq = { params: { id: "1" }, body: { completed: true } };

      await controller.updateTodo(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Error updating todo",
        error: "Update error",
      });
    });
  });
});
