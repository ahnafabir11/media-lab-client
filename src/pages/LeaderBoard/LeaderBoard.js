import './LeaderBoard.css';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Table } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Avatar } from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  leaderBoardBtn: {
    backgroundColor: '#00A3FF',
    color: "#fff",
    fontWeight: 500,
    "&:hover": {
      backgroundColor: '#0087d3'
    }
  }
})

const LeaderBoard = () => {
  const classes = useStyles()
  const history = useHistory()
  const [userData, setUserData] = useState([])
  const [sortBy, setSortBy] = useState("Followers")

  useEffect(() => {
    fetch(`http://localhost:5000/api/users`)
      .then(res => res.json())
      .then(data => {
        const sortedUser = data.sort((a, b)=> {
          return b.followers.length - a.followers.length
        })
        setUserData(sortedUser)
      })
  }, [])

  const changeSorting = (sortedBy) => {
    if (sortedBy === "Followers") {
      setSortBy("Followers")
      fetch(`http://localhost:5000/api/users`)
        .then(res => res.json())
        .then(data => {
          const sortedUser = data.sort((a, b) => {
            return b.followers.length - a.followers.length
          })
          setUserData(sortedUser)
        })
    } else if( sortedBy === "Chips") {
      setSortBy("Chips")
      fetch(`http://localhost:5000/api/users`)
        .then(res => res.json())
        .then(data => {
          const sortedUser = data.sort((a, b) => {
            return b.chips - a.chips
          })
          setUserData(sortedUser)
        })
    }
  }

  return (
    <Container>
      <h4 className="page_title">Leaderboard</h4>
      
      <div className="d-flex flex-row-reverse mb-3">
        <ButtonGroup variant="contained" color="primary">
          <Button className={classes.leaderBoardBtn} onClick={()=> changeSorting("Followers")}>Followers</Button>
          <Button className={classes.leaderBoardBtn} onClick={() => changeSorting("Chips")}>Chips</Button>
        </ButtonGroup>
      </div>

      <div>
        <Table responsive="lg">
          <thead className="text-white text-center text-info">
            <tr>
              <th>Rank</th>
              <th>User Profile</th>
              <th>Member Since</th>
              <th>{sortBy}</th>
            </tr>
          </thead>
          <tbody className="text-white text-center">
            {
              userData.map((user, idx) => 
                <tr key={user._id}>
                  <th>{idx + 1}</th>
                  <th className="d-flex align-items-center">
                    <Avatar
                      alt={user?.fullname}
                      src={`data:image/png;base64,${user.profileImg?.img}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => history.push(`/profile/${user._id}`)}
                    />
                    <p className="mb-0 ml-3">{user.fullname}</p>
                  </th>
                  <th>{moment(user.joiningDate).format('DD MMMM YYYY')}</th>
                  {sortBy === "Followers" && <th>{user.followers.length}</th>}
                  {sortBy === "Chips" && <th>{user.chips}</th>}
                </tr>
              )
            }
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default LeaderBoard;