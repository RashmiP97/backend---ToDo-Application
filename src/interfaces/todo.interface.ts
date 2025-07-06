export interface ITodo {
    id?: number;
    title: string;
    description?: string;
    completed: boolean;
    created_at?: Date;
    updated_at?: Date;
  }
  
  export interface ITodoRepository {
    findAll(): Promise<ITodo[]>;
    create(todo: Omit<ITodo, 'id'>): Promise<ITodo>;
    update(id: number, todo: Partial<ITodo>): Promise<ITodo | null>;
  }