import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../entity/User';
import { comparePassword } from '../utils/hash-password';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const DEV_USER = process.env.DEV_USER;
const DEV_PASS = process.env.DEV_PASS;


export class AuthController {

    public getToken(req: Request, res: Response): void{
        const { username, password } = req.body;
        try{
            if(username != DEV_USER || password != DEV_PASS){
                res.status(401).json({ message: "Invalid username or password gettoken " });
                return;
            }

            const token = jwt.sign({ username, password }, JWT_SECRET, {
                expiresIn: '10m' // Token expiration time
                // expiresIn: envToken
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
        console.log("password:", password)
        try{
            const findUser = await User.findOneBy({ username })
            if (!findUser){
                res.status(404).json({ message: "Invalid Credentials" });
                console.log("user not found:", username)
                return;
            }

            const isMatch = await comparePassword(password, findUser.password);
            console.log(isMatch)

            if(!isMatch){
                res.status(401).json({ message: "Invalid Password"});
                console.log("invalid credentials:", username)
                return;
            }

             // Generate JWT for this user
            const token = jwt.sign({ id: findUser.id, username: findUser.username }, JWT_SECRET, {
                expiresIn: "1h",
            });

            res.status(200).json({
                code: 200,
                message: "Login Successfully",
                "user details": findUser,
                token
            });
            console.log("login successfully:", username)
        }
        catch(error){
            res.status(500).json({message: "Error login", error});
            console.log("error login")
        }

    }
}