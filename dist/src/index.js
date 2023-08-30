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
app.use(cors());
app.use(express_1.default.json());
const { sequelizee } = require('../postgresconfig');
const { Userr } = require('../src/models/User');
const port = process.env.PORT || 5000;
const uuid_1 = require("uuid");
app.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uuid_1.v4)();
    const { email, username, password } = req.body;
    const user = yield Userr.create({
        id, email, username, password
    });
    res.status(200).json(user);
    console.log('f');
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
        const isSynced = yield sequelizee.sync({ force: false });
        if (isSynced) {
            console.log('The models are created successfully.');
        }
        else {
            console.log('The models could not be created.');
        }
    }
    catch (error) {
        console.log(error);
    }
});
start();
