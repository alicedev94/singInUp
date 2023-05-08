const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { sequelize } = require("../database");
const bcrypt = require("bcrypt-nodejs");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await sequelize.models.modelMasterUsers.findByPk(id);
  done(null, user);
});

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await sequelize.models.modelMasterUsers.findOne({
        where: { email: email },
      });
      console.log(user);
      if (user) {
        return done(
          null,
          false,
          req.flash("signupMessage", "The Email is already Taken.")
        );
      } else {
        const newUser = await sequelize.models.modelMasterUsers.create({
          email: email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        });
        console.log(newUser);
        done(null, newUser);
      }
    }
  )
);

passport.use(
  "local-signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await sequelize.models.modelMasterUsers.findOne({
          where: { email: email },
        });
        if (!user) {
          return done(null, false, req.flash("signinMessage", "No User Found"));
        }
        const passwordEncrypt = await bcrypt.compare(
          password,
          user.dataValues.password
        );
        if (!passwordEncrypt) {
          return done(
            null,
            false,
            req.flash("signinMessage", "Incorrect Password")
          );
        }
        return done(null, user);
      } catch (error) {
        console.error(error);
      }
    }
  )
);
