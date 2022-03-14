import { SelectChangeEvent } from "@mui/material";
import { Patient } from "./Patient";
import { Point } from "./Point";

export type PatientManager = {
  patient: Patient;
  setPatient(patient: React.SetStateAction<Patient>): void;
  points: Point[];
  setPoints(points: Point[]): void;
  isResultVisible: boolean;
  setIsResultVisible(isResultVisible: boolean): void;
  patientIdHandleChange(event: SelectChangeEvent<string>): void;
  tumorIndiceHandleChange(event: SelectChangeEvent<string>): void;
  onMouseClick(event: React.MouseEvent<HTMLImageElement, MouseEvent>): void;
  onSubmit(): Promise<void>;
  onReset(): void;
};
