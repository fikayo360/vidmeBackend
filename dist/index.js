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
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors = require('cors');
const { Sequelize } = require('sequelize');
const uuid_1 = require("uuid");
app.use(cors());
app.use(express_1.default.json());
const userR = require('./models/User');
const port = process.env.PORT || 5000;
const sequelize = new Sequelize('postgres://fikayo:aTd9xPeNcSNagMLDwrRzYj1ScobAUDmS@dpg-cjmm2usdfrcc73a8hbs0-a.oregon-postgres.render.com/vidme', {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: 'true'
        }
    }
});
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uuid_1.v4)();
    const { email, username, password, profile_pic, resettoken } = req.body;
    let user;
    try {
        user = userR.create({
            id,
            email,
            username,
            password,
            profile_pic,
            resettoken
        });
        console.log(user);
        res.status(200).json('created');
    }
    catch (err) {
        console.log(err.response.data);
    }
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
        const isSynced = yield sequelize.sync();
        if (isSynced) {
            console.log('The models are created successfully.');
        }
        else {
            console.log('The models could not be created.');
        }
        yield sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.log(error);
    }
});
start();
