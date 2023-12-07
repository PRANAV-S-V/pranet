// importing necessary modules.
import express from "express";
import bodyParser from "body-parser";

// let userPosts = 0;
let title = [];
let content = [];
let editId = 0;
let postTitle = "";
let postContent = "";
// initialising the port number.
const port = 3000;
// creating an object of express
const app = express();
// setting the valueOfMode to true to make the default mode light.
let valueOfMode = true;
// creating the bodyparser middleware to handle the data from the user.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
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

 

// to submit the post
app.post("/posted", (req, res) => { 
    title.push(req.body.title);
    content.push(req.body.content);
    res.redirect("/homepage")
});
// when user login with their credentials, making the homepage display.
app.post("/homepage", (req, res) =>{
    // authentication works.
    if (req.body.emailID === "thisispranavsv" && req.body.password === "123456"){
            res.render("homepage.ejs", {
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


app.get("/mode", (req, res) => {
    // Toggle the mode value
    valueOfMode = !valueOfMode;

    // Check the referring URL and redirect back to that page
    const referringUrl = req.get('Referer') || '/'; // Get the referring URL or set a default '/'
    res.redirect(referringUrl);
});

// the homepage request
app.get("/homepage", (req, res) => {
    res.render("homepage.ejs", {
        mode: sendMode(),
        rep: title.length,
        postTitle: title,
        postContent: content
        
    });
    
});

 // to add post
 app.get("/post", (req, res) => {
    res.render("post.ejs", {
        mode: sendMode()
    });
});

app.post("/edited", (req, res)=> {
    title.splice(editId, 1, req.body.title);
    content.splice(editId, 1, req.body.content);
    res.redirect("/homepage")
});

app.post("/editPost", (req, res) => {
    editId = req.body.id[4];
    res.redirect("/editing");
   
});
app.get("/editing", (req, res)=>{

    res.render("post.ejs", {
        mode: sendMode(),
        title: title[[editId]],
        content: content[[editId]]
       })
    
});

app.post("/removePost", (req, res) => {
    const postId = req.body.id[6]
    title.splice(postId, 1); 
    content.splice(postId, 1);
    res.redirect("/homepage")
});

app.post("/readPost", (req, res)=>{
    const postNo = req.body.id[4];
     postTitle = title[postNo];
     postContent = content[postNo];
     res.redirect("/read")
});

app.get("/read", (req, res)=>{
    
    res.render("readpost.ejs",
    {mode:sendMode(), 
    title: postTitle,
     content: postContent });
});
// make the server start and listen to the requests from the user.
app.listen(port, (req, res) => {
    console.log("The server is live now.")
});