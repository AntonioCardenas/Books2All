import { Injectable } from '@angular/core';
import Ceramic from "@ceramicnetwork/http-client";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import { Ed25519Provider } from "key-did-provider-ed25519"
import {ModelManager} from "@glazed/devtools";
import {DID} from "dids";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GlazeService {

  constructor() { }


  async createDef(data:any){
    const value = parseInt(environment.SEED, 16)
    const seed = new Uint8Array(value)
    const ceramic = new Ceramic('http://localhost:7007');
    const did = new DID({
      provider: new Ed25519Provider(seed),
      resolver: ThreeIdResolver.getResolver(ceramic),
    })
    await did.authenticate()
    const manager = new ModelManager(ceramic)

    // @ts-ignore
    await manager.createSchema('BooksLending', {
      $schema: 'http://json-schema.org/draft-07/schema#',
      title: 'BookLending',
      type: 'object',
      properties: {
        "name": {
          "type": "string",
          "maxLength": 150
        },
        "image": {
          "$ref": "#/definitions/imageSources"
        },
        "verified": {
          "type": "boolean",
          "title":"verified",
          "default": false
        },
        "membership_id": {
          "type": "number",
          "enum": [
            1,
            2,
            3,
            4
          ]
        },
        "background": {
          "$ref": "#/definitions/imageSources"
        },
        "birthDate": {
          "type": "string",
          "format": "date",
          "maxLength": 10
        },
        "expDate": {
          "type": "string",
          "format": "date",
          "maxLength": 10
        },
        "gender": {
          "type": "string",
          "maxLength": 42
        },
        "preferences": {
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "string",
            "maxItems": 5
          }
        },
        "residenceCountry": {
          "type": "string",
          "pattern": "^[A-Z]{2}$",
          "maxLength": 2
        },
        "licences": {
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "string",
            "maxItems": 5
          }
        },
        "lendings": {
          "type": "array",
          "items": {
            "type": "string",
          }
        },
        "loans": {
          "type": "array",
          "items": {
            "type": "string",
            "maxLength": 140
          }
        },
        "poaps": {
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "string",
            "maxItems": 5
          }
        },
        "booksOwned": {
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "string",
          }
        }
      },
    })

    const encodedModel = manager.toJSON()
    const clonedManager = ModelManager.fromJSON(ceramic, encodedModel)
    console.log(clonedManager)
    const publishedModel = await manager.toPublished()
    console.log(publishedModel)
  }
}
