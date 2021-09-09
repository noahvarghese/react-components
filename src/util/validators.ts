import validator from "validator";
import { PhoneNumber, PhoneNumberUtil } from "google-libphonenumber";

export type ValidatorFunction = (
    val: string,
    field: string
) => { success: true } | { success: false; errorMessage: string };

export interface Validators {
    [name: string]: ValidatorFunction;
}

const validators: Validators = {
    required: (val: string, field: string) => {
        if (validator.isEmpty(val)) {
            return {
                success: false,
                errorMessage: `${field.split("_").join(" ")} cannot be empty`,
            };
        } else {
            return {
                success: true,
            };
        }
    },
    date: (val: string, field: string) => {
        const res = validators.required(val, field);

        if (!res.success) {
            return res;
        }

        try {
            Date.parse(val);
            return { success: true };
        } catch (_) {
            return { success: false, errorMessage: `Invalid ${field}` };
        }
    },
    email: (val: string) => {
        const res = validators.required(val, "email");

        if (!res.success) {
            return res;
        }

        if (validator.isEmail(val)) {
            return res;
        } else {
            return {
                success: false,
                errorMessage: "Invalid email",
            };
        }
    },
    tel: (val: string) => {
        const res = validators.required(val, "phone number");

        if (!res.success) {
            return res;
        }

        let phoneUtil = new PhoneNumberUtil();
        let phone: string | PhoneNumber = val;

        try {
            // currently locale is hard coded
            phone = phoneUtil.parseAndKeepRawInput(phone, "CA");
            if (phoneUtil.isValidNumber(phone)) {
                return res;
            }
        } catch (e) {}

        return {
            success: false,
            errorMessage: "Invalid phone number",
        };
    },
    postal_code: (val: string) => {
        const res = validators.required(val, "postal code");

        if (!res.success) {
            return res;
        }

        if (
            !/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i.test(
                val
            )
        ) {
            return {
                success: false,
                errorMessage: "Invalid postal code",
            };
        }
        // validator does not work nicely with canadian postal codes
        // if (validator.isPostalCode(val, "any")) {
        // res.success = false;
        // res.errorMessage = "Invalid postal code";
        // }

        return res;
    },
};

export default validators;
