import { err, ok, Result } from "neverthrow";

import { EmailException } from "../exceptions/email.exceptions";

export type EmailVOResult = Result<EmailVO, EmailException>;

export class EmailVO {
  private constructor(private readonly value: string) {}
  static create(value: string): EmailVOResult {
    const pattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      
    if (value.match(pattern)) return ok(new EmailVO(value));

    return err(new EmailException());
  }

  getvalue(): string {
    return this.value;
  }
}