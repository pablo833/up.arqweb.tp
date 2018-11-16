export default class Task {
    constructor(task) {
        this.taskService = task;
        this.configure = this.configure.bind(this);
    }

    configure(server) {
        server.get('/task', this._processRequest.bind(this));
        server.put('/task', this._processPut.bind(this));
    }

    _processRequest(req, res, next) {
        this.taskService.get()
            .then(task => {
                if (!task) {
                    res.send(200, {
                        message: "Task not found :("
                    });
                } else {
                    task._id = undefined;

                    res.send(200, task);
                }

                return next();
            });
    }

    _processPut(req, res, next) {
        var task = {
            name = req.body.name,
            board = req.body.board,
            column = req.body.column,
            description = req.body.description
        };
        this.taskService.add(task)
            .then(() => {
                res.send(200);

                return next();
            });
    }
}