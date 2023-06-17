import Users from "../models/UserModel.js"
import encrypt from "encryptjs";



export const register = async (req, res) => {
    try{
        const { name, email, password, pin, role} = req.body;

        var secretkey = "abc";
        var plainPin = pin;
        var plaintext = password;
        var cipherText = encrypt.encrypt(plaintext, secretkey, 256);
        var cipherPin = encrypt.encrypt(plainPin, secretkey, 256);
        const user = new Users ({ name, email, password:cipherText, pin:cipherPin, role})
        await user.save();
        return res.send("Register successful")


    }catch(err) {
        return res.send(err)
    }
}