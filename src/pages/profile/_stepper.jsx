import React from "react";
import { useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import s from "./profile.module.scss";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: [
      "1 All farmers covered under the PM Kisan Yojana",
      "Ensuring pension to farmers, laborers, shopkeepers",
      "Ministry of Jal Shakti constituted to end silos on important subject like water",
      "Special fund of Rs. 25,000 crore for completing housing projects for the middle class",
      "Regularising unauthorized colonies which benefits 40 lakh people of Delhi",
    ],
  },
  {
    label: [
      "2 All farmers covered under the PM Kisan Yojana",
      "Ensuring pension to farmers, laborers, shopkeepers",
      "Ministry of Jal Shakti constituted to end silos on important subject like water",
      "Special fund of Rs. 25,000 crore for completing housing projects for the middle class",
      "Regularising unauthorized colonies which benefits 40 lakh people of Delhi",
    ],
  },
  {
    label: [
      "3 All farmers covered under the PM Kisan Yojana",
      "Ensuring pension to farmers, laborers, shopkeepers",
      "Ministry of Jal Shakti constituted to end silos on important subject like water",
      "Special fund of Rs. 25,000 crore for completing housing projects for the middle class",
      "Regularising unauthorized colonies which benefits 40 lakh people of Delhi",
    ],
  },
  {
    label: [
      "4 All farmers covered under the PM Kisan Yojana",
      "Ensuring pension to farmers, laborers, shopkeepers",
      "Ministry of Jal Shakti constituted to end silos on important subject like water",
      "Special fund of Rs. 25,000 crore for completing housing projects for the middle class",
      "Regularising unauthorized colonies which benefits 40 lakh people of Delhi",
    ],
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Paper square elevation={0}>
                <ul className={s.list}>
                  {step.label.map((li, i) => (
                    <li key={i}>
                      <ArrowRightAltIcon />
                      {li}
                    </li>
                  ))}
                </ul>
              </Paper>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </>
  );
}

export default SwipeableTextMobileStepper;
