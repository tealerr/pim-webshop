import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Register, IUser } from "../models/register.model"

export async function login(req: Request, res: Response) {
    const { username, password } = req.body

    try {
        // Find user by username
        const user: IUser | null = await Register.findOne({ username })

        if (!user) {
            return res.status(400).json({ message: "Invalid username" })
        }

        // Check password
        const isMatch: boolean = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "username or password is incorrect" })
        }

        // Create JWT payload
        const payload = {
            user: {
                id: user.id,
            },
        }

        // Sign token
        jwt.sign(
            payload,
            "jwtSecret",
            { expiresIn: 3600 },
            (err: Error | null, token: string | undefined) => {
                if (err) {
                    console.error("Error signing token:", err)
                    return res.status(500).json({ message: "Server error" })
                }
                if (!token) {
                    console.error("Token not generated")
                    return res.status(500).json({ message: "Server error" })
                }
                res.json({ token })
            }
        )
    } catch (error) {
        console.error("Error logging in user:", error)
        res.status(500).json({ message: "Server error" })
    }
}
