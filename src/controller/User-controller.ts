import bcrypt from "bcryptjs/umd/types";
import { Role } from "../entity/Role";
import { User } from "../entity/User";
import { Request, Response } from "express";
import { hashPassword } from "../utils/hash-password";

export class UserController { 

    // get all users 
    async getUsers(req: Request, res: Response){
        try{
            const users = await User.find();
            res.json(users);
            res.status(200).json({"code": "200", "message": "Users fetched successfully", users});
            console.log("Users fetched successfully:", users);
            
        }catch(error){
            res.status(500).json({ message: "Error fetching users", error });
            console.error("Error fetching users:", error);
        }
    }

    // create user
    async createUser(req: Request, res: Response){
        const { username, name, password , role, status } = req.body;
        const hashedPassword = await hashPassword(password);
        try{
            const newUser = User.create({ username, name, password: hashedPassword, role, status });
            const findRole = await Role.findOneBy({ id: Number(role) });
            if (findRole){
                await newUser.save();
                res.status(201).json({"code": "201", "message": "User created successfully", newUser});
                console.log("User created successfully:", newUser);
            }else{
                res.status(404).json({ message: "Role not found" });
                console.log("Role not found:", role);
            }

        } catch(error){
            res.status(500).json({ message: "Error creating user", error });
            console.error("Error creating user:", error);
        }
    }

    // update user
    async updateUser(req: Request, res: Response){
        const { id, username, name, password , role, status } = req.body;
        const hashedPassword = await hashPassword(password);
        try{
            const user = await User.findOneBy({ id: Number(id) });
            if (user){
                user.username = username;
                user.name = name;       
                user.password = hashedPassword;
                user.role = role;
                user.status = status;
                await user.save();
                res.status(200).json({"code": "200", "message": "User updated successfully", user});
                console.log("User updated successfully:", user);
            }
            else{
                res.status(404).json({ message: "User not found" });
                console.log("User not found:", id);
            }
        }catch(error){
            res.status(500).json({ message: "Error updating user", error });
            console.error("Error updating user:", error);
        }
    }

    // delete user
    async deleteUser(req: Request, res: Response){
        const { id } = req.body;
        console.log("id:", id);
        try{
            const user = await User.findOneBy({ id: Number(id) });
            if (user){
                await user.remove();
                res.status(200).json({"code": "200", "message": "User deleted successfully"});
                console.log("User deleted successfully:", id);
            }else{
                res.status(404).json({ message: "User not found" });
                console.log("User not found:", id);
            }
        }catch(error){
            res.status(500).json({ message: "Error deleting user", error });
            console.error("Error deleting user:", error);
        }
    }
}