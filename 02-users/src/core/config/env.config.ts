export class EnvConfig {
  private static instance: EnvConfig;
  public readonly environment: string;
  public readonly port: number;

  private constructor() {
    const {
      NODE_ENV: environment = 'development',
      PORT: port = '3000',
    } = process.env;

    this.environment = environment;
    this.port = +port; // Convert to number
  }

  //Singleton pattern to create only 1 instance of the class and just call process.env once
  public static getInstance(): EnvConfig {
    if (!EnvConfig.instance) {
      EnvConfig.instance = new EnvConfig(); 
    }
    return EnvConfig.instance;
  }

  public getConfig() {
    return {
      environment: this.environment,
      port: this.port,
    };
  }
}