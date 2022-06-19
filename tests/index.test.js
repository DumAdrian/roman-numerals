const app = require('../app');
const request = require('supertest');

describe('roman-numeral flow tests', () => {

    // happy flow
    it('returns status code 200 if we get a number in range', async () => {
        const res = await request(app).get('/romannumeral?query=20');

        expect(res.statusCode).toEqual(200);
    });

    it('returns not found if endpoint not found', async () => {
        const res = await request(app).get('/romannumerals?query=20');

        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('Route /romannumerals not found');
        expect(res.body.errorType).toEqual('NotFoundError');
    });

    it(`returns bad request if query param 'query' is missing`, async () => {
        const res = await request(app).get('/romannumeral?query2=20');

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual(`Missing query param 'query'`);
        expect(res.body.errorType).toEqual('MissingQuerryParamError');
    });

    it('returns bad request if input is outside of range 1-2200000000', async () => {
        const res = await request(app).get('/romannumeral?query=0');

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Number 0 not in range 1 - 2200000000');
        expect(res.body.errorType).toEqual('OutOfRangeError');
    });

    it('returns bad request if input is outside of range 1-2200000000', async () => {
        const res = await request(app).get('/romannumeral?query=2200000001');

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Number 2200000001 not in range 1 - 2200000000');
        expect(res.body.errorType).toEqual('OutOfRangeError');
    });

    it('returns bad request if input is empty', async () => {
        const res = await request(app).get('/romannumeral?query=');

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Input should be a Number!');
        expect(res.body.errorType).toEqual('BadInputTypeError');
    });

    it('returns bad request if input is string', async () => {
        const res = await request(app).get('/romannumeral?query=qwerty');

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Input should be a Number!');
        expect(res.body.errorType).toEqual('BadInputTypeError');
    });
});

describe('roman-numeral algorithm tests', () => {
    var runs = [
        {in: 1, out: 'I'},
        {in: 4, out: 'IV'},
        {in: 20, out: 'XX'},
        {in: 255, out: 'CCLV'},
        {in: 999, out: 'CMXCIX'},
        {in: 2022, out: 'MMXXII'},
        {in: 3999, out: 'MMMCMXCIX'},
        {in: 4000, out: 'I̅V̅'},
        {in: 10000, out: 'X̅'},
        {in: 20500, out: 'X̅X̅D'},
        {in: 4000000, out: 'I̿V̿'},
        {in: 2200000000, out: 'M̿M̿C̿C̿'},
      ];

    runs.forEach(function (run) {
        it('returns roman representation for input ' + run.in, async () => {
            const res = await request(app).get(`/romannumeral?query=${run.in}`);

            expect(JSON.parse(res.text).result).toEqual(run.out);
        });
    });

});