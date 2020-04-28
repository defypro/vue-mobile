const validate = {
    required(value) {
        if (value === undefined || value === null) return false;

        if (Array.isArray(value)) {
            return value.length > 0 && value.every(val => this.required(val));
        }

        return !!String(value).trim().length;
    },

    max(value, length) {
        if (value === undefined || value === null) {
            return length >= 0;
        }

        if (Array.isArray(value)) {
            return value.length <= length;
        }

        return String(value).length <= length;
    },

    min(value, length) {
        if (value === undefined || value === null) {
            return length >= 0;
        }

        if (Array.isArray(value)) {
            return value.length >= length;
        }

        return String(value).length >= length;
    },

    minValue(value, min) {
        if (value === null || value === undefined || value === '') {
            return false;
        }

        if (Array.isArray(value)) {
            return value.length > 0 && value.every(val => this.minValue(val, min));
        }

        return Number(value) >= min;
    },

    maxValue(value, max) {
        if (value === null || value === undefined || value === '') {
            return false;
        }

        if (Array.isArray(value)) {
            return value.length > 0 && value.every(val => this.maxValue(val, max));
        }

        return Number(value) <= max;
    },

    numeric(value) {
        return /^[0-9]+$/.test(String(value));
    },

    exactLength(value, length) {
        return String(value).length === length;
    },

    mobilePhone(value) {
        return this.required(value) && this.numeric(value) && this.exactLength(value, 11);
    }
};

export default validate;