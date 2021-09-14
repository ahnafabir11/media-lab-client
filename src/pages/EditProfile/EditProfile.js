import './EditProfile.css';
import React, { useState, useRef } from 'react';
import { Container, Form } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';
import noProfileImg from '../../images/no-profile.png';

const EditProfile = () => {
    const history = useHistory()
    const selectImage = useRef()
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [profileImgFile, setProfileImgFile] = useState(null)
    const [profilePreview, setProfilePreview] = useState(null)
    const [fbUrl, setFbUrl] = useState(loggedInUser.social.fbLink)
    const [igUrl, setIgUrl] = useState(loggedInUser.social.igLink)
    const [name, setName] = useState(loggedInUser.fullname)

    const handleSelectedImage = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.addEventListener('load', () => setProfilePreview(reader.result))
        }
        setProfileImgFile(e.target.files[0])
    }

    const onSubmit = () => {
        if (profileImgFile !== null) {
            const formData = new FormData()
            formData.append('file', profileImgFile)
            formData.append('upload_preset', 'medialab')

            fetch('	https://api.cloudinary.com/v1_1/dpjc6l7je/image/upload', {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    const updatedData = {
                        id: loggedInUser._id,
                        fullname: name,
                        fbLink: fbUrl,
                        igLink: igUrl,
                        profileImg: data.secure_url
                    }

                    fetch(`https://mysterious-sierra-15948.herokuapp.com/api/updateProfile`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updatedData),
                    })
                        .then(res => res.json())
                        .then(data => {
                            setLoggedInUser(data)
                            history.push(`/profile/${loggedInUser._id}`)
                        })
                })

        } else {
            const updatedData = {
                id: loggedInUser._id,
                fullname: name,
                fbLink: fbUrl,
                igLink: igUrl,
            }
            fetch(`https://mysterious-sierra-15948.herokuapp.com/api/updateProfile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            })
                .then(res => res.json())
                .then(data => {
                    setLoggedInUser(data)
                    history.push(`/profile/${loggedInUser._id}`)
                })
        }

    }

    return (
        <Container>
            <h3 className="page_title">Update Profile</h3>
            <h5 className="mb-3">Change Profile Picture</h5>
            <div className="d-flex flex-column align-items-center">
                {
                    profilePreview !== null ?
                        <img
                            src={profilePreview}
                            alt={loggedInUser.fullname}
                            className="profilePicture"
                        /> : loggedInUser.profileImg === "" ?
                            <img
                                src={noProfileImg}
                                alt={loggedInUser.fullname}
                                className="profilePicture"
                            /> :
                            <img
                                src={loggedInUser.profileImg}
                                alt={loggedInUser.fullname}
                                className="profilePicture"
                            />
                }
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    className="mb-3 mt-3"
                    onClick={() => selectImage.current.click()}
                >
                    Choose Image
                </Button>
            </div>
            <Form.Control
                type="file"
                accept="image/*"
                ref={selectImage}
                className="d-none"
                onChange={(e) => handleSelectedImage(e)}
            />

            <h5 className="mb-3">Update Full Name</h5>
            <div className="mb-5 d-flex">
                <Form.Group className="mb-3 p-1 flex-fill">
                    <Form.Label>Your Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        className="border rounded"
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
            </div>

            <h5 className="mb-3">Social Links</h5>
            <div className="mb-5 d-flex">
                <Form.Group className="mb-3 p-1 flex-fill">
                    <Form.Label>Facebook Profle URL</Form.Label>
                    <Form.Control
                        type="text"
                        value={fbUrl}
                        className="border rounded"
                        placeholder="https://www.facebook.com/example"
                        onChange={(e) => setFbUrl(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3 p-1 flex-fill">
                    <Form.Label>Instagram Profle URL</Form.Label>
                    <Form.Control
                        type="text"
                        value={igUrl}
                        className="border rounded"
                        placeholder="https://www.instagram.com/example"
                        onChange={(e) => setIgUrl(e.target.value)}
                    />
                </Form.Group>
            </div>

            <Button
                variant="contained"
                color="primary"
                className="mb-3"
                onClick={onSubmit}
            >
                UPDATE
            </Button>

        </Container>
    )
}

export default EditProfile;