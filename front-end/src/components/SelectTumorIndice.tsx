/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type Props = {
  tumorIndices: string[];
  handleChange(event: SelectChangeEvent<string>): void;
  tumorIndice?: string | null;
};

export const SelectTumorIndice: FC<Props> = ({
  tumorIndices,
  tumorIndice,
  handleChange,
}) => (
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
      onChange={handleChange}
    >
      {tumorIndices.map((indice) => (
        <MenuItem key={indice} value={indice}>
          {indice}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
