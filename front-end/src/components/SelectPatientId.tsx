/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { usePatient } from "../hooks";

export const SelectPatientId: FC = () => {
  const {
    patient: { patientId },
    patientIdHandleChange,
  } = usePatient();
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
        value={patientId || ""}
        label="Age"
        onChange={patientIdHandleChange}
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
