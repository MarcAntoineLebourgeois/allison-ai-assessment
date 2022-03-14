import { FC } from "react";
import { usePatient } from "../hooks";
import image from "../images/results.png";

export const ResultImage: FC = () =>
  usePatient().isResultVisible ? <img src={image} /> : null;
