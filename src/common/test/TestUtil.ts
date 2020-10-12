import { User } from './../../user/user.entity';

export default class TestUtil {
  static giveValidUser(): User {
    const user = new User();
    user.email = 'valid@email.com';
    user.name = 'Angelo Luz';
    user.id = '1';
    return user;
  }
}
