import { Expose } from 'class-transformer';

export class UploadUserAvatarRDO {
  @Expose()
  public avatar: string;
}
