import Auth from "./Auth.js";

function RouteMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        let response = Auth.verifyToken(token);
        if (response) {
            next();
        } else {
            res.status(200).json({
                error: "Token is not valid"
            });
        }
    } else {
        res.status(200).json({
            error: "No token found"
        });
    }

}

export default RouteMiddleware;