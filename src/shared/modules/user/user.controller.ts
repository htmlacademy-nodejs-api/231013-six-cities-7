import {inject, injectable} from 'inversify';
import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

import {
  BaseController,
  HttpMethod,
  HttpError,
  UploadFileMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
  PrivateRouteMiddleware
} from '../../libs/rest/index.js';
import {Logger} from '../../libs/logger/index.js';
import {Component} from '../../enum/index.js';
import {Config, RestSchema} from '../../libs/config/index.js';
import {fillDTO} from '../../helpers/index.js';
import {AuthService} from '../auth/index.js';
import {CreateUserRequest} from './create-user-request.type.js';
import {UserService} from './user-service.interface.js';
import {LoginUserRequest} from './login-user-request.type.js';
import {CreateUserDTO} from './dto/create-user.dto.js';
import {LoginUserDTO} from './dto/login-user.dto.js';
import {UserRDO} from './rdo/user.rdo.js';
import {LoggedUserRDO} from './rdo/logged-user.rdo.js';
import {UploadUserAvatarRDO} from './rdo/upload-user-avatar.rdo.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
    @inject(Component.AuthService) private readonly authService: AuthService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({
      path: '/register', method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateUserDTO),
      ]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [
        new ValidateDtoMiddleware(LoginUserDTO),
      ]
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(
          this.configService.get('UPLOAD_DIRECTORY'),
          'avatar'
        )
      ]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuthenticate,
      middlewares: [new PrivateRouteMiddleware()]
    });
  }

  public async checkAuthenticate({ tokenPayload: { email }}: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(email);

    if (! foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(LoggedUserRDO, foundedUser));
  }

  public async create(
    {body, tokenPayload}: CreateUserRequest,
    res: Response,
  ): Promise<void> {
    if(tokenPayload) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'Registration not available to authorized users',
        'UserController',
      );
    }
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRDO, result));
  }

  public async login(
    {body}: LoginUserRequest,
    res: Response,
  ): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRDO, user);
    this.ok(res, Object.assign(responseData, { token }));
  }

  public async uploadAvatar({ params, file }: Request, res: Response) {
    const {userId} = params;
    const uploadFile = { avatar: file?.filename };
    await this.userService.updateById(userId, uploadFile);
    this.created(res, fillDTO(UploadUserAvatarRDO, { filepath: uploadFile.avatar }));
  }
}
