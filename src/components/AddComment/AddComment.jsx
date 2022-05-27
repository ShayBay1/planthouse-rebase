import React, { useState } from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react'

export default function AddCommentForm(props){
    const [selectedFile, setSelectedFile] = useState('')
    const [state, setState] = useState({
      comment: ''
    })
  
    function handleFileInput(e){
      setSelectedFile(e.target.files[0])
    }
  
    function handleChange(e){
      setState({
        ...state,
        [e.target.name]: e.target.value
      })
    }
  
    function handleSubmit(e){
      e.preventDefault()
               
      const formData = new FormData()
      formData.append('comment', state.comment)
      props.addComment(formData); 
    }
    return (
        <Grid textAlign='center' style={{ height: '25vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Segment>
          
              <Form  autoComplete="off" onSubmit={handleSubmit}>
              
                <Form.Input
                    className="form-control"
                    name="caption"
                    value={state.comment}
                    placeholder=" add comment "
                    onChange={handleChange}
                    required
                />    
                <Button
                  type="submit"
                  className="btn"
                >
                  Comment
                </Button>
              </Form>
            </Segment>
        </Grid.Column>
      </Grid>
     
    )
}