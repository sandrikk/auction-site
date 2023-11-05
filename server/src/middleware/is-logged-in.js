import jwt from 'jsonwebtoken';

const secret = 'fvsjbherbheirbrhvfvkcvnkgndhghdrjtfkyugfjdhtgrrsehtrdyufkylfkjrdthserashtrdjytkfuytjdrhsetrdfkuyjtdhrtscvkdvkcv';

const isLoggedIn = (req, res, next) => {
    //Check Authorization header
    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'You are not logged in.' });
    }

    const jwtToken = token.split(' ')[1];

    //Verify the JWT token
    jwt.verify(jwtToken, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = decoded;

        next();
    });




};

export default isLoggedIn;
