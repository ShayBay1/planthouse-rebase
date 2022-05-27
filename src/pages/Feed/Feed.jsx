import React, {useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import PageHeader from "../../components/Header/Header";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import PostFeed from "../../components/PostFeed/PostFeed";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";
import * as postsAPI from "../../utils/postApi";
import * as commentAPI from "../../utils/commentApi";




export default function Feed({user, handleLogout}) {
    console.log(postsAPI, " <-- postsAPI")
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  

    async function handleAddPost(post) {
      try {
        setLoading(true);
        const data = await postsAPI.create(post); 
        console.log(data, " this is 'data' a response from the server, in handleAddPost");
        setPosts([data.post, ...posts]);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    }

    async function deletePost(postId) {
      console.log('delete: ', postId);
      try {
        setLoading(true);
        const data = await postsAPI.remove(postId); 
        console.log(data, " this is 'data' a response from the server, in deletePost");
        getPosts();
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    }
    async function addComment(postId){
      try {
        const data = await commentAPI.addComment(postId)
        getPosts()
        console.log(data,"<--------response from the server when adding comment")
      } catch(err){
        console.log(err)
        setError(err.message)
      }
    }
    
    async function removeComment(commentId){
      try{
        const data = await commentAPI.removeComment(commentId);
        getPosts()
      } catch(err){
        console.log(err);
        setError(err.message);
      }
    }
    async function getPosts() {
      try {
        const data = await postsAPI.getAll();
        console.log(data, " this is data,");
        setPosts([...data.posts]);
        setLoading(false);
      } catch (err) {
        console.log(err.message, " this is the error");
        setError(err.message);
      }
    }
    useEffect(() => {
      getPosts();
    }, []);
  
    if (error) {
      return (
        <>
          <PageHeader handleLogout={handleLogout} user={user}/>
          <ErrorMessage error={error} />;
        </>
      );
    }
  
    if (loading) {
      return (
        <>
          <PageHeader handleLogout={handleLogout} user={user}/>
          <Loading />
        </>
      );
    } 
  
    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column>
            <PageHeader />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 450 }}>
            <AddPostForm handleAddPost={handleAddPost} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 450 }}>
            <PostFeed 
            posts = {posts} 
            numPhotosCol={1} 
            loading = {loading}
            addComment = {addComment}
            removeComment = {removeComment} 
            deletePost= {deletePost}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  