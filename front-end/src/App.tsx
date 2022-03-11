/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SelectPatientId, SelectTumorIndice } from "./components";
import { getTumorIndices } from "./helpers";
import { data } from "./data";

const App = () => {
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

  const [image, setImage] = useState();

  useEffect(() => {
    if (tumorIndice && patientId) {
      const imageName = `${
        data[parseInt(patientId) - 1].patientId
      }_${tumorIndice}`;
      const fetchImage = async () => {
        const response = await import(`./images/${imageName}.png`);
        setImage(response.default);
      };
      fetchImage();
    }
  }, [tumorIdHandleChange]);

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
      {image && <img src={image} />}
    </div>
  );
};

export default App;
