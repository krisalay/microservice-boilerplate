import cors from 'cors';
import nconf from 'nconf';

const whiteList = [`http://${nconf.get()}`]
