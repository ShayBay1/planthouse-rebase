import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Button, Form, Grid, Header, Image, Segment} from 'semantic-ui-react';
import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";

export default function SignUpPage(props) {
  const [error, setError ]=useState('')
  const navigate = useNavigate()
  const [state, setState]=useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
    bio: ''
  });

  const [selectedFile, setSelectedFile] = useState('');

   async function handleSubmit(e){
    e.preventDefault()
    const formData = new FormData(); //from the browser
    formData.append('photo', selectedFile);
   
    for (let fieldName in state){
      formData.append(fieldName, state[fieldName])
    }

    try {
      await userService.signup(formData) 
      props.handleSignUpOrLogin();
      navigate('/')
    } catch(err){
      console.log(err.message);
      setError(err.message)
    }

  }
  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  function handleFileInput (e) {
    setSelectedFile(e.target.files[0])
  }
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
   <Grid.Column style={{ maxWidth: 450 }}>
     <Header as="h2" color="teal" textAlign="center">
       <Image src="https://i.imgur.com/bAo2Kx2.jpeg" /> Sign Up
     </Header>
     <Form autoComplete="off" onSubmit={handleSubmit}>
       <Segment stacked>
         <Form.Input
           name="username"
           placeholder="username"
           value={state.username}
           onChange={handleChange}
           required
         />
         <Form.Input
           type="email"
           name="email"
           placeholder="email"
           value={state.email}
           onChange={handleChange}
           required
         />
         <Form.Input
           name="password"
           type="password"
           placeholder="password"
           value={state.password}
           onChange={handleChange}
           required
         />
         <Form.Input
           name="passwordConf"
           type="password"
           placeholder="Confirm Password"
           value={state.passwordConf}
           onChange={handleChange}
           required
         />
         <Form.TextArea
           label="bio"
           name="bio"
           placeholder="Whats your story?"
           onChange={handleChange}
         />
         <Form.Field>
           <Form.Input
             type="file"
             name="photo"
             placeholder="Show us your favorite plant"
             onChange={handleFileInput}
           />
         </Form.Field>
         <Button type="submit" className="btn">
           Signup
         </Button>
       </Segment>
       {error ? <ErrorMessage error={error} /> : null}
     </Form>
   </Grid.Column>
 </Grid>

   ); 
}