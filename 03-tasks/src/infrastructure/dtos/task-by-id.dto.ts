import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class TaskByIdDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}