import { Injectable } from '@angular/core';
import { Magic, RPCError, RPCErrorCode } from 'magic-sdk';
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class MagicService {
  magic = new Magic(environment.magicUrl);

  constructor() {
  }


  
  async render(email:any){
    this.magic.preload().then(() => console.log('Magic <iframe> loaded.'));

    await this.magic.auth.loginWithMagicLink(
      { email: email,
        redirectURI: `${window.location.origin}/magic-link-callback`

      });
  } catch (err: { code: any; }) {
    if (err instanceof RPCError) {
      switch (err.code) {
        case RPCErrorCode.MagicLinkFailedVerification:
        case RPCErrorCode.MagicLinkExpired:
        case RPCErrorCode.MagicLinkRateLimited:
        case RPCErrorCode.UserAlreadyLoggedIn:
          // Handle errors accordingly :)
          break;
      }
    }
  }


  async getUser(){
    const userMetadata =  await this.magic.user.getMetadata();
    return userMetadata
  }


  async State(){
    const isLoggedIn = await this.magic.user.isLoggedIn();
    if(isLoggedIn === true){
      console.log('listen')
      return isLoggedIn

    } else {
      console.warn('notLoggedIn');
      return isLoggedIn
    }
  }
  async Logout(){
    await this.magic.user.logout().then(value => {
      console.log(value)
    })
  }



}
