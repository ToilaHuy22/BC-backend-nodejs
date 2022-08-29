import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user already exists
        let user = await db.User.findOne({
          //Chỉ định đầu ra
          attributes: ["email", "roleId", "password", "firstName", "lastName"],
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

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email is exists
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage:
            "Email address has already been used. Please try another email",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        //creat sequelize user
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender,
          roleId: data.roleId,
          positionId: data.positionId,
        });
      }

      resolve({
        errCode: 0,
        message: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id: userId },
    });
    if (!user) {
      resolve({
        errCode: 2,
        errMessage: `The user doesn't exist on the system`,
      });
    }
    // if (user) {
    //   await user.destroy();
    // }
    await db.User.destroy({
      where: { id: userId },
    });
    resolve({
      errCode: 0,
      message: "The user has been deleted",
    });
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;

        await user.save();

        resolve({
          errCode: 0,
          message: "Update the user succeeds",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "User not found ",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
  getAllCodeService: getAllCodeService,
};
