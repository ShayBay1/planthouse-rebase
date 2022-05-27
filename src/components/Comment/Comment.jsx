
   
import React, {useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import PageHeader from "../Header/Header";
import AddPostForm from "../AddPostForm/AddPostForm";
import PostFeed from "../PostFeed/PostFeed";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loading from "../Loader/Loader";
import * as postsAPI from "../../utils/postApi";

export default function Comment({user, handleLogout}) {
    console.log(commentAPI, " <-- commentAPI")
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
  
    async function handleAddComment(post) {
      try {
        const data = await postsAPI.create(post); 
        console.log(data, " this is 'data' a response from the server, in handleAddPost");
        setPosts([data.post, ...posts]);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    }
    async function getComments() {
      try {
        const data = await commentsAPI.getElementById();
        console.log(data, " this is data,");
        setPosts([...data.posts]);
        setLoading(false);
      } catch (err) {
        console.log(err.message, " this is the error");
        setError(err.message);
      }
    }
    useEffect(() => {
      getComments();
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
      <Comment.Group>
      <Comment>
        <Comment.Avatar as='a' src='/images/avatar/small/stevie.jpg' />
        <Comment.Content>
          <Comment.Author>{username}</Comment.Author>
          <Comment.Text>
            {comment}
          </Comment.Text>
        </Comment.Content>
      </Comment>
    </Comment.Group>
  );
  }
  