import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../entity/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const DEV_USER = process.env.DEV_USER;
const DEV_PASS = process.env.DEV_PASS;


export class AuthController {

    public getToken(req: Request, res: Response): void{
        const { username, password } = req.body;
        try{
            if(!username || !password){
                res.status(400).json({ message: "Username and password are required" });
                return;
            }

            if(username != DEV_USER || password != DEV_PASS){
                res.status(401).json({ message: "Invalid username or password" });
                return;
            }

            const token = jwt.sign({ username, password }, JWT_SECRET, {
                expiresIn: '10M' // Token expiration time
            });

            res.status(200).json({ token });
            return;

        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    }

    // login 
    async login(req: Request, res: Response){
        const {username , password} = req.body;

        try{
            const findUser = await User.findOneBy({ username })
            console.log(findUser)
            if (findUser){
                // res.json(findUser);
                res.status(200).json({"code":200, "message": "Login Successfully", "user details": findUser  })
                console.log("user found:", username)
            }else{
                res.status(404).json({ message: "Invalid Credentials" });
                console.log("Invalid Credentials:", username);
            }

        }
        catch(error){
            res.status(500).json({message: "Error login", error});
            console.log("error login")
        }

    }
}