import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: MongoRepository<UserEntity>,
  ) {}
  
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userSaved = await this.userRepository.save(createUserDto);
    if (!userSaved) {
      throw new InternalServerErrorException('Falha na criação do usuário');
    }
    return userSaved;
  }

  async findAll(): Promise<UserEntity[]> {
		const users = await this.userRepository.find();
    return users;
  }

  async findOne(twitchId: string) {
    return await this.userRepository.findOne({ where: { twitchId }})
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(ObjectID(id), updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
