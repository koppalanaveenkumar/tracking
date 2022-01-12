"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_verify_1 = __importDefault(require("../utils/admin.verify"));
const admin_controller_1 = __importDefault(require("../controllers/admin.controller"));
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.adminController = new admin_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/createAdmin', this.adminController.createAdmin);
        this.router.post('/authenticate', this.adminController.authenticate);
        this.router.post('/sendEmail', this.adminController.sendEmail);
        this.router.post('/resetPassword', this.adminController.resetPassword);
        this.router.post('/changePassword', admin_verify_1.default, this.adminController.changePassword);
        this.router.post('/userCreate', admin_verify_1.default, this.adminController.userCreate);
        this.router.get('/checkUser/:userId', this.adminController.checkUser);
        this.router.post('/createItem', admin_verify_1.default, this.adminController.createItem);
    }
}
exports.default = UserRouter;
