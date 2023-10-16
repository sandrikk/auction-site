import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//hash
const password = "heyy";
bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
        console.log(err)
        return;
    }

    console.log("Hashed password: " +  hash);
})

const user = {
    id: 1,
    username: "test",
    email: "test@example.com",
    password: "$2b$10$.XDRM7YdEgNu.OnIIAy.AuCIe0LRSDPoqH8/fBhdiHvotAUGC6ite",
    isAdmin: false,
};

//compare
bcrypt.compare(password, user.password, function (err, result) {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Passwords match?: " + result)
});

//sign - tokenRouter.js
const secret = "gndgfncgdngfngbgfgfbgrfrgbfhtmutnrbvecdwdevrbtnmybnfbfbbf";

jwt.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, secret,{ algorithm: 'HS256' }, function (err, token) {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Token:")
    console.log(token);
});

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0IiwiaXNBZG1pbiI6ZmFsc2UsInBhc3N3b3JkIjoiJDJ5JDEwJDVyV3puUU1tQTYxczV6TW1ZWGs3N085SnAvTkF0ZmxLZFgwNjlOOUpjamN3QUZmRmRETGs2In0.YHB5K7cE53Ikhn24NqldElS5NJXSXMJL3OkY44ySD7E";

//verify - is-logged-in
jwt.verify(token, secret, { algorithm: 'HS256' },function (err, decoded) {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Decoded token:")
    console.log(decoded);
});
