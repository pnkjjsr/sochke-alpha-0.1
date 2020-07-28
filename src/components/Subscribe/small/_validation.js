import { isEmail, isEmpty } from "@utils/validation/type";

function validation(data) {
    let errors = {};

    if (isEmpty(data.email)) {
        errors.email = 'Email must not be empty';
    } else if (!isEmail(data.email)) {
        errors.email = 'Email address not valid';
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };

}

export default validation