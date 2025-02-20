import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty({ message: "El título no puede estar vacío." })
  @MaxLength(100, { message: "El título no puede exceder 100 caracteres." })
    title!: string;

  @IsString()
  @MaxLength(500, {
    message: "La descripción no puede exceder 500 caracteres.",
  })
    description!: string;

  @IsString()
    userEmail!: string;

  @IsOptional()
  @IsString()
    type?: string;
}
