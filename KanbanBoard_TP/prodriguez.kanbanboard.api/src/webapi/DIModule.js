import elasticsearch from 'elasticsearch';
import { default as BoardRoute } from './routes/Board';
import { default as TaskRoute } from './routes/Task';
import Routes from './routes/Routes';
import BoardRepo from '../repositories/BoardRepo';
import BoardService from '../services/BoardService';
import TaskRepo from '../repositories/TaskRepo';
import TaskService from '../services/TaskService';


var eslasticSearchClient = null;

var _createElasticSearchClient = () => {
    if (!eslasticSearchClient) {
        eslasticSearchClient = new elasticsearch.Client({
            host: "http://localhost:9200"
        });
    }

    return eslasticSearchClient;
}

var _createRoutes = () => {
    var client = _createElasticSearchClient();

    var boardRepo = new BoardRepo(client);
    var boardService = new BoardService(boardRepo);
    var boardRoute = new BoardRoute(boardService);

    var taskRepo = new TaskRepo(client);
    var taskService = new TaskService(taskRepo);
    var taskRoute = new TaskRoute(taskService);


    return new Routes([boardRoute, taskRoute]);
}

export default class DIModule {
    constructor() {
    }

    getRoutes = () => _createRoutes();
}