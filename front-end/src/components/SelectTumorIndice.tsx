/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FC } from "react";
import { usePatient } from "../hooks";

export const SelectTumorIndice: FC = () => {
  const { patient, tumorIndiceHandleChange } = usePatient();
  const { tumorIndices, tumorIndice } = patient;
  if (!tumorIndices) return null;
  return (
    <FormControl
      css={css`
        width: 300px;
      `}
    >
      <InputLabel>Please select a tumor indice</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={tumorIndice || ""}
        label="Age"
        onChange={tumorIndiceHandleChange}
      >
        {tumorIndices.map((indice) => (
          <MenuItem key={indice} value={indice}>
            {indice}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
