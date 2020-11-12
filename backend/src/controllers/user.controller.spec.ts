import { expect } from 'chai';
import { agent as request } from 'supertest';
import {stub} from 'sinon'

import {userService} from './user.controller';

import { Server } from '../server';

const app = new Server().getServer();

describe('user can register', () => {
  it('can register', async () => {
      
    const stubUser = {
        id: 0,
        email: 'user@example.org',
        userName: 'user',
        password: 'Testtest.123',
        firstName: 'Us',
        lastName: 'Er',
        isAdmin: false,
        gender: 'other',
        phone: '12123',
        street: 'street',
        zip: 'zip',
        city: 'city',
        country: 'country'
    };
    stub(userService, 'register').returns(Promise.resolve(stubUser));
    const res = await request(app)
      .post('/api/user/register')
      .send(
        stubUser
      )
      .set('Accept', 'application/json')
      .expect(200);
    console.log(res.body);
    expect(res.body).to.exist;
  });
});
