import validator from 'validator';

export class Validator {
    static validateUsername(username : string) : void{
        if(!/^[A-Za-z ]{4,25}$/.test(username)){
            throw new Error("Invalid username.");
        }
    }

    static validateEmail(email : string) : void{
        if(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|net|org|edu|gov|in)$/.test(email)){
            throw new Error("Invalid email format.");
        }
    }

    static validatePassword(password : string) : void{
        if(!validator.isStrongPassword(password,{ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })){
            throw new Error("Password must be at least 8 characters long and include uppercase, lowercase, numbers, and symbols.")
        }
    }

    static validatePhone(phone : string) : void{
        if(!validator.isMobilePhone(phone,["en-IN"])){
            throw new Error("Invalid mobile number");
        }
    }

    static validateOtp(otp : string) : void {
        if (!validator.isNumeric(otp, { no_symbols: true }) || otp.length !== 6) {
            throw new Error("Invalid OTP.");
        }
    }

    static validateServiceName(serviceName: string) : void {
        if (!validator.isAlpha){
            throw new Error("Invalid service Name, only letters allowed.");
        }

        if(serviceName.length > 20 || serviceName.length < 4){
            throw new Error("Allowed length is 4 to 20 characters.")
        }
    }
}