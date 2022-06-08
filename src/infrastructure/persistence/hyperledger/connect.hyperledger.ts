import * as grpc from '@grpc/grpc-js';
import { connect, Contract, Gateway, Identity, Signer, signers } from '@hyperledger/fabric-gateway';
import * as crypto from 'crypto';
import { promises as fs } from 'fs';
import * as path from 'path';

export class HyperledgerConnect {
  cryptoPath = path.resolve(__dirname, '../../../../../../test-network', 'organizations', 'peerOrganizations', 'org1.example.com');

  connection = {
    channel: this.envOrDefault('CHANNEL_NAME', 'mychannel'),
    chaincode: this.envOrDefault('CHAINCODE_NAME', 'basic'),
    mspId: this.envOrDefault('MSP_ID', 'Org1MSP'),
    cryptoPath: this.envOrDefault('CRYPTO_PATH', this.cryptoPath),
    keyDirectoryPath: this.envOrDefault('KEY_DIRECTORY_PATH', path.resolve(this.cryptoPath, 'users/User1@org1.example.com/msp', 'keystore')),
    certPath: this.envOrDefault('CERT_PATH', path.resolve(this.cryptoPath, 'users/User1@org1.example.com/msp/signcerts', 'cert.pem')),
    tlsCertPath: this.envOrDefault('TLS_CERT_PATH', path.resolve(this.cryptoPath, 'peers/peer0.org1.example.com/tls', 'ca.crt')),
    peerEndpoint: this.envOrDefault('PEER_ENDPOINT', 'localhost:7051'),
    peerHostAlias: this.envOrDefault('PEER_HOST_ALIAS', 'peer0.org1.example.com')
  };

  gateway?: Gateway;
  client?: grpc.Client;

  constructor() {
    this.displayInputParameters();
  }

  public async setUp() {
    this.client = await this.newGrpcConnection();
    this.gateway = connect({
      client: this.client,
      identity: await this.newIdentity(),
      signer: await this.newSigner(),
      // Default timeouts for different gRPC calls
      evaluateOptions: () => {
        return { deadline: Date.now() + 5000 }; // 5 seconds
      },
      endorseOptions: () => {
        return { deadline: Date.now() + 15000 }; // 15 seconds
      },
      submitOptions: () => {
        return { deadline: Date.now() + 5000 }; // 5 seconds
      },
      commitStatusOptions: () => {
        return { deadline: Date.now() + 60000 }; // 1 minute
      },
    });
  }

  public getContract(contractName?: string): Contract {
    // Get a network instance representing the channel where the smart contract is deployed.
    const network = this.gateway!.getNetwork(this.connection.channel);
    // Get the smart contract from the network.
    return network!.getContract(this.connection.chaincode, contractName);
  }

  public destroy() {
    this.gateway?.close();
    this.client?.close();
  }

  private async newGrpcConnection(): Promise<grpc.Client> {
    const tlsRootCert = await fs.readFile(this.connection.tlsCertPath);
    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
    return new grpc.Client(this.connection.peerEndpoint, tlsCredentials, {
      'grpc.ssl_target_name_override': this.connection.peerHostAlias,
    });
  }


  private async newIdentity(): Promise<Identity> {
    const credentials = await fs.readFile(this.connection.certPath);
    return { mspId: this.connection.mspId, credentials };
  }

  private async newSigner(): Promise<Signer> {
    const files = await fs.readdir(this.connection.keyDirectoryPath);
    const keyPath = path.resolve(this.connection.keyDirectoryPath, files[0]);
    const privateKeyPem = await fs.readFile(keyPath);
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    return signers.newPrivateKeySigner(privateKey);
  }


  public async displayInputParameters(): Promise<void> {
    console.log(`channelName:       ${this.connection.channel}`);
    console.log(`chaincodeName:     ${this.connection.chaincode}`);
    console.log(`mspId:             ${this.connection.mspId}`);
    console.log(`cryptoPath:        ${this.connection.cryptoPath}`);
    console.log(`keyDirectoryPath:  ${this.connection.keyDirectoryPath}`);
    console.log(`certPath:          ${this.connection.certPath}`);
    console.log(`tlsCertPath:       ${this.connection.tlsCertPath}`);
    console.log(`peerEndpoint:      ${this.connection.peerEndpoint}`);
    console.log(`peerHostAlias:     ${this.connection.peerHostAlias}`);
  }

  private envOrDefault(key: string, defaultValue: string): string {
    return process.env[key] || defaultValue;
  }
}