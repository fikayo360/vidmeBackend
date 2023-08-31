"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../middlewares/index");
const index_2 = require("../controllers/index");
const router = express_1.default.Router();
const newUser = new index_2.user();
router.route("/signup").post(newUser.register);
router.route("/login").post(newUser.login);
router.route("/forgotPassword").post(newUser.forgotPassword);
router.route("/changePassword").post(newUser.changePassword);
router.route("/updateProfilePic").post(index_1.authUser, newUser.updateProfile);
module.exports = router;
