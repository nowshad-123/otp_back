import { generateAccessToken } from "../authentication/userAuth.js";
import User from "../models/userModel.js";
import { sendOtp, verifyOtp } from "../twilio.js";

generateAccessToken

export const sendingOtp = (req, res) => {
    const { firstName, phone } = req.body;

    if (!firstName || !phone) {
        return res.status(400).json({
            success: false,
            message: 'Please provide both first name and phone number.',
        });
    }

    sendOtp(phone); // Fixed: using sendOtp instead of sendSms

    res.status(201).json({
        success: true,
        message: `OTP sent to mobile ${phone}`,
    });
}


export const verifyingOtp = async (req, res) => {
    const { firstName, phone, otpCode } = req.body;

    if (!otpCode || !phone || !firstName) {
        return res.status(400).json({
            success: false,
            message: 'Please provide both OTP and phone number.',
        });
    }

    const status = await verifyOtp(phone, otpCode);


    if (status === "approved") {
        const token = generateAccessToken({ username: firstName });
        const newUser = new User({
            firstName,
            phone: phone
        });

        newUser.save()
            .then(() => {
                res.status(200).json({
                    success: true,
                    message: 'OTP is Verified, User saved to the database',
                    phone,
                    token
                });
            })
            .catch((error) => {
                console.error('Error saving user to the database:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error saving user to the database',
                });
            });
    } else {
        res.status(401).json({
            success: false,
            message: 'OTP verification failed',
        });
    }
}


export const userAuth = (req, res) => {
    res.json({
        success: true,
        message: 'User authenticated successfully',

    });

}