import grpc from 'grpc';
import path from 'path';
import employeeLeaveDaysService from './services/employeeLeaveDaysService';

const PROTO_PATH = path.resolve(__dirname,'../../../grpc-proto/example.proto');
const proto = grpc.load(PROTO_PATH);
const grpcServer = new grpc.Server();

grpcServer.addService(proto.work_leave.EmployeeLeaveDaysService.service, employeeLeaveDaysService);

grpcServer.bind('0.0.0.0:50050', grpc.ServerCredentials.createInsecure());

module.exports = { grpcServer };
