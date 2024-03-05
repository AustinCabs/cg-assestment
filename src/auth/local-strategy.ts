import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy } from "passport-local";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm/repository/Repository";
import * as bcrypt from "bcrypt";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super()
  }

  private readonly logger = new Logger(LocalStrategy.name);

  public async validate(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        username
      }
    })

    if (!user) {
      this.logger.debug(user)
      this.logger.debug(`User ${username} not found!`);
      throw new HttpException(
        'User does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!(await bcrypt.compare(password, user.password))) {
      this.logger.debug(`Invalid credentials for user ${username}`);
      throw new UnauthorizedException();
    }

    this.logger.log("User Auth")
    this.logger.debug(user)
    return user;
  }
}
