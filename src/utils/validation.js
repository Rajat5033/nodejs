const validateEmail = (email) =>{
    const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const validatePassword = (password) =>{
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

const validateContactNo = (contactNo) =>{
    const contactRegex = /^\d{10}$/;
    return contactRegex.test(contactNo)
}

export {validateEmail, validatePassword, validateContactNo}