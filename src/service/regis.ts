import { Request, Response } from "express"
import { Register } from "../models/register.model"

// Registration function
export async function register(req: Request, res: Response) {
    const { username, email, password } = req.body

    // Password complexity rules
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#_A-a]).{8,}$/

    if (!passwordRegex.test(password)) {
        return res
            .status(400)
            .json({ message: "Password complexity requirements not met." })
    }

    // Create new user
    const newRegister = new Register({ username, email, password })

    try {
        await newRegister.save()
        res.json({ message: "Registration successful" })
    } catch (error: any) {
        console.error("Error registering user:", error)
        if (error.code === 11000) {
            // Unique constraint violation error
            const key = Object.keys(error.keyValue)[0]
            const value = error.keyValue[key]
            let errorMessage
            if (key === "username") {
                errorMessage = `Username '${value}' is already taken.`
            } else if (key === "email") {
                errorMessage = `Email '${value}' is already registered.`
            } else {
                errorMessage = "Registration failed."
            }
            return res.status(400).json({ message: errorMessage })
        } else {
            return res.status(500).json({ message: "Registration failed." })
        }
    }
}
