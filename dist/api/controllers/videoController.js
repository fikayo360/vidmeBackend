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
const apikey = process.env.YOUTUBE_KEY;
class video {
    getVideos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(apikey);
            const query = 'https://www.googleapis.com/youtube/v3/search?q=funny&regionCode=NG&maxResults=20&key=AIzaSyCW7U3xPDBQMU6mzuAjdrLlsEfaivESoiw&type=video&part=snippet';
            try {
                const response = yield axios_1.default.get(query);
                console.log(response.data);
                return res.status(http_status_codes_1.StatusCodes.OK).json(response.data);
            }
            catch (err) {
                console.log(err.response.data);
            }
        });
    }
}
exports.default = video;
