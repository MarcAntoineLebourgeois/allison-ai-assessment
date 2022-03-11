/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export const SelectPatientId = () => {
  const [patientId, setPatientId] = useState("");
  const handleChange = (event: SelectChangeEvent<string>) =>
    setPatientId(event.target.value as string);

  return (
    <FormControl
      css={css`
        width: 300px;
      `}
    >
      <InputLabel>Please select a patient id</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={patientId}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
      </Select>
    </FormControl>
  );
};
