export default class TaskService {
    constructor(TaskRepo) {
        this.TaskRepo = TaskRepo;

        this.get = this.get.bind(this);
        this.add = this.add.bind(this);
    }

    get() {
        return this.TaskRepo.get();
    }

    add(task) {
        return this.TaskRepo.add(task);
    }
}