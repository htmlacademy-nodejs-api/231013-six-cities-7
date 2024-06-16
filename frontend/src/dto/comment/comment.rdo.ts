import { UserRDO } from '../user/user.rdo';

export class CommentRDO {
  public id!: string;

  public rating!: number;

  public content!: string;

  public date!: string;

  public author!: UserRDO;
}
