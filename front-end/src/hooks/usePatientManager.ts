import { useEffect, useState } from "react";
import { getHeaders, getTumorIndices } from "../helpers";
import { data } from "../data";
import { Patient, PatientManager, Point } from "../types";
import { backEndHost } from "../config";

const defaultState: Patient = {
  patientId: "",
  tumorIndices: [],
  tumorIndice: "",
  image: "",
};

export const usePatientManager = (): PatientManager => {
  const [patient, setPatient] = useState(defaultState);
  const [points, setPoints] = useState<Point[]>([]);
  const [isResultVisible, setIsResultVisible] = useState(false);

  const patientIdHandleChange: PatientManager["patientIdHandleChange"] = (
    event
  ) =>
    setPatient((previousState) => ({
      ...previousState,
      patientId: event.target.value,
      tumorIndices: [],
      image: "",
    }));

  const tumorIndiceHandleChange: PatientManager["tumorIndiceHandleChange"] = (
    event
  ) =>
    setPatient((previousState) => ({
      ...previousState,
      tumorIndice: event.target.value,
    }));

  const onSubmit: PatientManager["onSubmit"] = () =>
    fetch(
      `${backEndHost}add_point_coordinates/${patient.patientId}/${patient.tumorIndice}`,
      {
        method: "POST",
        mode: "cors",
        headers: getHeaders(),
        body: JSON.stringify({ points }),
      }
    )
      .then(() => setIsResultVisible(true))
      .catch((error) => {
        throw new Error(error);
      });

  const onReset: PatientManager["onReset"] = () => {
    setPatient(defaultState);
    setPoints([]);
    setIsResultVisible(false);
  };

  const onMouseClick: PatientManager["onMouseClick"] = (event) =>
    setPoints((previousValue) => [
      ...previousValue,
      [event.nativeEvent.offsetY, event.nativeEvent.offsetX],
    ]);

  useEffect(() => {
    if (patient.patientId)
      getTumorIndices(patient.patientId).then((tumorIndices) =>
        setPatient((previousState) => ({ ...previousState, tumorIndices }))
      );
  }, [patient.patientId]);

  useEffect(() => {
    const { tumorIndice, patientId, image } = patient;
    if (tumorIndice && patientId && image === "") {
      const imageName = `${
        data[parseInt(patientId) - 1].patientId
      }_${tumorIndice}`;
      const fetchImage = async () => {
        const response = await import(`../images/${imageName}.png`);
        setPatient((previousState) => ({
          ...previousState,
          image: response.default,
        }));
      };
      fetchImage();
    }
  }, [tumorIndiceHandleChange]);

  return {
    patient,
    setPatient,
    points,
    setPoints,
    isResultVisible,
    setIsResultVisible,
    patientIdHandleChange,
    tumorIndiceHandleChange,
    onMouseClick,
    onSubmit,
    onReset,
  };
};
