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
                const response = yield Like.create({ id, videoId, username });
                res.status(http_status_codes_1.StatusCodes.OK).json('created');
            }
            catch (err) {
                console.log(err.response.data);
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('error adding like');
            }
        });
    }
    getLikessByVideo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { videoId } = req.body;
            try {
                const comments = Like.findAll({
                    where: {
                        videoId: videoId
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                });
                res.status(http_status_codes_1.StatusCodes.OK).json(comments);
            }
            catch (err) {
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('error getting likes');
            }
        });
    }
}
exports.default = like;
