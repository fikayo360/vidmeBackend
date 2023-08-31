"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.video = exports.user = void 0;
const userController_1 = __importDefault(require("./userController"));
exports.user = userController_1.default;
const videoController_1 = __importDefault(require("./videoController"));
exports.video = videoController_1.default;
