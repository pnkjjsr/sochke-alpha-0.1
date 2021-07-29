import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { TwitterTimelineEmbed } from "react-twitter-embed";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import s from "@pages/neta/neta.module.scss";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function RenderYtThumb(props) {
  let arr = props.data;

  return arr.map((item, i) => {
    let thumbUrl = item.snippet.thumbnails;
    let title = item.snippet.title;
    let description = item.snippet.description;

    return (
      <Card key={i}>
        <figure>
          <picture>
            <source media="(min-width:768px)" srcSet={thumbUrl.high.url} />
            <source media="(min-width:568px)" srcSet={thumbUrl.medium.url} />
            <img src={thumbUrl.medium.url} alt={title} title={title} />
          </picture>
        </figure>

        <CardContent>
          <h3>{title}</h3>
          <p>{description}</p>
        </CardContent>
      </Card>
    );
  });
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function SocialTabs(props) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={s.social}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Latest Video" {...a11yProps(0)} />
        <Tab label="Latest Tweets" {...a11yProps(1)} />
      </Tabs>

      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div className={s.thumbs}>
            {props.youtube.error ? (
              <p>Not available yet!</p>
            ) : (
              <RenderYtThumb data={props.youtube} />
            )}
          </div>
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          {!props.twitter ? (
            <p>Not available yet!</p>
          ) : (
            <TwitterTimelineEmbed
              sourceType="timeline"
              screenName={props.twitter}
              options={{ height: 600, tweetLimit: 3 }}
              noHeader
              noFooter
            />
          )}
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
