import { FC } from "react";
import { usePatientManager } from "../hooks";
import { PatientContext } from "./PatientContext";

export const PatientProvider: FC = ({ children }) => (
  <PatientContext.Provider value={usePatientManager()}>
    {children}
  </PatientContext.Provider>
);
