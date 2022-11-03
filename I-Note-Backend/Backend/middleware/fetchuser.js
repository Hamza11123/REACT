const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = "HamzaShaikh@gmail.com";
const fetchuser = (req, res, next) => {

    // get the user from jwt & add it to the req-obj
    const token = req.header("auth-token"); // Getting Token Through "Headers"
    if (!token) return res.status(401).send({ error: "not valid token" });

    try {
        // This is verifying the [token] with the [Secret-Key], & Returning The [MongoDB-Document-data] (unique-id)
        const data = jwt.verify(token, JWT_SECRET_KEY);

        // now, the returned Data will be assigned Into The "req.user"(variable)
        req.user = data.user;
        // console.log(data.user.id)
        // console.log(req.user)
        next();

    } catch (error) {
        return res.status(401).send({ error: "authenticate using valid token" });
    }
}

module.exports = fetchuser;


