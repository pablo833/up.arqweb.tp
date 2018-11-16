import restify from 'restify';

export default class Server {
    constructor(diModule) {
        this.routes = diModule.getRoutes();
    }

    run() {
        var server = restify.createServer({ name: 'Server: api kanban board' });
        server.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
          });
        
        server.use(restify.plugins.bodyParser({
            mapParams: true
        }));

        this.routes.configure(server);

        server.listen(8080, () => {
            console.log('%s listening at %s', server.name, server.url);
        });
    }
}