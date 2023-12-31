"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../middlewares/index");
const index_2 = require("../controllers/index");
const router = express_1.default.Router();
const newComment = new index_2.comment();
router.route("/getAll").get(index_1.authUser, newComment.getCommentsByVideo);
router.route("/add").post(index_1.authUser, newComment.createComment);
module.exports = router;
