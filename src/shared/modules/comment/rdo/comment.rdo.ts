import {Expose, Type} from 'class-transformer';

import {UserRDO} from '../../user/rdo/user.rdo.js';

export class CommentRDO {
  @Expose()
  public id: string;

  @Expose()
  public content: string;

  @Expose()
  public rating: number;

  @Expose({ name: 'createdAt'})
  public date: string;

  @Expose({ name: 'userId'})
  @Type(() => UserRDO)
  public author: UserRDO;
}
