import { Expose } from 'class-transformer';

export class UserDto {
  // whichever data we want to show user we should add @Expose() decorator to it.
  @Expose()
  id: number;

  @Expose()
  email: string;
}
