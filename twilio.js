import twilio from "twilio";

const accountSid = process.env.TIWILIO_ACCOUNT_SID;
const authToken = process.env.TIWILIO_AUTH_TOKEN;
const verifySid = process.env.TIWILIO_VERIFY_SID;
const client = twilio(accountSid, authToken)


export const sendOtp = (phone) => {


    client.verify.v2.services(verifySid)
        .verifications.create({ to: phone, channel: "sms" })
        .then((verification) => console.log(verification.status))
        .catch((error) => console.error("Error sending OTP:", error));
};

export const verifyOtp = async (phone, otpCode) => {


    try {

        const verification_check = await client.verify.v2.services(verifySid)
            .verificationChecks.create({ to: phone, code: otpCode });

        return verification_check.status;
    } catch (error) {
        console.error("Error verifying OTP:", error);
        throw error; // rethrow the error or handle it as needed
    }
};


