import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PersonIcon from "@material-ui/icons/Person";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import Banner from "@sections/setting/_banner";
import Photo from "@sections/setting/_photo";
import SettingAccordian from "@sections/setting/_accordian";
import LeaderType from "@sections/setting/_leaderType";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SettingTabs(props) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="Setting Tab">
          <Tab
            icon={<SupervisorAccountIcon />}
            label="Citizen Profile"
            {...a11yProps(0)}
          />
          <Tab icon={<PersonIcon />} label="Leader Profile" {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <p>
          As a citizen you can update your profile here!{" "}
          <Link href={`citizen/${props.data.userName}`}>
            <a>View your public profile</a>
          </Link>
        </p>

        <Banner data={props.data.bannerUrl} />
        <Photo data={props.data.photoURL} />
        <SettingAccordian data={props.data} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <p>
          As a leader you can update your work for society and be seen to world.
        </p>
        <LeaderType data={props.data} />
      </TabPanel>
    </>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
