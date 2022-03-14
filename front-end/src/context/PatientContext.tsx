import { createContext } from "react";

import { PatientManager } from "../types";

export const PatientContext = createContext<PatientManager | null>(null);
