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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
const Video = require('../../models/Video');
class video {
    getVideos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'https://www.googleapis.com/youtube/v3/search?q=sabinus&regionCode=NG&maxResults=1&key=AIzaSyCW7U3xPDBQMU6mzuAjdrLlsEfaivESoiw&type=video&part=snippet';
            try {
                const id = (0, uuid_1.v4)();
                const response = yield axios_1.default.get(query);
                const videoId = response.data.items[0].id.videoId;
                const publishedAt = response.data.items[0].snippet.publishedAt;
                const channelId = response.data.items[0].snippet.channelId;
                const title = response.data.items[0].snippet.title;
                const description = response.data.items[0].snippet.description;
                const thumbnail = response.data.items[0].snippet.thumbnails.default.url;
                const channelTitle = response.data.items[0].snippet.channelTitle;
                console.log({ id, videoId, publishedAt, channelId, title, description, thumbnail, channelTitle });
                res.status(http_status_codes_1.StatusCodes.OK).json({ id, videoId, publishedAt, channelId, title, description, thumbnail, channelTitle });
                console.log('video created');
            }
            catch (err) {
                console.log(err.response.data);
            }
        });
    }
}
exports.default = video;
