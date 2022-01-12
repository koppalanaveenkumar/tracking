import { Router } from 'express';
import verifyToken from '../utils/admin.verify';
import AdminController from '../controllers/admin.controller';



export default class UserRouter {
    public router: Router = Router();
    private adminController: AdminController = new AdminController();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes(): void {
        this.router.post('/createAdmin', this.adminController.createAdmin);
        this.router.post('/authenticate', this.adminController.authenticate);
        this.router.post('/sendEmail', this.adminController.sendEmail);
        this.router.post('/resetPassword', this.adminController.resetPassword);
        this.router.post('/changePassword', verifyToken, this.adminController.changePassword);
        this.router.post('/userCreate', verifyToken, this.adminController.userCreate);
        this.router.get('/checkUser/:userId', this.adminController.checkUser);
        this.router.post('/createItem', verifyToken, this.adminController.createItem);

    }
}