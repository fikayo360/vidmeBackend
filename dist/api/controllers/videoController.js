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
const youtube = require('youtube-api');
const http_status_codes_1 = require("http-status-codes");
const youTube = new youtube({
    type: "key",
    key: process.env.YOUTUBE_KEY
});
class video {
    getVideos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const videos = yield youTube.search({
                    q: 'funny', maxResults: 20, regionCode: 'NG'
                });
                res.status(http_status_codes_1.StatusCodes.OK).json(videos);
            }
            catch (err) {
                console.log(err.response.data);
            }
        });
    }
}
exports.default = video;
