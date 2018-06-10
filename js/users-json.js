const Json = require('./json');

module.exports = class UsersJson extends Json {
  getUserByLogin(userLogin) {
    return this.getElementByPropertyValue('login', userLogin);
  }

  getUserByCredentials(userEmail, userPassword) {
    const resultUser = this.obj.find(user => {
      return user.email === userEmail && user.password === userPassword;
    });

    return resultUser;
  }

  isUserExist(userLogin) {
    if (this.getUserByLogin(userLogin)) {
      return true;
    }

    return false;
  }

  registerUser(regUser) {
    this.obj.push(regUser);

    const success = this.writeInFile();

    if (success) {
      return this.getUserByLogin(regUser.login);
    }

    // Returns undefined in case of an Error, which is equal to success = false
  }
};
