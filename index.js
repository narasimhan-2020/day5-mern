//initialize express and mongoose 

const express = require('express');
const app = express();
app.use(express.json());
 const mongoose = require('mongoose')  ;
 // create a schema for post 
 const Postschema = new mongoose.Schema({
    image : String,
    caption : String,
    comments:{
        type: [String],
        default: []
    },
    likes: {
        type: Number,
        default:0
    }
}
 )
 // creaing a mdel for post 
 const Post = mongoose.model('Post',Postschema);
 // create a route to get all the post
 app.get('/posts', async(req,res)=>{
    const posts = await Post.find({});
    res.send(posts);
 } );
 //create a route to get single post
  app.get('/posts/:id', async (req,res)=>{
    const id= req.params.id;
    const post = await Post.findById(IDRequest);
    res.send(post);
  });
  // create a route for creating a post
  app.post('\posts', async(req,res)=> {
    const image = req.body.image;
    const caption = req.body.caption;
    const post = new Post({
        image: image,
        caption : caption
    })
  await post.save();
  res.send(post);
  });
  //create a route for updating a post
  app.put('/posts/:id', async(req,res)=>{
    const id = req.params.id;
    const image= req.body.image;
    const caption= req.body.caption;
    const post=await Post.findById(id);
    post.caption=caption;
    await post.save();
    res.send(post);
  }
  );
  // create a route for delete a post
app.delete('/posts/:id', async(req,res)=>{
    const id = req.params.id;
    await Post.findByIdAndDelete(id);
    res.send('Post deleted successfully');
}
);
//create a route for liking a post

app.put('/posts/:id/like', async(req,res)=>{
    const id= req.params.id;
    const post= await Post.findById(id);
    post.likes = post.likes + 1;
    await post.save();
    res.send(post);
}
);
// create a route for unliking a post
app.put('/posts/:id/unlike', async(req,res)=>{
    const id= req.params.id;
    const post= await Post.findById(id);
    post.likes = post.likes - 1;
    await post.save();
    res.send(post);
}
);
//create a route for commenting  a post
app.put('/posts/:id/comment',async(req,res)=>{
    const id= req.params.id;
    const comment= req.body.comment;
    const post = await Post.findById(id);
    post.comments.push(comment);
}
);
// create a route to get all comments on post
app.get('/posts/:id/comments', async(req,res)=>{
const id = req.params.id;
const post = await Post.findById(id);
res.send(post.comments());

}
);
//create a route for getting all likes on a post
app.get('/posts/:id/likes', async(req,res)=>{
    const id = req.params.id;
    const post = await Post.findById(id);
    res.send(post.likes());
    
    }
    );
    app.listen( 3000, () =>{
        console.log('Server started on port 3000')
        mongoose.connect("mongodb+srv://lakshminarasimhan592:H%40ppyMONGODB23%21@cluster0.hrqrc7y.mongodb.net/").then(() => {
            console.log("Connected to the database!");
    })
    });
    








