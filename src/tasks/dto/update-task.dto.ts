import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  text?: string

  @IsOptional()
  @IsNumber()
  projectId?: number

  @IsBoolean()
  completed: boolean

  @IsOptional()
  @IsDateString()
  deadline?: Date
}
