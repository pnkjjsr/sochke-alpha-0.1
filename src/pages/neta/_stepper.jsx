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

import s from "./neta.module.scss";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: [
      "Completed the country’s largest Sardar Sarovar Dam, which was stuck for 65 years due to the construction of Iron Man Patel",
      "Built the country’s longest Bhupendra Hazarika bridge 9.15km which the previous government had stopped due to fear of China",
      "Built the country’s longest Chanani-Nowshera tunnel which was stuck by the previous government",
      "World’s highest railway bridge built on river Chenab whose work was stopped in 2008",
      "One rank one pension given to the army, which the previous government was cheating for 45 years",
    ],
  },
  {
    label: [
      "The route of metro train was 250 km in 2014, now it is 650 km in 2019, Modi government completed the route of 400 km in 5 years",
      "Modi government completed the country’s first 14-lane highway Delhi-Meerut Express in just 1 year in 4 months",
      "The country’s first waterway was built in the Ganges river (between Benares to Haldia), it also started in four years.",
      "Completed the construction of the longest extra-dosed bridge in the country on river Narmada in Bharuch district",
      "75 MW of Mirzapur, the country’s largest solar plant, was completed in UP",
    ],
  },
  {
    label: [
      "Sardar Patel, the world’s most appropriate statue Statue of Unit, was completed in a timely manner",
      "Electricity was 70% in rural town village, now 95% in 2014",
      "Launched the country’s largest gas distribution scheme 400 districts are connected to the network",
      "GPG gas has been given to rural poor women under Ujjwala scheme so far more than 6 crore people have availed",
      "Generics (Jan Aushadhi) medicine center was only 80 till 2014, now it is more than 5000, here, 70% cheaper medicine is available, Heart rate is reduced by 80%",
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
