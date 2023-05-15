const db = require("../model");
const workDB = db.db.work_list;
const userDB = db.db.user;
let express = require("express");
let router = express.Router();
let path = require("path");
// const pagingClass = new PaginationService();
function paginationCal(total, perPage, currentPage) {
  return {
    skips: perPage * currentPage - perPage,
    totalPages: Math.ceil(total / perPage),
    limit: perPage,
  };
}
exports.login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
      const result = await userDB.findOne({
        where: { username: username, password: password},
      });
      if (result.status === 1) {
        const resData = {
          resCode: "0000",
          resData: result,
          msg: "success",
        };
        res.send(resData);
      } else if (result.status === 0) {
        const resData = {
          resCode: "1000",
          resData: result,
          msg: "user have been banned",
        };
        res.send(resData);
      } else {
        const resData = {
          resCode: "1000",
          resData: {},
          msg: "user not found",
        };
        res.send(resData);
      }
    }
  } catch (error) {
    const resError = {
      resCode: "1000",
      resData: {},
      msg: "error",
    };
    console.error("-> gets -> catch : ", error);
    res.send(resError);
  }
};
exports.register = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
      const result = await userDB.findOne({
        where: { username: username },
      });
      if (result) {
        const resData = {
          resCode: "1000",
          resData: {},
          msg: "username is already exist",
        };
        res.send(resData);
      } else {
        const createData = {
          username: username,
          password: password,
          status: 1,
        };
        const addDataUser = await userDB.create(createData);
        const resData = {
          resCode: "0000",
          resData: addDataUser,
          msg: "success",
        };
        res.send(resData);
      }
    }
  } catch (error) {
    const resError = {
      resCode: "1000",
      resData: {},
      msg: "error",
    };
    console.error("-> gets -> catch : ", error);
    res.send(resError);
  }
};
exports.addWork = async (req, res) => {
  try {
    const project_name = req.body.projectName;
    const project_detail = req.body.projectDetail;
    const project_language = req.body.projectLanguage;
    const project_status = req.body.projectStatus;
    const project_startDate = req.body.startDate;
    const project_endDate = req.body.endDate;
    if (
      project_name &&
      project_detail &&
      project_language &&
      project_status &&
      project_startDate &&
      project_endDate
    ) {
      const createData = {
        project_name: project_name,
        project_detail: project_detail,
        project_language: project_language,
        project_status: project_status,
        project_start: project_startDate,
        project_end: project_endDate,
      };
      const addDataWorkList = await workDB.create(createData);
      const resData = {
        resCode: "0000",
        resData: createData,
        msg: "success",
      };
      // console.log("addDataWorkList ->", addDataWorkList);
      res.send(resData);
    } else {
      const resError = {
        resCode: "1000",
        resData: {},
        msg: "error",
      };
      res.send(resError);
    }
  } catch (error) {
    const resError = {
      resCode: "1000",
      resData: {},
      msg: "error",
    };
    console.error("-> gets -> catch : ", error);
    res.send(resError);
  }
};
exports.getPagination = async (req, res) => {
  try {
    const perPages = Number(req.body.perPages);
    const currentPage = Number(req.body.currentPage);
    if (perPages && currentPage) {
      const count = await workDB.count();
      console.log(count);
      const x = paginationCal(count, perPages, currentPage);
      const result = await workDB.findAll({
        offset: x.skips,
        limit: x.limit,
        where: {},
      });
      const itemPerpage = result.length;
      const resData = {
        totalItems: count,
        itemsPerPage: itemPerpage,
        totalPages: x.totalPages,
        currentPage: currentPage,
        datas: result,
      };
      res.send(resData);
    }
  } catch (error) {
    const resError = {
      resCode: "1000",
      resData: {},
      msg: "error",
    };
    console.error("-> gets -> catch : ", error);
    res.send(resError);
  }
};
exports.deleteWorkById = async (req, res) => {
  try {
    if (req.body.projectId) {
      const project_id = req.body.projectId;
      const result = await workDB.findAll({
        where: {
          project_id: project_id,
        },
      });
      if (result) {
        console.log("delete");
        const destroy = await workDB.destroy({
          where: {
            project_id: project_id,
          },
        });
        const resData = {
          resCode: "0000",
          resData: destroy,
          msg: "success",
        };
        res.send(resData);
      } else {
        const resData = {
          resCode: "1000",
          resData: {},
          msg: "id not found",
        };
        res.send(resData);
      }
    }
  } catch (error) {
    const resError = {
      resCode: "1000",
      resData: {},
      msg: "error",
    };
    console.error("-> gets -> catch : ", error);
    res.send(resError);
  }
};
