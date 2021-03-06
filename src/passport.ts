import { NextFunction, Request, Response } from "express";
// tslint:disable-next-line
import _ = require("lodash");
import passport = require("passport");
import passportLocal = require("passport-local");

import { User } from "./models/User";

// Config passport to use local strategy

// tslint:disable-next-line
const LocalStrategy = passportLocal.Strategy;
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
          return done(undefined, false, {
            message: `User with email ${email} not found.`
          });
        }
        const isMatch = await user.validatePassword(password);
        if (isMatch) {
          if (user.isActive) return done(undefined, _.omit(user, "password"));
          return done(undefined, false, {
            message: "User is not active. Check your email to activate."
          });
        }
        return done(undefined, false, {
          message: "Invalid email or password."
        });
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

export { passport };

// Allow only authenticated users and send the rest to redirectPath
export const authOnly = (redirectPath: string) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) return next();
  res.redirect(redirectPath);
};

// Allow only unauthenticated users and send the rest to redirectPath
export const unauthOnly = (redirectPath: string) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isUnauthenticated()) return next();
  res.redirect(redirectPath);
};
