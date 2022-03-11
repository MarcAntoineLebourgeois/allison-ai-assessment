/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { getTumorIndices } from "../helpers";
import { SelectTumorIndice } from "./SelectTumorIndice";

export const SelectPatientId: FC = () => {
  const [patientId, setPatientId] = useState<string | null>();
  const handleChange = (event: SelectChangeEvent<string>) =>
    setPatientId(event.target.value as string);
  const [tumorIndices, setTumorIndices] = useState<string[]>([]);
  useEffect(() => {
    if (patientId)
      getTumorIndices(patientId).then((tumorIndices) =>
        setTumorIndices(tumorIndices)
      );
  }, [patientId]);

  return (
    <>
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
          onChange={handleChange}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
      <SelectTumorIndice tumorIndices={tumorIndices} />
    </>
  );
};
