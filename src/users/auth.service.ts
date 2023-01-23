import { BadRequestException, Injectable, NotFoundException, UnauthorizedException, } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // check user is already exists or not?
    const users = await this.userService.find(email);
    if (users.length > 0) {
      throw new BadRequestException('email already in!');
    }

    //if user not exists then hash password value
    const salt = randomBytes(8).toString('hex');

    // hash password and salt 
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //join salt and hash with '.'
    const hashedPassword = salt + '.' + hash.toString('hex');
    // record user to db
    const newUser = await this.userService.createUser({ email: email, password: hashedPassword, });

    //return createdUser
    return newUser;
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);

    if (!user) {
      throw new NotFoundException('user not found with that email!');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new UnauthorizedException('password is not correct!');
    }

    return user;
  }
}
