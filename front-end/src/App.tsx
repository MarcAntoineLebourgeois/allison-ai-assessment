/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SelectPatientId, SelectTumorIndice } from "./components";
import { getTumorIndices } from "./helpers";
import image from "./images/TCGA_CS_4941_19960909_1.png";

const App = () => {
  const [tumorImage, setTumorImage] = useState<string>();
  const [patientId, setPatientId] = useState<string | null>();
  const handleChange = (event: SelectChangeEvent<string>) =>
    setPatientId(event.target.value as string);
  const [tumorIndices, setTumorIndices] = useState<string[] | null>();
  const [tumorIndice, setTumorIndice] = useState<string>();
  const tumorIdHandleChange = (event: SelectChangeEvent<string>) =>
    setTumorIndice(event.target.value as string);
  useEffect(() => {
    if (patientId)
      getTumorIndices(patientId).then((tumorIndices) =>
        setTumorIndices(tumorIndices)
      );
  }, [patientId]);
  useEffect(() => {
    if (tumorIndice)
      setTumorImage("../../data/images/TCGA_CS_4941_19960909_1.jpg");
  }, [tumorIndice]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <Typography variant="h4">Allison-AI-assessment</Typography>
      <SelectPatientId patientId={patientId} handleChange={handleChange} />
      {tumorIndices && (
        <SelectTumorIndice
          tumorIndices={tumorIndices}
          tumorIndice={tumorIndice}
          handleChange={tumorIdHandleChange}
        />
      )}
      {tumorImage && <img src={image} />}
    </div>
  );
};

export default App;
