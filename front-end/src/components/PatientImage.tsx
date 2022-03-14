import { Typography } from "@mui/material";
import { FC } from "react";
import { usePatient } from "../hooks";

export const PatientImage: FC = () => {
  const { patient, onMouseClick, points } = usePatient();
  const { image } = patient;
  if (!image) return null;
  return (
    <>
      <Typography variant="h6">
        Click on the image below to add points in order to form a contour
      </Typography>
      <img src={image} onClick={onMouseClick} />
      {points.map((point, key) => (
        <Typography variant="subtitle2" key={key}>
          x: {point[1]}, y: {point[0]}
        </Typography>
      ))}
    </>
  );
};
