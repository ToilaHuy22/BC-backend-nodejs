import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  //Missing email or pass
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameters",
    });
  }
  let userData = await userService.handleUserLogin(email, password);

  // check email exits
  //if exits => compare password => return userInfor(roleId) => access_token(JWT: json web token)
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    //Ternary operator
    user: userData.user ? userData.user : {},
  });
};

module.exports = {
  handleLogin: handleLogin,
};
