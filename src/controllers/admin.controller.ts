import { Request, Response, NextFunction } from 'express';
import AdminModel from '../models/admin.model';
import UserModel from '../models/user.model';
import ItemModel from '../models/item.model';
import OrderModel from '../models/order.model';
import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { commonService } from "../services/common.service";
import { emailSenderService } from "../services/emailSender.service";
import moment from "moment";
import bcrypt from 'bcryptjs';
import * as crypto from "crypto";
import 'dotenv/config';
import config from '../config';
import { resolveSoa } from 'dns';

export default class Adminoller {

    public createToken = (user: any) => {
        const expiresIn = 43200000;
        const dataStoredToken = {
            _id: user._id,
            time: user["lastLogginIn"]
        }
        return sign(dataStoredToken, config.ADMIN_JWT_SECRET, { expiresIn })
    }
    lastLoggedIn: any;
    public createAdmin = async (req: Request, res: Response) => {
        try {
            const emailMatched = await AdminModel.findOne({ email: req.body.email });
            console.log("Email", emailMatched);
            if (emailMatched) {
                res.status(409).json({ email: true });
            } else {
                const phoneMatched = await AdminModel.findOne({ phone: req.body.phone });
                if (phoneMatched) {
                    res.status(409).json({ phone: true });
                } else {
                    const hashedPassword = await hash(req.body.password, 10);
                    const requestBody = {
                        ...req.body,
                        password: hashedPassword,
                        lastLoggedIn: moment().unix(),
                        lastUpdatedAt: Date.now()
                    };
                    const user: any = await AdminModel.create(requestBody);
                    if (user) {
                        const tokenData = this.createToken(user);
                        res.status(201).json({
                            auth: true,
                            token: tokenData,
                            username: user["firstname"],
                        });
                    }
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    };


    public authenticate = async (req: Request, res: Response) => {
        try {
            const emailMatched: any = await AdminModel.findOne({
                email: req.body.email,
            });
            if (emailMatched) {
                const comparePassword = await compare(
                    req.body.password,
                    emailMatched["password"]
                );
                if (comparePassword) {
                    const updateTimesstamp: any = await AdminModel.findOneAndUpdate(
                        { _id: emailMatched["_id"] },
                        { $set: { lastLoggedIn: moment().unix() } },
                        { new: true }
                    );
                    if (updateTimesstamp) {
                        const tokenData = this.createToken(updateTimesstamp);
                        res.status(200).json({
                            auth: true,
                            token: tokenData,
                            username: emailMatched["username"],
                            isActive: updateTimesstamp["isActive"],
                            isUser: emailMatched["isUser"]
                        });
                    }
                } else {
                    res.status(409).json({ password: true });
                }
            } else {
                res.status(409).json({ email: true });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    };

    public sendEmail = async (req: Request, res: Response) => {
        try {
            const user = await AdminModel.findOne({ email: req.body.email });
            console.log("user", user)
            if (user) {
                const token = await commonService.generateRandomBytes();
                console.log("token", token)
                const updateUser: any = await AdminModel.findByIdAndUpdate(
                    { _id: user["_id"] },
                    {
                        resetPasswordToken: token,
                        resetPasswordExpires: Date.now() + 3000000,
                    },
                    { upsert: true, new: true },
                );
                console.log("updateUser", updateUser)
                if (updateUser) {
                    updateUser.type = "resetPassword";
                    await emailSenderService.sendEmail(updateUser, token);
                    res.status(200).json({ status: 1, data: { message: "Sent Successfully" } });
                } else {
                    res.status(409).json({ status: 0, data: { message: "Failed in sending email, Try again" } });
                }
            } else {
                res.status(401).json({ status: 0, data: { message: "Email not found" } })
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }

    public resetPassword = async (req: Request, res: Response) => {
        try {
            const user: any = await AdminModel.findOne({
                resetPasswordToken: req.body.token,
                resetPasswordExpires: { $gt: Date.now() }
            });
            if (user) {
                const hashedPassword = await bcrypt.hashSync(req.body.newPassword, 10);
                if (hashedPassword) {
                    const updatedUser = await AdminModel.findByIdAndUpdate(
                        { _id: user["_id"] },
                        {
                            $set: {
                                password: hashedPassword,
                                resetPasswordToken: undefined,
                                resetPasswordExpires: undefined,
                            },
                        },
                        { upsert: true, new: true }
                    );
                    if (updatedUser) {
                        res.status(200).json({
                            status: 1, data: { message: "Password updated successfully" }
                        })
                    } else {
                    }
                }
            } else {
                res.status(409).json({
                    status: 0,
                    data: {
                        errorDescription: "Password reset token is invalid or has expired.",
                        error: "expired_token",
                    }
                })
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public changePassword = async (req: any, res: Response) => {
        try {
            const user: any = await AdminModel.findById(req['tokenId']);
            if (user) {
                if (bcrypt.compareSync(req.body.currentPassword, user.password)) {
                    let updateUser = await AdminModel.updateOne({ _id: req['tokenId'] }, { $set: { password: bcrypt.hashSync(req.body.newPassword, 10) } }, { new: true });
                    if (updateUser) {
                        res.status(200).json("Password updated Successfully")
                    } else {
                        res.status(401).json({ status: "Failed in update password" })
                    }
                } else {
                    res.status(401).json({ currentPassword: true });
                }
            } else {
                res.status(409).json({ username: true })
            }
        } catch (err) {
            res.status(500).json(err);
        };
    };

    public userCreate = async (req: any, res: Response) => {
        try {
            const adminCheck = await AdminModel.findById(req['tokenId']);
            if (adminCheck) {
                const requestBody = {
                    ...req.body,
                    lastLoggedIn: moment().unix(),
                };
                const user = await UserModel.create(requestBody);
                if (user) {
                    res.status(201).json("Done");
                }
            } else {
                res.status(404).json({ AdminCheck: true })
            }
        } catch (err) {
            res.status(500).json(err);
        }
    };

    public checkUser = async (req: any, res: Response) => {
        try {
            const userCheck = await UserModel.findById(req.params.userId)
            if (userCheck) {
                res.status(200).send({ "userCheck": userCheck })
            } else {
                res.status(404).send({ user: true })
            }
        } catch (err) {
            res.status(500).json(err);
        }
    };

    public getAllUsers = async (req: any, res: Response) => {
        try {
            const adminCheck = await AdminModel.findById(req['tokenId'])
            if (adminCheck) {
                const users: any = await UserModel.find();
                if (users) {
                    res.status(200).json(users);
                }
            } else {
                res.status(404).json({ adminCheck: true })
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
    public createItem = async (req: any, res: Response) => {
        try {
            const adminCheck = await AdminModel.findById(req['tokenId']);
            if (adminCheck) {
                // const itemid = await commonService.generateRandomBytes();
                const itemid = crypto.randomBytes(8).toString('hex');
                const requestBody = {
                    ...req.body,
                    itemid: itemid,
                    lastLoggedIn: moment().unix(),
                };
                const user = await ItemModel.create(requestBody);
                if (user) {
                    res.status(201).json("Done");
                }
            } else {
                res.status(404).json({ AdminCheck: true });
            }
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    };

    public createOrder = async (req: any, res: Response) => {
        try {
            const adminCheck = await AdminModel.findById(req['tokenId']);
            if (adminCheck) {
                const userCheck = await UserModel.findById(req.body['customerId']);
                if (userCheck) {
                    const itemCheck = await ItemModel.findById(req.body['itemsId']);
                    console.log("itemCheck", itemCheck)
                    if (itemCheck) {
                        const orderid = crypto.randomBytes(8).toString('hex');
                        const requestBody = {
                            ...req.body,
                            orderid: orderid,
                            lastLoggedIn: moment().unix(),
                        };
                        const user = await OrderModel.create(requestBody);
                        if (user) {
                            res.status(201).json("Done");
                        }
                    }
                }
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
