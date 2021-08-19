import "./CreatePost.css";
import React from "react";
import { Button } from "@material-ui/core/";
import { Container, Form } from "react-bootstrap";

const CreatePost = () => {
    const handlePost = ()=> {

    }
  return (
    <Container>
      <h4 className="page_title">Create New Post</h4>

      <div className="d-flex align-items-end">
        <Form.Group className="mb-0" style={{flex: 1}}>
          <label>Select A Photo</label>
          <Form.File id="exampleFormControlFile1" className="border rounded" />
        </Form.Group>
        <Button variant="contained" color="primary" onClick={handlePost}>
          upload
        </Button>
      </div>
    </Container>
  );
};

export default CreatePost;
