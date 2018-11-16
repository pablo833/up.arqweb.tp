export default class Board {
    constructor(board) {
        this.boardService = board;
        this.configure = this.configure.bind(this);
    }
    configure(server) {
        server.get('/board', this._processRequest.bind(this));
        server.put('/board', this._processPut.bind(this));
    }


    _processRequest(req, res, next) {
        this.boardService.get()
            .then(board => {
                if (!board) {
                    res.send(200, {
                        message: "Board not found :("
                    });
                } else {
                    board._id = undefined;

                    res.send(200, board);
                }

                return next();
            });
    }

    _processPut(req, res, next) {
        var board = {
            name = req.body.name
        };
        this.boardService.add(board)
            .then(() => {
                res.send(200);

                return next();
            });
    }
}