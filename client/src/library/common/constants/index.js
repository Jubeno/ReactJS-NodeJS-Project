export const NAVIGATION_LIST = [
    { id: 1, name: 'Home', eventKey: '/homepage'},
    { id: 2, name: 'Timeline', eventKey: '/timeline'},
];

export const PASSWORD_VALIDATION = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

export const ERROR_MESSAGE = {
    "required": "This field is required!!",
    "minLength": "Too short!!!",
    "maxLength": "Too long!?!",
    "pattern": "Password must be contained at least one digit, at least one lowercase, at least one uppercase and min-length is 8!!",
    "validate": "Password do not match!!?!!"
}

export const API_PATHS = {
    signIn: '/api/usersession/signin',
    signUp: '/api/usersession/signup',
    uploadPhotos: '/timeline/photos/upload',
    uploadContents: '/timeline/contents/upload',
}

export const MAX_NUMBER_IMAGES = 4;