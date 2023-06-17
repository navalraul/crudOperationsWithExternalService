import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import router from "./routes/UserRoutes.js"


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1',router);

mongoose.connect('mongodb+srv://Crud123:crud1234@cluster0.k0bgc2r.mongodb.net/CrudDB?retryWrites=true&w=majority')
.then(() => console.log("Db connected"))
.catch((err) => console.log("Db error", err))

app.listen(6000,() => console.log("Working on port 4000"));