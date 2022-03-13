/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SelectPatientId, SelectTumorIndice } from "./components";
import { getHeaders, getTumorIndices } from "./helpers";
import { data } from "./data";
import { backEndHost } from "./config";
import ResultImage from "./images/results.png";

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

  type Point = [number, number];

  const [points, setPoints] = useState<Point[]>([]);
  const onMouseClick = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) =>
    setPoints((previousValue) => [
      ...previousValue,
      [event.nativeEvent.offsetY, event.nativeEvent.offsetX],
    ]);

  const onSubmit = (): Promise<void> =>
    fetch(`${backEndHost}add_point_coordinates/${patientId}/${tumorIndice}`, {
      method: "POST",
      mode: "cors",
      headers: getHeaders(),
      body: JSON.stringify({ points }),
    })
      .then((response) => response.json())
      .catch((error) => {
        throw new Error(error);
      });

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
      {image && <img src={image} onClick={onMouseClick} />}
      {tumorIndice && (
        <Button variant="contained" onClick={onSubmit}>
          Click to submit your points
        </Button>
      )}
      {tumorIndice && points.length !== 0 && <img src={ResultImage} />}
    </div>
  );
};

export default App;
