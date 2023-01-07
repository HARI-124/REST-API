const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/wikiDb",{useNewUrlParser:true});

const ArticleSChema = new mongoose.Schema({
    title:String,
    content:String
});

const Article = mongoose.model("Article",ArticleSChema);

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));


app.route("/articles/:title")
    .get(function(req,res){
        Article.findOne({title:req.params.title},function(err,resultArticle){
            if(resultArticle){
                res.send(resultArticle);
            }else{
                res.send("No article found");
            }
        });
    })
    // .post(function(req,res){
    //     if(!err){

    //     }else{
    //         console.log(err);
    //     }

    // })

    .delete(function(req,res){
      
        Article.deleteOne({title:req.params.title},function(err){
            if(!err) res.send("delete complete");
            else res.send(err);
        });
        

    })

    .put(function(res,req){
        Article.updateMany(
            {title: req.params.title},
            {title:req.body.title, content:req.body.content},
            {overwrite:true},
            function(err){
                if(!err) res.send("sucess")
                else res.send(err);
            }
        
            )

    })


    .patch()




app.route("/articles")
    .get(function(req,res){
        Article.find(function(err,articless){
            if(!err){
                res.send(articless);
            }else{
                res.send(err);
            }
        });
    })
    .post(function(req,res){
    
          const NewArticle = new Article({
            title : req.body.title,
            content : req.body.content
          });
          NewArticle.save(function(err){
            if(!err)res.send("sucessfull");
            else res.send(err);
          });  


    })

    .delete(function(req,res){
        if(!err){
            Article.deleteMany(function(err){
                if(!err) res.send("deleted all articles");
                else res.send(err);
            })
        }else{
            console.log(err);
        }

    })
































app.listen(3000,function(){
console.log("server started at port 3000");
});





