import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { useNavigate } from 'react-router-dom';
import BarChartIcon from '@mui/icons-material/BarChart';
const SecondaryListItems = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ListSubheader inset>Saved reports</ListSubheader>
      <ListItem button onClick={() => navigate('chart')}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Followers Chart" />
      </ListItem>
    </div>
  );
};
export default SecondaryListItems;
