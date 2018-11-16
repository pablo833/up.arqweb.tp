import ElasticSearchRepository from './ElasticSearchRepository';

export default class BoardRepo extends ElasticSearchRepository {
    constructor(elasticSearchClient) {
        super(elasticSearchClient, 'board', 'board');

        this.get = this.get.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this._mapBoard = this._mapBoard.bind(this);
    }

    get() {

        return super.getAll()
            .then((objRet) => {

                if (objRet.resp.length < 1) {
                    return null;
                } else {
                    return this._mapBoard(objRet.resp);
                }
            }, (error) => { return Promise.reject(error); });
    }

    add(board) {
        return super.add(board);
    }

    update(board) {
        var document = {
            ...board,
            _id: undefined
        }

        return super.update(board._id, document);
    }

    _mapBoard(resp) {
        let boards = [];
        resp.forEach(element => {
            boards.push({
                board: {
                    _name: element._source.name,
                    _id: element._id
                }
            });
        });
        return boards;
    }
}