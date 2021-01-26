import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator'

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  text?: string

  @IsOptional()
  @IsNumber()
  projectId?: number

  @IsOptional()
  @IsBoolean()
  completed: boolean

  @IsOptional()
  @IsBoolean()
  priority: boolean

  @IsOptional()
  @IsDateString()
  deadline?: Date
}
