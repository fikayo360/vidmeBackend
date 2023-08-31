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
const port = process.env.PORT || 5000;
const userRoutes = require('./api/routes/userRoute');
const videoRoutes = require('./api/routes/videoRoutes');
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/video', videoRoutes);
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
