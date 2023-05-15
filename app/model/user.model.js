module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("user", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.INTEGER,
    },
  });

  return user;
};
