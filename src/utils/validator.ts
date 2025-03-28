import validator from 'validator';

export class Validator {
    // **** user validations
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

    static validateOtp(otp: string): void {
        if (!validator.isNumeric(otp, { no_symbols: true }) || otp.length !== 6) {
            throw new Error("Invalid OTP.");
        }
    }

    static validatePhone(phone: string): void {
        if (!validator.isMobilePhone(phone, ["en-IN"])) {
            throw new Error("Invalid mobile number");
        }
    }



    // **** Service validations
    static validateAppServiceName(serviceName: string): void {
        if (!/^[a-zA-Z ]+$/.test(serviceName)) {
            throw new Error("Invalid service Name, only letters allowed.");
        }

        if (serviceName.length > 20 || serviceName.length < 4) {
            throw new Error("Allowed length is 4 to 20 characters.")
        }
    }


    // **** Validate admin app plans
    static validatePlanDescription(description: string): void {
        if (!validator.isAlpha(description, 'en-US', { ignore: ' ' })) {
            throw new Error("Invalid description. Only alphabets and spaces are allowed.");
        }

        if (description.length > 255 || description.length < 10) {
            throw new Error("Allowed description length is 10 to 255 characters.");
        }
    }

    static validatePlanPrice(price: number): void {
        if (typeof price !== 'number' || price < 0 || price > 10000000) {
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



    // **** Admin AppSerivce namse
    static validatePlanName(planName: string): void {
        if (!validator.isAlpha(planName, 'en-US', { ignore: ' ' })) {
            throw new Error("Invalid planName. Only alphabets and spaces are allowed.");
        }

        if (planName.length > 20 || planName.length < 4) {
            throw new Error("Allowed planName length is 4 to 20 characters.");
        }
    }



    
    // **** Address Validations
    static validateAddressLine(addressLine: string): void {
        if (!/^[a-zA-Z0-9\s.,#-]+$/.test(addressLine)) throw new Error("Invalid address line, should only contain alphabets, numbers, spaces, and common address characters.");
        if (addressLine.length < 6) throw new Error("Address line length should be more than 6.");
        if (addressLine.length > 150) throw new Error("Address line length should be less than 150");
    }

    // Phone
    // Already in the signup or sign in section

    // Place
    static validatePlace(place: string): void {
        if (!place || place.trim().length < 2) throw new Error("Place is required and should have at least 2 characters.");
        if (place.trim().length > 50) throw new Error("Place should have less than 50 characters.");
        if(!/^[a-zA-Z\s]+$/.test(place)) throw new Error("Place should only contain alphabets and spaces");
    }

    // City
    static validateCity(city: string): void {
        if (!city || city.trim().length < 2) throw new Error("City is required and should have at least 2 characters.");
        if (city.trim().length > 50) throw new Error("City should have less than 50 characters.");
        if(!/^[a-zA-Z\s]+$/.test(city)) throw new Error("City should only contain alphabets and spaces");
    }

    // District
    static validateDistrict(district: string): void {
        if (!district || district.trim().length < 2) throw new Error("District is required and should have at least 2 characters.");
        if (district.trim().length > 50) throw new Error("District should have less than 50 characters.");
        if(!/^[a-zA-Z\s]+$/.test(district)) throw new Error("District should only contain alphabets and spaces");
    }

    // Pincode
    static validatePincode(pincode: string): void {
        if (!validator.isPostalCode(pincode, "IN")) throw new Error("Invalid pincode.");
    }

    // State
    static validateState(state: string): void {
        if (!state || state.trim().length < 2) throw new Error("State is required and should have at least 2 characters.");
        if (state.trim().length > 50) throw new Error("State should have less than 50 characters.");
        if(!/^[a-zA-Z\s]+$/.test(state)) throw new Error("State should only contain alphabets and spaces");
    }

    // Country
    static validateCountry(country: string): void {
        if (!country || country.trim().length < 2) throw new Error("Country is required and should have at least 2 characters.");
        if (country.trim().length > 50) throw new Error("Country should have less than 50 characters.");
        if(!/^[a-zA-Z\s]+$/.test(country)) throw new Error("Country should only contain alphabets and spaces");
    }

    // Google Map Link
    static validateGoogleMapLink(googleMapLink: string): void {
        if (!validator.isURL(googleMapLink)) throw new Error("Invalid Google Map link.");
        if(!googleMapLink.startsWith("https://maps.app.goo.gl/")) throw new Error("Invalid google map url.");
    }



    // Provider service 
    // Service name
    static validateServiceName(serviceName: string): void {
        if (!serviceName || serviceName.trim().length === 0) throw new Error("Service name is required.");
        if (!/^[A-Za-z ]{4,25}$/.test(serviceName.trim())) throw new Error("Invalid service name. Service name should contain only alphabets and spaces and be between 4 and 25 characters.");
    }

    // Service description
    static validateServiceDescription(serviceDescription: string): void {
        if (!serviceDescription || serviceDescription.trim().length === 0) throw new Error("Service description is required.");
        if (!/^[\w\d !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{4,250}$/.test(serviceDescription.trim())) throw new Error("Invalid service description. Service description should contain alphanumeric characters, spaces, and special characters, and be between 4 and 250 characters.");
    }

    // Service price
    static validateServicePrice(servicePrice: number): void {
        if (servicePrice < 1 || servicePrice > 10000000) throw new Error("Invalid service price. Service price must be between 1 and 10000000.");
    }

    // Provider adhaar number
    static validateProviderAdhaar(providerAdhaar: string): void {
        if (!providerAdhaar) throw new Error("Adhaar number is required.");
        if (!validator.isNumeric(providerAdhaar.trim())) throw new Error("Invalid adhaar number. Adhaar number should contain only numbers.");
        if (providerAdhaar.trim().length !== 6) throw new Error("Invalid adhaar number. Please enter the last 6 digits.");
    }

    // Provider experience
    static validateProviderExperience(providerExperience: string): void {
        if (!providerExperience || providerExperience.trim().length === 0) throw new Error("Provider experience is required.");
        if (!/^[\w\d !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{1,100}$/.test(providerExperience.trim())) throw new Error("Invalid experience. Provider experience should contain alphanumeric characters, spaces, and special characters, and be between 1 and 200 characters.");
    }




    // Service availability
    static validateDay(day: string): void {
        const validDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        if (!day || day.trim().length === 0) throw new Error("Day is required.");
        if (!validDays.includes(day)) throw new Error("Invalid day. Day must be one of: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday.");
    }

    static validateDuration(duration: string): void {
        const validDurations = ["15 minutes", "30 minutes", "1 hour"];
        if (!duration || duration.trim().length === 0) throw new Error("Duration is required.");
        if (!validDurations.includes(duration.trim().toLowerCase())) throw new Error("Invalid duration. Duration must be one of: 15 minutes, 30 minutes, 1 hour.");
    }

    static validateTime(time: string, fieldName: string): void {
        if (!time || time.trim().length === 0) {
            throw new Error(`${fieldName} is required.`);
        }
        if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time.trim())) throw new Error(`Invalid ${fieldName}. ${fieldName} must be in HH:MM format (24-hour).`);
    }

    static validateStartTime(startTime: string): void {
        this.validateTime(startTime, "Start time");
    }

    static validateEndTime(endTime: string, startTime: string): void {
        this.validateTime(endTime, "End time");

        if (startTime && endTime) {
            if (endTime <= startTime) {
                throw new Error("End time must be after start time.");
            }
        }
    }

    static validateModes(modes: string[]): void {
        const validModes = ["online", "offline"];
    
        if (!modes) {
            throw new Error("Modes is required.");
        }
    
        if (Array.isArray(modes)) {
            if (modes.length === 0) {
                throw new Error("Modes array cannot be empty.");
            }
            for (const mode of modes) {
                if (typeof mode !== "string" || !validModes.includes(mode.trim().toLowerCase())) {
                    throw new Error("Invalid mode. Mode must be 'online' or 'offline'.");
                }
            }
        } 
    }
}