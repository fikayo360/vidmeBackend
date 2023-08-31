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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../../models/User');
const { sequelizeeUser } = require('../../../postgresconfig');
const sendResetToken_1 = __importDefault(require("../../utils/sendResetToken"));
const http_status_codes_1 = require("http-status-codes");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateEmail_1 = __importDefault(require("../../utils/validateEmail"));
const createTokenUser_1 = __importDefault(require("../../utils/createTokenUser"));
const jwt_1 = require("../../utils/jwt");
const uuid_1 = require("uuid");
class user {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const { email, username, password } = req.body;
            if (!username || !email || !password) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('fields cant be empty');
            }
            if ((0, validateEmail_1.default)(email) === false) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('invalid mail');
            }
            const userExists = yield User.findOne({ where: { username: username } });
            const emailExists = yield User.findOne({ where: { email: email } });
            if (userExists || emailExists) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('user already exists');
            }
            try {
                const savedUser = yield User.create({
                    id, email, username, password
                });
                const tokenUser = (0, createTokenUser_1.default)(savedUser);
                const cookie = (0, jwt_1.createJWT)(tokenUser);
                return res.status(http_status_codes_1.StatusCodes.OK).json({ cookie, savedUser });
            }
            catch (err) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('err creating user');
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(500).json("pls ensure fields are not empty ");
            }
            try {
                const foundUser = yield User.findOne({ where: { username: username } });
                if (!foundUser) {
                    return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('that user does not exist');
                }
                if (!bcrypt_1.default.compareSync(password, foundUser.password)) {
                    return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('wrong password');
                }
                const { password: foundUserPassword } = foundUser, others = __rest(foundUser, ["password"]);
                const tokenUser = (0, createTokenUser_1.default)(others);
                const cookie = (0, jwt_1.createJWT)(tokenUser);
                return res.status(http_status_codes_1.StatusCodes.OK).json({ user: others, cookie });
            }
            catch (err) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('error Authenticating user');
            }
        });
    }
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const sessionUser = yield User.findOne({ where: { email: email } });
            if ((0, validateEmail_1.default)(email) === false) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('invalid mail');
            }
            if (!sessionUser) {
                return res.status(404).json('that email does not exist');
            }
            try {
                let reset = (0, sendResetToken_1.default)(sessionUser.email);
                const updateToken = yield User.update({
                    resettoken: reset
                }, {
                    where: {
                        id: sessionUser.id
                    }
                });
                console.log(updateToken);
                return res.status(200).json(` Reset token sent successfully`);
            }
            catch (err) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('oops an error occured');
            }
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token, email, newPassword } = req.body;
            const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';
            const sessionUser = yield User.findOne({ where: { email: email } });
            try {
                const decoded = jsonwebtoken_1.default.verify(token, secretKey);
                const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
                if (decoded.email === sessionUser.email) {
                    const updated = yield User.update({
                        resettoken: null,
                        password: hashedPassword
                    }, {
                        where: {
                            id: sessionUser.id
                        }
                    });
                    console.log(updated);
                    return res.status(http_status_codes_1.StatusCodes.OK).json('password updated successfully');
                }
                else {
                    return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('wrong user');
                }
            }
            catch (err) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('an error occurred');
            }
        });
    }
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newProfilePic } = req.body;
            const username = req.user.username;
            const id = req.user.userId;
            try {
                const userExists = yield User.findOne({ where: { username: username } });
                const updatepicture = yield User.update({ profile_pic: newProfilePic }, {
                    where: {
                        id: id
                    }
                });
                return res.status(http_status_codes_1.StatusCodes.OK).json(`profile updated successfully`);
            }
            catch (err) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('an error occurred');
            }
        });
    }
}
exports.default = user;
