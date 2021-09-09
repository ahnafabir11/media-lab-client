import "./CreatePost.css";
import React, { useContext, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import { UserContext } from "../../App";

const CreatePost = () => {
  const history = useHistory()
  const [loggedInUser] = useContext(UserContext)
  const [postImg, setPostImg] = useState(null)
  
  const handlePost = ()=> {
    const formData = new FormData()
    formData.append('email', loggedInUser.email)
    formData.append('file', postImg)

    fetch(`http://localhost:5000/api/createPost`, {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(data => history.push(`/`))
  }

  return (
    <Container>
      <h4 className="page_title">Create New Post</h4>

      <div className="d-flex align-items-end">
        <Form.Group className="mb-0 mr-1" style={{flex: 1}}>
          <label>Select A Photo</label>
          <Form.Control type="file" className="border rounded" onChange={(e)=> setPostImg(e.target.files[0])} />
        </Form.Group>

        <Button size="sm" onClick={handlePost}>
          UPLOAD
        </Button>
      </div>
    </Container>
  );
};

export default CreatePost;
