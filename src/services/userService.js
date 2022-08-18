import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user already exists
        let user = await db.User.findOne({
          //Chỉ định đầu ra
          attributes: ["email", "roleId", "password"],
          where: { email: email },
          //set Rawobject
          raw: true,
        });
        //compare password => bcrypt.compareSync("not_bacon", hash); // false
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          //password exactly
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "ok";
            //delete render password
            delete user.password;
            userData.user = user;
          } else {
            //password wrong
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User's  not found`;
        }
      } else {
        //user not exists
        //return
        userData.errCode = 1;
        userData.errMessage = `Your's Email ins't exist in your system. Please try other email`;
      }
      //return userData
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      //getAll
      let users = "";
      if (userId === "All") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      //getOne
      if (userId && userId !== "All") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
};
