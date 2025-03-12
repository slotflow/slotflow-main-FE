import validator from 'validator';

export class Validator {
    static validateUsername(username: string): void {
        if (!/^[A-Za-z ]{4,25}$/.test(username)) {
            throw new Error("Invalid username.");
        }
    }

    static validateEmail(email: string): void {
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|net|org|edu|gov|in)$/.test(email)) {
            throw new Error("Invalid email format.");
        }
    }

    static validatePassword(password: string): void {
        if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
            throw new Error("Password must be at least 8 characters long and include uppercase, lowercase, numbers, and symbols.")
        }
    }

    static validatePhone(phone: string): void {
        if (!validator.isMobilePhone(phone, ["en-IN"])) {
            throw new Error("Invalid mobile number");
        }
    }

    static validateOtp(otp: string): void {
        if (!validator.isNumeric(otp, { no_symbols: true }) || otp.length !== 6) {
            throw new Error("Invalid OTP.");
        }
    }

    static validateServiceName(serviceName: string): void {
        if (!validator.isAlpha(serviceName)) {
            throw new Error("Invalid service Name, only letters allowed.");
        }

        if (serviceName.length > 20 || serviceName.length < 4) {
            throw new Error("Allowed length is 4 to 20 characters.")
        }
    }

    static validatePlanName(planName: string): void {
        if (!validator.isAlpha(planName, 'en-US', { ignore: ' ' })) {
            throw new Error("Invalid planName. Only alphabets and spaces are allowed.");
        }

        if (planName.length > 20 || planName.length < 4) {
            throw new Error("Allowed planName length is 4 to 20 characters.");
        }
    }

    static validateDescription(description: string): void {
        if (!validator.isAlpha(description, 'en-US', { ignore: ' ' })) {
            throw new Error("Invalid description. Only alphabets and spaces are allowed.");
        }

        if (description.length > 255 || description.length < 10) {
            throw new Error("Allowed description length is 10 to 255 characters.");
        }
    }

    static validatePrice(price: number): void {
        if (typeof price !== 'number' || price < 0) {
            throw new Error("Invalid price. Price must be a non-negative number.");
        }
    }

    static validateFeatures(features: string[]): void {
        if (!Array.isArray(features) || features.length === 0) {
            throw new Error("Invalid features. Features must be a non-empty array.");
        }

        features.forEach((feature, index) => {
            if (typeof feature !== 'string') {
                throw new Error(`Invalid feature at index ${index}. Feature must be a string.`);
            }

            if (feature.length > 100) {
                throw new Error(`Feature at index ${index} exceeds maximum length of 100 characters.`);
            }

            if (feature.length === 0) {
                throw new Error(`Feature at index ${index} can not be empty.`)
            }
        });
    }

    static validateMaxBookingPerMonth(maxBookingPerMonth: number): void {
        if (typeof maxBookingPerMonth !== 'number' || maxBookingPerMonth < 0) {
            throw new Error("Invalid maxBookingPerMonth. Must be a non-negative number.");
        }
    }
}