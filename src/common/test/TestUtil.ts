import { User } from './../../user/user.entity';
import { Clients } from './../../clients/clients.entity';

export default class TestUtil {
  static giveValidUser(): User {
    const user = new User();
    user.email = 'valid@email.com';
    user.name = 'Angelo Luz';
    user.id = '1';
    return user;
  }

  static giveValidClient(): Clients {
    const client = new Clients();
    client.email = 'valid@email.com';
    client.name = 'Angelo Luz';
    client.phone = '32165487';
    client.id = '1';
    return client;
  }
}
