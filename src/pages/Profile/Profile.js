import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap'
import { useParams } from 'react-router-dom';

const Profile = () => {
    const {id} = useParams();
    const [userProfileData, setUserProfileData] = useState({})

    useEffect(() => {
        fetch(`http://localhost:5000/api/users/${id}`)
        .then(res => res.json())
        .then(data => setUserProfileData(data))
    }, [id])

    return (
        <Container>
            <h1>{userProfileData.fullname}</h1>
        </Container>
    )
}

export default Profile;