// const db = require("../model");
// const userDB = db.db.user;
// const infoDB = db.db.info;
// const appDB = db.db.appInfo;
// const allDataDB = db.db.allData;
const db = require("../model");
const workDB = db.db.work_list;
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
exports.addWork = async (req, res) => {
  try {
    const project_name = req.body.projectName;
    const project_detail = req.body.projectDetail;
    const project_language = req.body.projectLanguage;
    const project_startDate = req.body.startDate;
    const project_endDate = req.body.endDate;
    if (
      project_name &&
      project_detail &&
      project_language &&
      project_startDate &&
      project_endDate
    ) {
      const createData = {
        project_name: project_name,
        project_detail: project_detail,
        project_language: project_language,
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
      // const resData = {
      //   resCode: "0000",
      //   resData: count,
      //   msg: "success",
      // };
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
