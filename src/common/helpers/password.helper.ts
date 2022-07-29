import {hashSync,compare} from "bcrypt"

export function checkPasswordRepeat(password,rpassword){
    if(password === rpassword) return true
    return false
}

export function hashPassword(password){
    return hashSync(password,4)
}

export function comparePasswords(password,passwordFromDB){
    return compare(password,passwordFromDB)
}