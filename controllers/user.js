const User = require("../models/user");
module.exports.signUp = (req, res) => {
  res.render("user/register");
};
module.exports.createUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to YelpCamp");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
};
module.exports.login = (req, res) => {
  res.render("user/login");
};
module.exports.validLogin = (req, res) => {
  req.flash("success", "Welcome Back");
  const redirectUrl = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};
module.exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "Successfully logged you out");
  res.redirect("/campgrounds");
};
