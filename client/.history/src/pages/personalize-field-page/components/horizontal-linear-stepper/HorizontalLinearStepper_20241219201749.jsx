import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Box, Container } from "@mui/material";
import styles from "./HorizontalLinearStepper.module.css";
import SurveyForm from "../survey-form/SurveyForm";
import Occupations from "../occupations-form/Occupations";

export default function HorizontalLinearStepper() {
  const maxSteps = 6;
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const steps = [
    {
      content: <SurveyForm />,
    },
    {
      content: <Occupations />,
    },
  ];

  return (
    <div>
      <nav className={styles.nav}></nav>
      <Box sx={{ maxWidth: "100vw" }}>
        <MobileStepper
          variant="progress"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={styles.MobileStepper}
        />
        <Container sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Box
            component="form"
            sx={{
              width: "100%",
              maxWidth: 600,
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            {steps[activeStep].content}
          </Box>
        </Container>

        <BottomNavigation
          handleBack={handleBack}
          handleNext={handleNext}
          activeStep={activeStep}
          maxSteps={maxSteps}
        />
      </Box>
    </div>
  );
}

const BottomNavigation = ({ handleBack, handleNext, activeStep, maxSteps }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        padding: 2,
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
        Back
      </Button>
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
    </Box>
  );
};
