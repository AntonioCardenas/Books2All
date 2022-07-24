import {Inject, Injectable} from '@angular/core';
import {WEB3} from '../../core/web3';
import {Subject} from 'rxjs';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import {provider} from 'web3-core';

const norweezNFT = ''//
//
//require('../../../../contracts/Norweez.json');
const NFT_PRICE = 0

@Injectable({
    providedIn: 'root'
})
export class ContractService {
    public accountsObservable = new Subject<string[]>();

    contractDir: string = '0xa55f52461c265e9d838a37a2c886b16431b55661'
    web3Modal;
    web3js: any;
    provider: provider | undefined;
    accounts: string[] | undefined;
    balance: string | undefined;
    private gasNow: any;
    private gasLimit: Promise<any> | undefined;
    totalSupply: any;

    constructor(@Inject(WEB3) private web3: Web3) {
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider, // required
                options: {
                    infuraId: '27e484dcd9e3efcfd25a83a78777cdf1', // required
                    description: 'Scan the qr code and sign in',
                    qrcodeModalOptions: {
                        mobileLinks: [
                            'rainbow',
                            'metamask',
                            'argent',
                            'trust',
                            'imtoken',
                            'pillar'
                        ]
                    }
                }
            },
            injected: {
                display: {
                    logo: 'https://cdn.cdnlogo.com/logos/m/79/metamask.svg',
                    name: 'metamask',
                    description: "Connect with the provider in your Browser"
                },
                package: null
            },
            walletlink: {
                package: '',
                options: {
                    appName: 'Norweez', // Required
                    infuraId: '27e484dcd9e3efcfd25a83a78777cdf1', // Required unless you provide a JSON RPC url; see `rpc` below
                    network: 'ropsten',
                    darkMode: true,

                }
            },
        };

        this.web3Modal = new Web3Modal({
            network: 'mumbai', // optional
            providerOptions, // required
            theme: {
                background: 'rgb(39, 49, 56)',
                main: 'rgb(199, 199, 199)',
                secondary: 'rgb(136, 136, 136)',
                border: 'rgba(195, 195, 195, 0.14)',
                hover: 'rgb(16, 26, 32)'
            }
        });
        this.getSupply();
    }

    async connectAccount() {
        this.provider = await this.web3Modal.connect(); // set provider
        if (this.provider) {
            this.web3js = new Web3(<any>this.provider);
        } // create web3 instance

        this.gasLimit = await this.web3js.eth.getBlock("latest").then(
            (result: { gasLimit: any; }) => {
                this.gasNow = result.gasLimit
            }
        );
        this.accounts = await this.web3js.eth.getAccounts();
        return this.accounts;
    }

    async accountInfo(account: any[]) {
        const initialvalue = await this.web3js.eth.getBalance(account);
        this.balance = this.web3js.utils.fromWei(initialvalue, 'ether');
        return this.balance;
    }

    async getNetwork(){
        const NetId = await this.web3js.eth.net.getNetworkType();
        return NetId
    }

    async getContract() {
        const contract = new this.web3js.eth.Contract(
           // norweezNFT.abi,
            'rinkeby' && this.contractDir
        )
        return contract

    }


    async mintToken(account: any, amount: any) {
        this.getContract().then(contract => {
            const valueTK = NFT_PRICE * amount;
            contract.methods.mintNorweez(amount)
                .send({
                    from: account,
                    to: this.contractDir,
                    gas: 0,
                    value: valueTK
                })
                .on('transactionHash', function (hash: any) {
                    console.log('minting');
                })
                .on('receipt', function (response: any) {
                    console.log('Finished')
                    // aca va un promp de successfully minted enviar a opensea
                }).catch((err: any) => {
                console.error(err)
            });
        })
    }

    async getSupply() {
        console.log('call here');
        let contract = this.getContract().then(res => {
            return res
        })
        const totalMinted = (await contract).methods.totalSupply().call().then((supply: any) =>{
            return  supply
        }).catch((err: any) => {
            return err
        })
        return totalMinted
    }

}

