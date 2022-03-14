import { useContext } from "react";

import { PatientContext } from "../context";
import { PatientManager } from "../types";

export const usePatient = (): PatientManager => {
  const manager = useContext(PatientContext);
  if (!manager) throw new Error("usePatient must be nested in PatientProvider");
  return manager;
};
