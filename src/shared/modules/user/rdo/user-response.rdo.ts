import { Expose } from 'class-transformer';

export class UserResponseRdo {
  @Expose()
  public email: string ;

  @Expose()
  public id: string;
}
