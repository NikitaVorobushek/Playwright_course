import {ChallengerService, ChallengesService, TodosService} from './index';

export class Api {
    constructor(request) {
        this.request = request;
        this.challengerService = new ChallengerService(request);
        this.challengesService = new ChallengesService(request);
        this.todosService = new TodosService(request);
}
}