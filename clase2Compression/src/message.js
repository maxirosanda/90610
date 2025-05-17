

export const generateUserErrorInfo = (user) =>{
    return `One or more properties were incomplete or not valid. First_name: needs to be a String, received ${user.first_name} Last_name: needs to be a String, received ${user.last_name} Email: needs to be a String, received ${user.email}`
}


export const generateUserErrorParam = (uid) => {
    
    return `Invalid user ID provided. uid must be a positive number, received ${uid}`;

};