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
import { UserService } from "./user.service";
import { User } from "./user.entity";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number): Promise<User> {
    const user = await this.userService.find(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body()
    data: {
      name: string;
      email: string;
      birthdate: string;
      idDocument: string;
    },
  ): Promise<User> {
    return this.userService.create({
      ...data,
      birthdate: new Date(data.birthdate),
    } as any);
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body()
    data: Partial<Pick<User, "name" | "email" | "birthdate" | "idDocument">>,
  ): Promise<User> {
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
