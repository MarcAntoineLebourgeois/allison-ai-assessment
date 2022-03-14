import { Button } from "@mui/material";
import { FC } from "react";
import { usePatient } from "../hooks";

export const ResetButton: FC = () => (
  <Button variant="contained" onClick={usePatient().onReset}>
    Reset all settings
  </Button>
);
