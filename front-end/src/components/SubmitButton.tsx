import { Button } from "@mui/material";
import { FC } from "react";
import { usePatient } from "../hooks";

export const SubmitButton: FC = () => {
  const { patient, onSubmit } = usePatient();
  if (!patient.tumorIndice) return null;
  return (
    <Button variant="contained" onClick={onSubmit}>
      Click to submit your points
    </Button>
  );
};
