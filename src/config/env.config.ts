import dotenv from "dotenv";
dotenv.config();

interface IEnvConfig {
  PORT: number | undefined | string;
  DB_NAME: string | undefined;
  DB_USER: string | undefined;
  DB_PASSWORD: string | undefined;
  DB_PORT: number | undefined | string;
  DB_HOST: string | undefined;
  DB_SCHEMA: string | undefined;
}

/**
 * Класс-синглтон для получения env переменных
 */
class EnvConfig {
  private _env: IEnvConfig;
  private static _instance: EnvConfig;

  private constructor() {
    this._env = this._loadEnv();
  }

  /**
   * Метод для загрузки переменных
   */
  private _loadEnv(): IEnvConfig {
    return {
      PORT: process.env.PORT,
      DB_NAME: process.env.DB_NAME,
      DB_USER: process.env.DB_USER,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_PORT: process.env.DB_PORT,
      DB_HOST: process.env.DB_HOST,
      DB_SCHEMA: process.env.DB_SCHEMA,
    };
  }

  /**
   * Метод для получения env переменной
   */
  getEnv<T>(env: keyof typeof this._env): T {
    return this._env[env] as T;
  }

  /**
   * Метод для получения инстанса класса-синглтона
   */
  static getInstance() {
    if (!EnvConfig._instance) {
      EnvConfig._instance = new EnvConfig();
    }
    return EnvConfig._instance;
  }
}

export const envConfig = EnvConfig.getInstance();
