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
const Like = require('../../models/Like');
class like {
    createLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const { videoId, username } = req.body;
            try {
                const like = yield Like.findOne({
                    where: {
                        username: username,
                        videoId: videoId
                    }
                });
                if (!like) {
                    const response = yield Like.create({ id, videoId, username });
                    res.status(http_status_codes_1.StatusCodes.OK).json('created');
                }
                else {
                    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('already liked');
                }
            }
            catch (err) {
                console.log(err.response.data);
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('error adding like');
            }
        });
    }
    getLikessByVideo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { videoId } = req.query;
            try {
                const likes = yield Like.findAll({
                    raw: true,
                    where: {
                        videoId: videoId
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                });
                res.status(http_status_codes_1.StatusCodes.OK).json(likes);
            }
            catch (err) {
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('error getting likes');
            }
        });
    }
}
exports.default = like;
