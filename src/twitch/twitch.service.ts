import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import * as APP_CONFIG from '@app/app.config'

@Injectable()
export class TwitchService {
  constructor(private httpService: HttpService)
  { }

  async getSubs(userId: string, accessToken: string): Promise<any> {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Client-ID': APP_CONFIG.TWITCH.clientID, // Substitua pelo ID da sua aplicação Twitch
    };
    let subs: any[] = [];
    let cursor = '';
    do {
    const { data: subsData } : any = await this.httpService
      .get(`https://api.twitch.tv/helix/subscriptions?first=100&broadcaster_id=${userId}`, {
        headers,
        params: {
          broadcaster_id: userId,
          first: 100,
          after: cursor,
        },
      })
      .toPromise()
      .catch((error) => {
        Logger.error(error, 'Join');
      });

      if (!subsData) {
        throw new Error('Não foi possível obter a resposta da API do Twitch.');
      }

      if (!Array.isArray(subsData.data)) {
        throw new Error('A resposta da API do Twitch não está no formato esperado.');
      }

      subs.push(...subsData.data); // save views
      cursor = subsData.pagination.cursor; // save last page

      } while (cursor);

      // Get Views ID
      const userIds: any = subs.map((follow) => follow.user_id);
      
      // Máximo de usuários que podem ser buscados por vez
      const batchSize = 100;
      // Divida a lista de IDs de usuário em lotes menores
      const batches = [] as any;
      for (let i = 0; i < userIds.length; i += batchSize) {
        batches.push(userIds.slice(i, i + batchSize));
      }
      // Faça várias chamadas à API do Twitch para cada lote de IDs de usuário
      const usersData = [] as any;
      for (const batch of batches) {
        const batchIds = batch.join('&id=');
        const { data: batchData } : any = await this.httpService.get(`https://api.twitch.tv/helix/users?id=${batchIds}`, {
          headers
        }).toPromise()
        .catch((error) => {
          Logger.error(error, 'Join');
        });

        usersData.push(...batchData.data);
      }
      const usersWithViewsAndImage = subs.map((follow) => {
        const user = usersData.find((userData) => userData.id === follow.user_id);
        return {
          ...follow,
          views: user?.view_count,
          image: user?.profile_image_url,
        };
      });

      const response = usersWithViewsAndImage.map((item, key) => ({
        value: key,
        color: "black",
        selected: false,
        currentMiddle: false,
        img: item.image,
        from_id: item.user_id,
        from_name: item.user_name,
        is_gift: item.is_gift,
      }));
      
      console.log("SUBS TOTAL", subs.length);
      console.log("USERS TOTAL", usersData.length);

      return { data: response };
  }

  async getViews(userId: string, accessToken: string): Promise<any> {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Client-ID': APP_CONFIG.TWITCH.clientID, // Substitua pelo ID da sua aplicação Twitch
    };
    let views: any[] = [];
    let cursor = '';
    do {
    const { data: followsData } : any = await this.httpService
    .get(`https://api.twitch.tv/helix/users/follows?to_id=${userId}`, {
        headers,
        params: {
          broadcaster_id: userId,
          first: 100,
          after: cursor,
        },
      }
    )
    .toPromise()
    .catch((error) => {
      Logger.error(error, 'Join');
    })

    if (!followsData) {
      throw new Error('Não foi possível obter a resposta da API do Twitch.');
    }

    if (!Array.isArray(followsData.data)) {
      throw new Error('A resposta da API do Twitch não está no formato esperado.');
    }

    views.push(...followsData.data); // save views
    cursor = followsData.pagination.cursor; // save last page

    } while (cursor);

    // Get Views ID
    const userIds: any = views.map((follow) => follow.from_id);

    // Máximo de usuários que podem ser buscados por vez
    const batchSize = 100;
    // Divida a lista de IDs de usuário em lotes menores
    const batches = [] as any;
    for (let i = 0; i < userIds.length; i += batchSize) {
      batches.push(userIds.slice(i, i + batchSize));
    }

    // Faça várias chamadas à API do Twitch para cada lote de IDs de usuário
    const usersData = [] as any;
    for (const batch of batches) {
      const batchIds = batch.join('&id=');
      const { data: batchData } : any = await this.httpService.get(`https://api.twitch.tv/helix/users?id=${batchIds}`, {
        headers
      }).toPromise()
      .catch((error) => {
        Logger.error(error, 'Join');
      });

      usersData.push(...batchData.data);
    }

    const usersWithViewsAndImage = views.map((follow) => {
      const user = usersData.find((userData) => userData.id === follow.from_id);
      return {
        ...follow,
        views: user?.view_count,
        image: user?.profile_image_url,
      };
    });

    const response = usersWithViewsAndImage.map((item, key) => ({
      value: key,
      color: "black",
      selected: false,
      currentMiddle: false,
      img: item.image,
      followed_at: item.followed_at,
      from_id: item.from_id,
      from_name: item.from_name,
    }));
        
    // console.log(response);
    console.log("VIEWS TOTAL", views.length);
    console.log("USERS TOTAL", usersData.length);
    
    return { data: response };
  }

  chunkArray(array: any[], size: number): any[][] {
    const chunks = [] as any;
    let i = 0;
  
    while (i < array.length) {
      chunks.push(array.slice(i, i + size));
      i += size;
    }
  
    return chunks;
  }
}
