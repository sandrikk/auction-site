import jwt from 'jsonwebtoken';

const secret = 'dfrdhvdernjgtfbhvdbernjtgufyvhdhbefrjgfuivyhdfjrntkgifbuhvdrjgtfubhvdjrgtufbhvdrjgtbufhvdnrgtjbvhfdng';

const isLoggedIn = (req, res, next) => {
    //Check Authorization header
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    //Verify the JWT token
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        //Assign the payload to req.user
        req.user = decoded;

        //Call the next middleware
        next();
    });
};

export default isLoggedIn;
