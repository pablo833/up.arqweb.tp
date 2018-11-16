export default class BoardService {
    constructor(BoardRepo) {
        this.BoardRepo = BoardRepo;

        this.get = this.get.bind(this);
    }

    get() {
        return this.BoardRepo.get();
    }
}