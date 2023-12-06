// importing necessary modules.
import express from "express";
import bodyParser from "body-parser";

// let userPosts = 0;
let title = [];
let content = [];
// initialising the port number.
const port = 3000;
// creating an object of express
const app = express();
// setting the valueOfMode to true to make the default mode light.
let valueOfMode = true;
// creating the bodyparser middleware to handle the data from the user.
app.use(bodyParser.urlencoded({extended: true}));
// making the static pages known to the express. 
app.use(express.static("public"));

// To change the mode to dark and light
function sendMode(){
    if (valueOfMode){
        return "light";
    }else{
        return "dark";
    }
};

// making the index page load as soon as the user enters the website.
app.get("/", (req, res) => {
    res.render("index.ejs");
  });

  // to add post
app.get("/post", (req, res) => {
    res.render("postCt.ejs", {
        mode: sendMode()
    });
});

// to submit the post
app.post("/posted", (req, res) => { 
    title.push(req.body.title);
    content.push(req.body.concat);
    res.render("home.ejs", {
        mode: sendMode(),
        rep: title.length,
        postTitle: title,
        postContent: content
    });
});
// when user login with their credentials, making the homepage display.
app.post("/login", (req, res) =>{
    // authentication works.
    if (req.body.emailID === "thisispranavsv" && req.body.password === "123456"){
            res.render("home.ejs", {
                // sends the mode 
                mode: sendMode(),
                // sends the number of posts
                rep: title.length,
                // sends the title of the posts in order
                postTitle: title,
                // sends the content of the posts
                postContent: content
            });
            
    } else{
        res.render("index.ejs");
    }
});

// when user changes the mode then calling the homepage again with new mode. 
app.get("/homepage", (req, res) => {
    valueOfMode = !valueOfMode;
    let currentPage = req
    console.log(currentPage);
    res.render("home.ejs", {
        mode: sendMode(),
        rep: title.length,
        postTitle: title,
        postContent: content
    });
    
});

// make the server start and listen to the requests from the user.
app.listen(port, (req, res) => {
    console.log("The server is live now.")
});