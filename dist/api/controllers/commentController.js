"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const uuid_1 = require("uuid");
const Comment = require('../../models/Comment');
class comment {
    createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const { videoId, username, userPic, comment } = req.body;
            try {
                const response = yield Comment.create({ id, videoId, username, userPic, comment });
                res.status(http_status_codes_1.StatusCodes.OK).json('created');
            }
            catch (err) {
                console.log(err.response.data);
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('error creating comments');
            }
        });
    }
    getCommentsByVideo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { videoId } = req.query;
            try {
                const comments = Comment.findAll({
                    where: {
                        videoId: videoId
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                });
                res.status(http_status_codes_1.StatusCodes.OK).json(comments.dataValues);
                console.log(comments.dataValues);
            }
            catch (err) {
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('error getting comments');
            }
        });
    }
}
exports.default = comment;
