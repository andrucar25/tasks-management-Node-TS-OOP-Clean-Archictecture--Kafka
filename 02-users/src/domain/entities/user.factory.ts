import { User, UserProps } from "./user";

export class UserFactory {
  private constructor() {}

  static create(props: UserProps): User {
    return new User(props);
  }
}