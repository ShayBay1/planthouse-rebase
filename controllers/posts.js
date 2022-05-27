
   
const Post = require('../models/post');
const S3 = require('aws-sdk/clients/s3');
const { v4: uuidv4 } = require('uuid');
const s3 = new S3();

module.exports = {
    create,
    remove,
    index
}
function create(req, res){
    console.log('CREATE');
    console.log(req.file, req.body, 'this is create method', req.user)
    try {
        const filePath = `${uuidv4()}/${req.file.originalname}`
        const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer};
        s3.upload(params, async function(err, data){
			console.log(err, 'this is coming back from aws')
            const post = await Post.create({caption: req.body.caption, user: req.user, photoUrl: data.Location});
            console.log(post)

			await post.populate('user');
		
            res.status(201).json({post: post})
        })
    } catch(err){
        console.log(err)
        res.json({data: err})
    }
}

async function remove(req, res){
    console.log('REMOVE');

    // try {
    //     s3.deleteObject(req.params.id);
    // } catch(err){
    //     console.log(err)
    //     res.json({data: err})
    // }
    try {
        console.log("trying to remove post: " , req.params.id)
        console.log("userdata", req.user.id)
        const post = await Post.findOne({"posts.id":req.params.id , "user._id": req.user.id});
        post.remove()
        res.status(200).json({post})
    } catch(err){

    }
}

async function index(req, res){
    console.log('INDEX');
    try {
        const posts = await Post.find({}).populate('user').exec()
        res.status(200).json({posts})
    } catch(err){
    }
}