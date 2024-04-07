const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const AdminModel = require("../../models/admin");

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const admin = await AdminModel.findOne({ where: { email } });
        if (!admin) {
          return done(null, false, { message: "Incorrect email." });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, admin);
      } catch (err) {
        return done(err);
      }
    }
  )
);
passport.use(
  "local-register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const { userName } = req.body;
        const existingAdmin = await AdminModel.findOne({ where: { email } });
        if (existingAdmin) {
          return done(null, false, { message: "Email is already registered." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await AdminModel.create({
          userName,
          email,
          password: hashedPassword,
        });
        return done(null, newAdmin);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((admin, done) => {
  done(null, admin.adminId);
});

passport.deserializeUser(async (adminId, done) => {
  try {
    const admin = await AdminModel.findByPk(adminId);
    done(null, admin);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
