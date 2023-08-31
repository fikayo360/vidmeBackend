"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../middlewares/index");
const index_2 = require("../controllers/index");
const router = express_1.default.Router();
const newVideo = new index_2.video();
router.route("/get").get(index_1.authUser, newVideo.getVideos);
module.exports = router;
