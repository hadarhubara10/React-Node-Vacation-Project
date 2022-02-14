import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { useNavigate } from 'react-router';
import ShareModal from './ShareModal';
import {
  followVacations,
  getVacations,
  removeFollowVacation,
} from '../services/vacations.service.js';
import { useDispatch } from 'react-redux';
import { setVacations } from '../redux/actions/vacationAction';

export default function VacationCard({
  vacation,
  userData,
  onFollowSuccess,
  onUnFollowSuccess,
}) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const ReadMore = () => {
    navigate(`VacationDetailes/${vacation._id}`);
  };
  const handleClickFollow = (vacationID) => {
    if (!vacation.followersID.includes(userData._id)) {
      followVacations(vacationID, userData._id)
        .then((res) => {
          // console.log(res.data);
          getVacations().then((res) => {
            // console.log(res.data);
            dispatch(setVacations(res.data));
          });
          onFollowSuccess();
        })
        .catch((err) => {
          // console.log(err);
        });
    } else {
      removeFollowVacation(vacationID, userData._id)
        .then((res) => {
          // console.log(res.data);
          getVacations().then((res) => {
            dispatch(setVacations(res.data));
            onUnFollowSuccess();
          });
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  };
  return (
    <Card>
      <CardHeader title={vacation.location} subheader={vacation.date} />
      <CardMedia
        component="img"
        height="194"
        image={vacation.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {vacation.description}
        </Typography>
        {vacation.price.toLocaleString()}$
      </CardContent>
      <CardActions disableSpacing>
        {/*  */}
        {!vacation.followersID.includes(userData._id) ? (
          <IconButton
            onClick={() => handleClickFollow(vacation._id)}
            aria-label="add to favorites"
            size="small"
          >
            Follow &nbsp; <FavoriteBorderIcon size="small" />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => handleClickFollow(vacation._id)}
            aria-label="add to favorites"
            size="small"
          >
            UnFollow &nbsp; <FavoriteIcon size="small" />
          </IconButton>
        )}
        {/*  */}
        <ShareModal vacation={vacation} />

        {/* Need To Complete */}
        <IconButton
          size="small"
          onClick={ReadMore}
          aria-label="Read More"
          style={{ marginLeft: 'auto', borderRadius: 0 }}
        >
          Read More <ReadMoreIcon size="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
