"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
exports.authController = router;
const User_1 = require("../models/User");
const passport_1 = require("../passport");
// Show list of users
router.get("/list", (req, res) => {
    User_1.User.find()
        .then(docs => {
        res.render("auth", { text: `List of users: ${docs}` });
    })
        .catch(err => {
        res.render("auth", { text: `Something went wrong. ${err}` });
    });
});
// Show create user form
router.get("/", (req, res) => {
    res.render("auth", { text: "Make user here" });
});
// Create a new user
router.post("/", passport_1.passport.authenticate('local', { failureRedirect: "/auth" }), (req, res) => {
    res.render("auth", { text: "Your user is being created" });
});
// Show a user by id
router.get("/:id", (req, res) => {
    res.render("auth", { text: `User ${req.params.id} is being shown.` });
});
// Show edit form for user
router.get("/:id/edit", (req, res) => {
    res.render("auth", { text: `Edit page for ${req.params.id} user.` });
});
// Edit user by id
router.patch("/:id", (req, res) => {
    res.render("auth", { text: `User ${req.params.id} is being updated.` });
});
// Delete user by id
router.delete("/:id", (req, res) => {
    res.render("auth", { text: `You deleted ${req.params.id} user.` });
});
//# sourceMappingURL=auth.js.map