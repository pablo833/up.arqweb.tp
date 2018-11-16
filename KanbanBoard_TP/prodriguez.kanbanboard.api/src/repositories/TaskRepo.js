import ElasticSearchRepository from './ElasticSearchRepository';

export default class TaskRepo extends ElasticSearchRepository {
    constructor(elasticSearchClient) {
        super(elasticSearchClient, 'task', 'task');

        this.get = this.get.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this._mapTask = this._mapTask.bind(this);
    }

    get() {

        return super.getAll()
            .then((objRet) => {

                if (objRet.resp.length < 1) {
                    return null;
                } else {
                    return this._mapTask(objRet.resp);
                }
            }, (error) => { return Promise.reject(error); });
    }

    add(task) {
        return super.add(task);
    }

    update(task) {
        var document = {
            ...task,
            _id: undefined
        }

        return super.update(task._id, document);
    }

    _mapTask(resp) {
        let tasks = [];
        resp.forEach(element => {
            tasks.push({
                task: {
                    _name: element._source.name,
                    _board: element._source.board,
                    _column: element._source.column,
                    _description: element._source.description,
                    _id: element._id
                }
            });
        });
        return tasks;
    }
}