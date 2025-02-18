import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class TaskUpdateStateDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  taskId: string;

  @IsOptional() 
  @IsString()
  @IsIn(['created', 'inProgress', 'finished']) 
  state: string;

}