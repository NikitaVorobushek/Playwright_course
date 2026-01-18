import {test, expect} from "@playwright/test";
import {Api} from "../src/services/api.facade";
import { ChallengerService, ChallengesService, TodosService } from "../src/services/index";

let token;
const url = 'https://apichallenges.eviltester.com/';

test.describe('Challenge with Services', () => {

    test.beforeAll(async ({request}, testinfo) => {
        //facade
        let api = new Api(request);
        let response = await api.challengerService.post(testinfo);

        token = response.headers['x-challenger'];
        //для дебага
        console.log(`${url}gui/challenges/${token}`);

    });

test("Получить список челленджей", async ({ request }, testinfo) => {
    let api = new Api(request);
    let response = await api.challengesService.get(testinfo, token);
    
    expect(response.body.challenges.length).toBe(59);

});

test("Получить список тудушек", async ({ request }, testinfo) => {
    let api = new Api(request);
    let response = await api.todosService.get(testinfo, token);
    
    response.body.todos.forEach(item => {
                expect(item).toEqual(expect.objectContaining({ id: expect.any(Number)}));
            }
        )

});
});
