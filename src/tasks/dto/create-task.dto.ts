import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator'

export class CreateTaskDto {
  @IsString()
  text: string

  @IsNumber()
  projectId: number

  @IsOptional()
  @IsBoolean()
  completed?: boolean

  @IsOptional()
  @IsDateString()
  deadline?: Date
}
