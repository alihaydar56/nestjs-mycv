import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  createUser(data: CreateUserDto) {
    const user = this.repo.create(data);

    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  findAll(){
    return this.repo.find();
  }

  find(email: string) {
    return this.repo.findBy({ email });
  }

  // we user Partial<User> cause,we dont know which value of attirbute will be updated
  // for that we use Partial<Entity>
  async updateUser(id: number, attrs: Partial<User>) {
    const user = await this.repo.findOneBy({ id });
    if(!user){
        throw new NotFoundException('user not found with that id!')
    }
    console.log("before :",user);
    Object.assign(user, attrs);
    console.log("after :",user);
    return this.repo.save(user);
  }

  async deleteUser(id:number){
    const user=await this.repo.findOneBy({id});
    if(!user){
        throw new Error('user not found with that id!');
    }

    return this.repo.remove(user);
  }
}
