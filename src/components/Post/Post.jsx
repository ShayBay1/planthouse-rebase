import React from "react";
import { Card, Icon, Image, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";


function PostCard({ post, isProfile, removePost, removeComment, addComment, user }) {
  function handleOnClick(){
    console.log("initial button was clicked")
    removePost(post._id)
  }
  
  return (
    <Card key={post._id} raised>
      {isProfile ? (
        ""
      ) : (
        <Card.Content textAlign="left">
          <Container textAlign="right">
          <Icon name={"x"} size="large" color="red" onClick={handleOnClick}></Icon>
          </Container>
          <Card.Header>
            <Link to={`/${post.user.username}`}>
              <Image
                size="large"
                avatar
                src={
                  post.user.photoUrl
                    ? post.user.photoUrl
                    : "https://i.imgur.com/bAo2Kx2.jpeg"
                }
              />
              {post.user.username}
            </Link>
          </Card.Header>
        </Card.Content>
      )}
      <Image src={`${post.photoUrl}`} wrapped ui={false} />
      <Card.Content>
        <Card.Description>{post.caption}</Card.Description>
      </Card.Content>
    </Card>
  );
}

export default PostCard;