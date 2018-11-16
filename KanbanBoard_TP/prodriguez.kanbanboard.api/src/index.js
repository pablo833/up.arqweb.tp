import Server from './webapi/Server';
import { default as WebApiDIModule } from './webapi/DIModule';

var webApiDIModule = new WebApiDIModule();
var webapiServer = new Server(webApiDIModule);

webapiServer.run();