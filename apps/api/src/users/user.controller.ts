import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Patch,
} from "@nestjs/common";
import { ZodValidationPipe } from "../shared/pipes/zod-validation.pipe";
import { UserDto } from "./user.dto";
import {
  CreateUserInput,
  createUserSchema,
  UpdateUserInput,
  updateUserSchema,
} from "./user.schema";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number): Promise<UserDto> {
    const user = await this.userService.find(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ZodValidationPipe(createUserSchema)) data: CreateUserInput,
  ): Promise<UserDto> {
    return this.userService.create(data);
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateUserSchema)) data: UpdateUserInput,
  ): Promise<UserDto> {
    const user = await this.userService.update(id, data);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
    const deleted = await this.userService.delete(id);

    if (!deleted) {
      throw new NotFoundException(`User #${id} not found`);
    }
  }
}
