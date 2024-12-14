import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";

const Occupations = () => {
  return (
    <FormControl component="fieldset" fullWidth margin="normal">
      <FormLabel component="legend">What field are you learning for?</FormLabel>
      <RadioGroup>
        <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              value="software-development"
              control={<Radio />}
              label="Software Development"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              value="data-analytics"
              control={<Radio />}
              label="Data & Analytics"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              value="information-technology"
              control={<Radio />}
              label="Information Technology"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              value="marketing"
              control={<Radio />}
              label="Marketing"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              value="design"
              control={<Radio />}
              label="Design"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              value="finance-accounting"
              control={<Radio />}
              label="Finance & Accounting"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              value="product-project-management"
              control={<Radio />}
              label="Product & Project Management"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              value="business-operations"
              control={<Radio />}
              label="Business Operations"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              value="sales-business-development"
              control={<Radio />}
              label="Sales & Business Development"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              value="human-resources"
              control={<Radio />}
              label="Human Resources"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              value="education-training"
              control={<Radio />}
              label="Education & Training"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              value="customer-support"
              control={<Radio />}
              label="Customer Support"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              value="health-wellness"
              control={<Radio />}
              label="Health & Wellness"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              value="writing"
              control={<Radio />}
              label="Writing"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel value="legal" control={<Radio />} label="Legal" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel value="art" control={<Radio />} label="Art" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              value="none"
              control={<Radio />}
              label="None of the above"
            />
          </Grid>
        </Grid>
      </RadioGroup>
    </FormControl>
  );
};

export default Occupations;
