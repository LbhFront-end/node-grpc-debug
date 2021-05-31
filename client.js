'use strict';

const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = path.resolve(__dirname, 'protos/user_account.proto');
const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);

const account_proto = grpc.loadPackageDefinition(packageDefinition).anhuai.user.grpc;

function main() {
  console.log('client start.......')
  const client = new account_proto.UserAccount('202.105.27.66:8621', grpc.credentials.createInsecure());
  function getResponse(error, response) {
    if (error) {
      console.log(error);
      return;
    }
    console.log(response)
  }
  client.findOne({ id: 1 }, getResponse);
}

main()