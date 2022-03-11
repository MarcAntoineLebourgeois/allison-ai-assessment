import { backEndHost } from "../config";

export const getTumorIndices = (patientId: string): Promise<string[]> =>
  fetch(`${backEndHost}get_tumor_indices_by_patient_index/${patientId}`, {
    method: "GET",
    mode: "cors",
  })
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });
