import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ReviewsTable from './ReviewsTable.js';
import { isDevelopment } from '../../DevelopmentOnly';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

class ReviewerDetails extends Component {

  state = {
    value: 0,
  }

  setValue(val){
    this.setState({value: val})
  }


  handleChange = (event, newValue) => {
    this.setValue(newValue);
  };

  render(){

    return (
      <div>
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
            <Tab label="Reviews" {...a11yProps(0)} />
            {isDevelopment()?<Tab label="Papers" {...a11yProps(1)} />:null}
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <ReviewsTable data={this.props.data}/>
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          A table containing the papers of the reviewer will be displayed here
        </TabPanel>
      </div>
    );
  }
}

export default ReviewerDetails
