import jwt from 'jsonwebtoken';

const secret = 'fvsjbherbheirbrhvfvkcvnkgndhghdrjtfkyugfjdhtgrrsehtrdyufkylfkjrdthserashtrdjytkfuytjdrhsetrdfkuyjtdhrtscvkdvkcv';

const isLoggedIn = (req, res, next) => {
    //Check Authorization header
    const token = req.get('Authorization');
    console.log(token);

    //next();


    if (!token) {
        console.log(token);
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const jwtToken = token.split(' ')[1];

    //Verify the JWT token
    jwt.verify(jwtToken, secret, (err, decoded) => {
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
