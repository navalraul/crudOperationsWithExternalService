import Users from "../models/UserModel.js";


export const checksForRegister = async (req, res, next) => {
    try {
        const { name, email, password, role,pin } = req.body;
        if (!name) return res.send("Name is required! in middleware");
        if (!email) return res.send("email is requierd! in middleware");
        if (!password) return res.send("password is requierd! in middleware");
        if (!role) return res.send("role is requierd! in middleware");
        if (!pin) return res.send("pin is requierd! in middleware");
        if (password.length <= 8) {
            return res.send("User Password length is less than 8 !")
        }
        const response = await Users.find({ email: email }).exec();
        console.log(response, "response")
        if (response.length) {
            return res.send("Email is already Taken or You are already resgistered!!");
        }
        next();


    }catch (error) {
        return res.send(error)
    }
}


export const sellerMiddleware = async (req, res, next) => {
    try{
        const { id, pin } = req.body;
        if(!pin) return res.send("Pin is required");
        if(!id) return res.send("Id is required");
        var secretkey = "abc";
        const response = await Users.find({ _id : id}).exec();
        console.log(response,"response here");
        var decipherPin = encrypt.decrypt(response[0].pin, secretkey, 256);
        console.log("Decipher Pin is:" +decipherPin);
        if(response.length) {
            if (decipherPin == pin) {
                if(response[0].role == "seller" || response[0].role == "admin"){
                    next();
                } else {
                    return res.send("You are not allowed to add product.")
                }
            } else {
                return res.send("Wrong pin")
            }
        }else {
            return res.send("User id not found.")
        }
    }catch (error){
        res.send(error)
    }
}