import "./CreatePost.css";
import moment from 'moment';
import { format } from "date-fns";
import React, { useContext, useState, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { PostContext, UserContext } from "../../App";
import { Container, Form, Button } from "react-bootstrap";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

const CreatePost = () => {
  const classes = useStyles()
  const history = useHistory()
  const selectImage = useRef()
  const [allPosts, setAllPosts] = useContext(PostContext)
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [postPreview, setPostPreview] = useState(null)
  const [postImg, setPostImg] = useState(null)
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSelectedImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setPostImg(e.target.files[0])
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.addEventListener('load', () => setPostPreview(reader.result))
    }
  }

  const handlePost = () => {
    if (postImg) {
      const userPosts = allPosts.filter(posts => posts.email === loggedInUser.email)
      const postedToday = userPosts.filter(post => moment(post.uploadDate).format('DD MM YYYY') === format(new Date(), "dd MM yyyy"))

      if (postedToday.length <= 9) {
        const formData = new FormData()
        formData.append('file', postImg)
        formData.append('upload_preset', 'medialabpost')
        setLoading(true)

        fetch('https://api.cloudinary.com/v1_1/dpjc6l7je/image/upload', {
          method: 'POST',
          body: formData
        })
          .then(res => res.json())
          .then(data => {
            const postData = {
              email: loggedInUser.email,
              postImg: data.secure_url,
              public_id: data.public_id,
            }

            fetch(`https://mysterious-sierra-15948.herokuapp.com/api/createPost`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(postData),
            })
              .then(res => res.json())
              .then(data => {
                const totalChips = loggedInUser.chips + 100;
                fetch(`https://mysterious-sierra-15948.herokuapp.com/api/updateProfile`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ id: loggedInUser._id, chips: totalChips }),
                })
                  .then(res => res.json())
                  .then(data => {
                    setLoggedInUser(data)
                    fetch(`https://mysterious-sierra-15948.herokuapp.com/api/allPosts`)
                      .then(res => res.json())
                      .then(data => {
                        setAllPosts(data.reverse())
                        history.push('/')
                        setLoading(false)
                      })
                  })
              })
          })
      } else {
        setAlertMessage("Reached Post Limit For Today!")
        setAlert(true)
      }
    } else {
      setAlertMessage("Please Select An Image First!")
      setAlert(true)
    }
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert(false)
  }

  return (
    <Container>
      <h4 className="page_title">Create New Post</h4>

      {
        postPreview ?
          <div className="selectedPreveiwImg">
            <img src={postPreview} alt="" className="w-100" />
          </div> :
          <div className="previewImg">
            <AiOutlineCloudUpload size="100px" />
          </div>
      }

      <div className="d-flex justify-content-center mt-3">
        <Form.Control type="file" className="d-none" onChange={(e) => handleSelectedImage(e)} ref={selectImage} />

        <Button size="sm" variant="secondary" className="mr-2" onClick={() => selectImage.current.click()}>
          CHOOSE IMAGE
        </Button>
        <Button size="sm" onClick={handlePost}>
          UPLOAD
        </Button>
      </div>

      <Snackbar open={alert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert severity="error" onClose={handleCloseAlert}>{alertMessage}</Alert>
      </Snackbar>

      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </Container>
  );
};

export default CreatePost;