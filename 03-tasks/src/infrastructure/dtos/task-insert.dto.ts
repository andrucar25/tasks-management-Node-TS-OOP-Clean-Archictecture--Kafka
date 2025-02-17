import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class TaskInsertDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional() 
  @IsString()
  @IsIn(['low', 'medium', 'high']) 
  priority?: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  creator: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  assignedTo: string;

  @IsNotEmpty()
  @IsInt()
  limitDate: number;
}