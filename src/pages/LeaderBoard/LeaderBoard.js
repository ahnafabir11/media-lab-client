import './LeaderBoard.css';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Avatar } from '@material-ui/core';
import { useHistory } from 'react-router';
import { AllUserContext } from '../../App';

const LeaderBoard = () => {
  const history = useHistory()
  const [allUsers] = useContext(AllUserContext)
  const [userData, setUserData] = useState([])
  const [sortBy, setSortBy] = useState("Followers")

  useEffect(() => {
    const sortedUser = allUsers.sort((a, b) => {
      return b.followers.length - a.followers.length
    })
    setUserData(sortedUser)
  }, [])

  const changeSorting = (sortedBy) => {
    if (sortedBy === "followers") {
      setSortBy("Followers")
      const sortedUser = allUsers.sort((a, b) => b.followers.length - a.followers.length)
      setUserData(sortedUser)
    } else if (sortedBy === "chips") {
      setSortBy("Chips")
      const sortedUser = allUsers.sort((a, b) => b.chips - a.chips)
      setUserData(sortedUser)
    }
  }

  return (
    <Container>
      <h4 className="page_title">Leaderboard</h4>

      <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
        <h6>Sorted By <span className="text-warning">{sortBy}</span></h6>
        <ButtonGroup variant="contained" color="primary" size="small">
          <Button onClick={() => changeSorting("followers")}>Followers</Button>
          <Button onClick={() => changeSorting("chips")}>Chips</Button>
        </ButtonGroup>
      </div>

      <Table responsive="lg" style={{minWidth: "690px"}}>
        <thead className="text-white text-center text-info">
          <tr>
            <th>Rank</th>
            <th>User Profile</th>
            <th>Member Since</th>
            <th>Followers</th>
            <th>Chips</th>
          </tr>
        </thead>
        
        <tbody className="text-white text-center">
          {
            userData.map((user, idx) =>
              <tr key={user._id}>
                <th>{idx + 1}</th>
                <th 
                  style={{ cursor: 'pointer' }}
                  className="d-flex align-items-center"
                  onClick={() => history.push(`/profile/${user._id}`)}
                >
                  <Avatar
                    alt={user?.fullname}
                    src={user.profileImg}
                  />
                  <p className="mb-0 ml-3">{user.fullname}</p>
                </th>
                <th>{moment(user.joiningDate).format('DD MMMM YYYY')}</th>
                <th>{user.followers.length}</th>
                <th>{user.chips}</th>
              </tr>
            )
          }
        </tbody>
      </Table>
    </Container>
  );
};

export default LeaderBoard;