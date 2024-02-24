import otpGenerator from 'otp-generator'
// function generate otp
export const genOTP=()=>{

const OTP=otpGenerator.generate(5, { upperCaseAlphabets: false, specialChars: false });

return OTP
}