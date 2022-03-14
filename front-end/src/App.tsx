import { Typography } from "@mui/material";
import {
  ResetButton,
  ResultImage,
  SelectPatientId,
  SelectTumorIndice,
  PatientImage,
  SubmitButton,
} from "./components";

import { Layout } from "./components/Layout";
import { PatientProvider } from "./context";

const App = () => (
  <Layout>
    <PatientProvider>
      <Typography variant="h4">Allison-AI-assessment</Typography>
      <SelectPatientId />
      <SelectTumorIndice />
      <PatientImage />
      <SubmitButton />
      <ResetButton />
      <ResultImage />
    </PatientProvider>
  </Layout>
);

export default App;
