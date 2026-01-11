import {test, expect} from "@playwright/test";

let token;
const url = 'https://apichallenges.eviltester.com/';

test.describe('Challenge', () => {

    test.beforeEach(async ({request}) => {
        let response = await request.post(`${url}challenger`);
        token = response.headers();
        //для дебага
        //console.log(`${url}gui/challenges/${token['x-challenger']}`);

        // Демо
        // создать данные
        response = await request.get(`${url}todos`, {
        headers:{
            'X-CHALLENGER': token['x-challenger'] //тут тащим токен из header запроса
        }
        });
        const body = await response.json();
        console.log(body);

        //todo
        body.todos.forEach(item => {
                expect(item).toEqual(expect.objectContaining({ id: expect.any(Number)}));
            }
        )
    });

test("Получить список челленджей", async ({ request }) => {
    let response = await request.get(`${url}challenges`, {
        headers:{
            'X-CHALLENGER': token['x-challenger'] //тут тащим токен из header запроса
        }
    });
    const body = await response.json();
    //console.log(body);
    
    response = await request.get(`${url}todos`, {
        headers:{
            'X-CHALLENGER': token['x-challenger'] //тут тащим токен из header запроса
        }
    });
    expect(body.challenges.length).toBe(59);

});
});