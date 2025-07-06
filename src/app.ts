import express from 'express';
import bodyParser from 'body-parser';
import todoRoutes from './routes/todo.routes';
import { query } from './config/database';
import cors from 'cors';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.initializeDatabase();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors())
  }

  private routes(): void {
    this.app.use('/todos', todoRoutes);
    // Health check endpoint
    this.app.get('/health', (req, res) => {res.status(200).send('OK')});
  }

  private async initializeDatabase(): Promise<void> {
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS todos (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          completed BOOLEAN DEFAULT FALSE,
          due_date TIMESTAMP,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        )
      `);
      console.log('Database initialized');
    } catch (error) {
      console.error('Database initialization failed:', error);
      process.exit(1);
    }
  }
}

export default new App().app;