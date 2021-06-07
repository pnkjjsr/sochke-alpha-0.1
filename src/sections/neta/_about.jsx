import React, { Component } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import s from "@pages/neta/neta.module.scss";

export default class About extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className={s.about}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <b>{data.title}</b> (Short about)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{data.para}</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}
