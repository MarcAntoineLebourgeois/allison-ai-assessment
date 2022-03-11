/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type Props = {
  tumorIndices: string[];
};

export const SelectTumorIndice: FC<Props> = ({ tumorIndices }) => {
  const [tumorIndice, setTumorIndice] = useState<string | null>();
  const handleChange = (event: SelectChangeEvent<string>) =>
    setTumorIndice(event.target.value as string);

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
};
