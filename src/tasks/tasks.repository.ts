import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task) private readonly repository: Repository<Task>,
  ) {}
  async createTask(createTaskDto: CreateTaskDto) {
    return this.repository.save(createTaskDto);
  }

  async count() {
    return this.repository.count();
  }
}
