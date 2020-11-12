import { expect } from "chai";
import { agent as request } from "supertest";
import { Server } from './server';

const app = new Server().getServer();

describe('api test', () => {
  it('can get app info', async () => {
    const res = await request(app).get('/api').expect(200);
    expect(res.body.version).to.exist;
  })
})
