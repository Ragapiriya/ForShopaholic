const sendToken = (user, statusCode, res) => {
  //creating JWT token
  const token = user.getJwtToken();

  //setting cookies
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ), //after this duration, cookies expire [removed from the client side]
    httpOnly: true, //only HTTP can use these cookies, not JS or others
  };

  res.status(statusCode).cookie("token",token,options).json({
    success: true,
    user: user,
    token: token,
  });
};

module.exports = sendToken;
