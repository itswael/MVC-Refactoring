const db = require('../data/database');
const { ObjectId } = require("mongodb");

class Post{
    constructor(title, content, id){
        this.title = title;
        this.content = content;
        if(id){
            this.id = ObjectId(id);
        }
    }

    static async fetchAll(){
        const posts = await db.getDb().collection('posts').find().toArray();
        return posts;
    }

    async fetch(){
        if(!this.id){
            return;
        }else{
            const post = await db.getDb().collection('posts').findOne({ _id: this.id });
            return post;
        }
    }

    async save(){
        if(this.id){
            const newPost = await db.getDb().collection('posts').insertOne({
                title: this.title,
                content: this.content
            });

            return newPost;
        }else{
            const post = await db
            .getDb()
            .collection('posts')
            .updateOne(
            { _id: this.id },
            { $set: { title: this.title, content: this.content } }
            );

            return post;
        }
    }

    async delete(){
        if(!this.id){
            return
        }else{
            const deletePost = await db.getDb().collection('posts').deleteOne({ _id: this.id});
            return deletePost
        }
    }
        
}

module.exports = Post;