module.exports = (sequelize, Sequelize) => {
  const work_list = sequelize.define("work_list", {
    project_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    project_name: {
      type: Sequelize.STRING,
    },
    project_detail: {
      type: Sequelize.STRING,
    },
    project_language: {
      type: Sequelize.STRING,
    },
    project_start: {
      type: Sequelize.STRING,
    },
    project_end: {
      type: Sequelize.STRING,
    },
  });

  return work_list;
};
