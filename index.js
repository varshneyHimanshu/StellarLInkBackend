import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";


// routes
import AuthRoute from './routes/AuthRoute.js'
import UserRoute from './routes/UserRoute.js'
import PostRoute from './routes/PostRoute.js'
import UploadRoute from './routes/UploadRoute.js'
import ChatRoute from './routes/ChatRoute.js'
import MessageRoute from './routes/MessageRoute.js'
import  AllPostRoute  from "./routes/AllPostRoute.js";
import AdRoute from "./routes/AdRoute.js";
import CommentRoute from "./routes/CommentRoute.js"


const app = express();

// var whitelist = ['https://stellar-link.vercel.app/']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }


app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);




// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// bodyParser is a middleware that helps parse the body of incoming HTTP requests, making it easier to work with the data in your routes.
// bodyParser.json() specifically parses JSON data from the request body. This means if a client sends a JSON object in the request body,
//  this middleware will parse it into a JavaScript object and attach it to req.body.
// { limit: "30mb" }: Sets the maximum size of the JSON payload to 30 megabytes. If the incoming JSON data is larger than this limit, the request will be rejected.
// { extended: true }: This option allows for rich objects and arrays to be encoded into the URL-encoded format. you can send deeply nested objects.
// urlencoded-> This specifies that the middleware should handle requests with URL-encoded form data. Form data is a common way to submit data from HTML forms, where key-value pairs are encoded in the request body.





// to serve images inside public folder
app.use(express.static('public')); 
app.use('/images', express.static('images'));   // to create the virtual path and finally mounting with the directory


dotenv.config();
const PORT = process.env.PORT;

const CONNECTION =process.env.MONGODB_CONNECTION;
mongoose
  .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Listening at Port ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


app.use('/auth', AuthRoute);
app.use('/user', UserRoute)
app.use('/posts', PostRoute)
app.use('/allposts',AllPostRoute)
app.use('/upload', UploadRoute)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)
app.use('/adData',AdRoute)
app.use('/comment',CommentRoute)