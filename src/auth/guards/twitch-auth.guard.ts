import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import axios from 'axios';

@Injectable()
export class TwitchAuthGuard implements CanActivate {
  constructor() {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      return axios
        .get('https://id.twitch.tv/oauth2/validate', {
          headers: {
            Authorization: `OAuth ${token}`,
          },
        })
        .then((response: AxiosResponse<any>) => {
          if (response.status === 200) {
            req.user = response.data;
            req.accessToken = token;
            return true;
          } else {
            return false;
          }
        })
        .catch(() => {
          return false;
        });
    } else {
      return false;
    }
  }
}