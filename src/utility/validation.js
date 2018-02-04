const validate = (value, rules, connectedValue) => {
    let isValid = true;

    for (const rule in rules) {
        switch (rule) {
            case 'isEmail':
                isValid = isValid && emailValidator(value);
                break;
            case 'minLength':
                isValid = isValid && minLengthValidator(value, rules[rule]);
                break;
            case 'equalTo':
                isValid = isValid && equalToValidator(value, connectedValue);
                break;    
            case 'notEmpty':
                isValid = isValid && notEmptValidator(value);
                break;    
            default:
                isValid = true;
                break;
        }
    }

    return isValid;
};

const emailValidator = value => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value);
};

const minLengthValidator = (value, minLength) => {
    return value.length >= minLength;
};

const equalToValidator = (value, checkValue) => {
    return value === checkValue.equalTo
};

const notEmptValidator = value => {
    return value.trim() !== '';
};

export default validate;