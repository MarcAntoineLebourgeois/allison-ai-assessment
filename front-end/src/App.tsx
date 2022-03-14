import { Typography } from "@mui/material";
import {
  ResetButton,
  ResultImage,
  SelectPatientId,
  SelectTumorIndice,
} from "./components";

import { Layout } from "./components/Layout";
import { PatientImage } from "./components/PatientImage";
import { SubmitButton } from "./components/SubmitButton";
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
