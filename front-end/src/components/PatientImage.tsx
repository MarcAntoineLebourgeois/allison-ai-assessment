import { FC } from "react";
import { usePatient } from "../hooks";

export const PatientImage: FC = () => {
  const { patient, onMouseClick } = usePatient();
  const { image } = patient;
  if (!image) return null;
  return <img src={image} onClick={onMouseClick} />;
};
