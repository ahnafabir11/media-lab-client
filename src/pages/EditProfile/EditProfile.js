import './EditProfile.css';
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';
import noProfileImg from '../../images/no-profile.png';

const EditProfile = () => {
    const history = useHistory()
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [profileImgFile, setProfileImgFile] = useState(null)
    const [fbUrl, setFbUrl] = useState(loggedInUser.social.fbLink)
    const [igUrl, setIgUrl] = useState(loggedInUser.social.igLink)
    const [name, setName] = useState(loggedInUser.fullname)

    const onSubmit = () => {
        const formData = new FormData()
        formData.append('id', loggedInUser._id)
        formData.append('name', name)
        formData.append('fbLink', fbUrl)
        formData.append('igLink', igUrl)
        formData.append('file', profileImgFile)

        fetch(`http://localhost:5000/api/updateProfile`, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                fetch(`http://localhost:5000/api/usersmail/${loggedInUser.email}`)
                    .then(res => res.json())
                    .then(data => {
                        setLoggedInUser(data[0])
                        history.push(`/profile/${loggedInUser._id}`)
                    })
            })
    }

    return (
        <Container>
            <h3 className="page_title">Update Profile</h3>
            <h5 className="mb-3">Change Profile Picture</h5>
            <div className="d-flex align-items-end justify-content-between mb-5">
                {
                    loggedInUser.profileImg?.img === undefined ?
                        <img
                            src={noProfileImg}
                            alt={loggedInUser.fullname}
                            className="profilePicture"
                        /> :
                        <img
                            src={`data:image/png;base64,${loggedInUser.profileImg?.img}`}
                            alt={loggedInUser.fullname}
                            className="profilePicture"
                        />
                }
                <div className="d-flex align-items-end w-50">
                    <Form.Group className="mb-3 mr-1 flex-fill">
                        <Form.Control className="border rounded" type="file" onChange={(e) => setProfileImgFile(e.target.files[0])} />
                    </Form.Group>
                </div>
            </div>

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

            <Button className="d-block mb-3 ms-auto" onClick={onSubmit}>UPDATE</Button>

        </Container>
    )
}

export default EditProfile;