const { User } = require('../../db/models');
const bcrypt = require('bcrypt');

module.exports = class AuthService {
  static async signUp({ name, email, password }) {
    // Проверяем на заполнение полей формы.
    // Если не заполнены - выбрасываем ошибку
    if (!name || !email || !password) {
      throw new Error('Fill all fields');
    }

    // Если проверка выше прошла - работаем с паролем, шифруем его
    const hashpass = await bcrypt.hash(password, 10);

    // Либо получаем существующего пользователя, либо создаем нового
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name,
        hashpass,
      },
    });

    // Если пользователь не создан - выкидываем ошибку
    if (!created) {
      throw new Error('User already exists');
    }

    // "Достаем созданного пользователя"
    const plainUser = user.get();
    // Удаляем пароль, чтобы при возврате пользователя его не было
    delete plainUser.hashpass;

    return plainUser;
  }

  static async signIn({ email, password }) {
    // Проверяем на заполнение полей формы.
    // Если не заполнены - выбрасываем ошибку
    if (!email || !password) {
      throw new Error('Fill all fields');
    }

    const user = await User.findOne({ where: { email } });

    // Если проверка выше прошла - работаем с паролем, шифруем его
    const hashpass = await bcrypt.compare(password, user.hashpass);

    if (!hashpass) {
      throw new Error('Incorrect password');
    }

    // "Достаем созданного пользователя"
    const plainUser = user.get();
    // Удаляем пароль, чтобы при возврате пользователя его не было
    delete plainUser.hashpass;

    return plainUser;
  }
};
