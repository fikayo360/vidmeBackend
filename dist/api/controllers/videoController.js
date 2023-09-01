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
const mock_1 = __importDefault(require("../../mock"));
const Video = require('../../models/Video');
class video {
    getVideos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const videoItems = [];
            try {
                mock_1.default.map((item) => __awaiter(this, void 0, void 0, function* () {
                    let q = item;
                    let encodedQuery = encodeURIComponent(q);
                    let query = `https://www.googleapis.com/youtube/v3/search?q='${encodedQuery}'&regionCode=NG&maxResults=30&key=AIzaSyCW7U3xPDBQMU6mzuAjdrLlsEfaivESoiw&type=video&part=snippet`;
                    const response = yield axios_1.default.get(query);
                    const allitems = response.data.items.map((item) => {
                        videoItems.push(item);
                    });
                }));
                videoItems.map((item) => __awaiter(this, void 0, void 0, function* () {
                    const id = (0, uuid_1.v4)();
                    const videoId = item.id.videoId;
                    const publishedAt = item.snippet.publishedAt;
                    const channelId = item.snippet.channelId;
                    const title = item.snippet.title;
                    const description = item.snippet.description;
                    const thumbnail = item.snippet.thumbnails.default.url;
                    const channelTitle = item.snippet.channelTitle;
                    console.log({ id, videoId, publishedAt, channelId, title, description, thumbnail, channelTitle });
                    const createVideo = yield Video.create({ id, videoId, publishedAt, channelId, title, description, thumbnailUrl: thumbnail, channelTitle });
                    console.log('video created');
                }));
                res.status(http_status_codes_1.StatusCodes.OK).json('done');
            }
            catch (err) {
                console.log(err.response.data);
            }
        });
    }
}
exports.default = video;
