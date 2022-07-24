import {Inject, Injectable} from '@angular/core';
import {SelfID} from '@self.id/web'
import {ThreeIdConnect, EthereumAuthProvider} from '@3id/connect'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import Ceramic from '@ceramicnetwork/http-client'
import {DID} from 'dids'

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  @Inject('ThreeIdConnect') private ThreeIdConnect: typeof ThreeIdConnect | undefined;
  @Inject('eth') private EthereumAuthProvider: any;
  private profile: any;
  private addresses: any;

  constructor() {}

  async connect3id() {
    const threeIdConnect = new ThreeIdConnect();
    this.addresses = await window.ethereum.enable()
    const authProvider = new EthereumAuthProvider(window.ethereum, this.addresses[0]);
    await threeIdConnect.connect(authProvider);
    // clay ceramic url https://gateway-clay.ceramic.network
    // mainet ceramic url https://gateway.ceramic.network
    // write/read nodes Clay testnet https://ceramic-clay.3boxlabs.com

    const ceramic = new Ceramic('https://ceramic-clay.3boxlabs.com');
    const did = new DID({
      provider: threeIdConnect.getDidProvider(),
      resolver: ThreeIdResolver.getResolver(ceramic),
    })
    await did.authenticate()
    await ceramic.setDID(did)
    return did
  }



  async getAuth() {
    const self = await SelfID.authenticate({
      authProvider: new EthereumAuthProvider(window.ethereum, this.addresses[0]),
      ceramic: 'testnet-clay',
      connectNetwork: 'testnet-clay',
    });
    return self
  }


  async getRecord() {
    this.getAuth().then(self => {
      self.did
    });
  }

  async getData(data: any) {
    this.getAuth().then(self => {
      self.did

      self.get('basicProfile')
      this.profile = Promise.all([
        self.get('basicProfile'),
      ])
    });
  }

  async updateProfile(data:any) {
    this.getAuth().then(self => {
      const user = {
        bio: data.bio || "",
        name: data.name || "",
        affiliations: data.aft || ['Citizen'],
        nationalities: data.nct || ['HN'],
        homeLocation: data.home || 'denver',
        gender: data.gender || 'prefer not say',
      }
      self.set('basicProfile', user);
    });
  }


  async getProfileData() {
  const profile = this.getAuth().then(self => {
      const data = self.get('basicProfile').then(response => {
        return response
      })
    return data
    //  const crypto = self.get('cryptoAccounts').then(response => {
    //  });
    });
return profile
  }


}
