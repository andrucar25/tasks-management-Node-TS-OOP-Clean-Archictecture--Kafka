export interface UserEssentials {
  readonly username: string,
  readonly email: string,
  password: string,
}

export interface UserOptionals {
  readonly id: string,
  readonly createdAt: Date,
  readonly updatedAt: Date,
  readonly isActive: boolean
}

export type UserProps = UserEssentials & Partial<UserOptionals>;

export class User {
  private readonly id: string;
  private username: string;
  private readonly email: string;
  private password: string;
  private readonly createdAt: Date;
  public updatedAt: Date | null;
  private isActive: boolean
  
  constructor(props: UserProps) {
    Object.assign(this, props);
    this.isActive = true;
  }

  properties(): UserProps {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  public setPassword(password: string): void {
    this.password = password;
  }
  
  public getPassword(): string {
    return this.password;
  }
}

