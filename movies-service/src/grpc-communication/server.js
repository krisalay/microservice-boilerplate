import grpc from 'grpc';
import path from 'path';

import cinemaService from './services/cinemaService';

const PROTO_PATH = path.resolve(__dirname,'../../../grpc-proto/cinema.proto');
const proto = grpc.load(PROTO_PATH);
const grpcServer = new grpc.Server();

grpcServer.addService(proto.cinema_catelog.CinemaService.service, cinemaService);

grpcServer.bind('0.0.0.0:50050', grpc.ServerCredentials.createInsecure());

module.exports = { grpcServer };
