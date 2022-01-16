declare module 'express-serve-static-core' {
    interface Request {
        userData?: {
            email: any, 
            userId: any 
        };
        loggedIn?: boolean;
    }
}
