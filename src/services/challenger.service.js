import { test } from '@playwright/test';

export class ChallengerService {
    constructor (request) {
        this.request = request;
    }
    
    async post (testinfo) {
        return test.step ('POST /challenger', async () => {
            const response = await this.request.post(`${testinfo.project.use.apiUrl}challenger`); //отпр запрос
            //return response; //получ ответ (весь)

            //const body = await response.json();
            const headers = response.headers(); 
            return {headers}; //получ тело и шапку
        })
    }


}