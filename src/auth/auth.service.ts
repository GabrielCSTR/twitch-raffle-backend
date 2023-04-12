import { UserEntity } from '@app/users/entities/user.entity';
import { UsersService } from '@app/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateTwitchUser(profile: any){
    const { id: twitchId } = profile;
    const user = await this.usersService.findOne(twitchId);
    if(user) {
      return user;
    } else {
      const player: UserEntity = {
        twitchId,
        ...profile,
        created_at: new Date()
      }
      const newUser = await this.usersService.create(player);
      return newUser;
    }
    
  }

  async generateAccessToken(data: any) {
      const payload = { ...data };
      return this.jwtService.sign(payload);
  }

  async verifyToken(token: string): Promise<UserEntity> {
		try {
			const decoded = await this.jwtService.verify(token.toString());
			if (typeof decoded === 'object' && 'steamid' in decoded)
				return decoded;
			throw new UnauthorizedException();
		} catch(error) {
			throw new UnauthorizedException('Token expired');
		}
	}
}
