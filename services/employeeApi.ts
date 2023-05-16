import { Employe, IRecogData, IRecogResponse } from "../interfaces";

const url = "https://rekognition.carloscb.com/api";

export const fetchEmployees = async (): Promise<Employe[]> => {
  return fetch(`${url}/employee`)
    .then((res) => res.json())
    .then((res) => (res.status === "ok" ? res.data : []))
    .catch((err) => {
      console.log(err);
      return [];
    });
};

export const saveEmployee = async (
  formData: FormData
): Promise<Employe | null> => {
  return fetch(`${url}/employee`, {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => res.json())
    .then((res) => (res.status === "ok" ? res.data : null))
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const deleteEmployee = async (id: string): Promise<Employe | null> => {
  return fetch(`${url}/employee/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => (res.status === "ok" ? res.data : null))
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const getSimilarity = async (
  formData: FormData
): Promise<IRecogData | null> => {
  return fetch(`${url}/recog`, {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => res.json())
    .then((res: IRecogResponse) => (res.status === "ok" ? res.data : null))
    .catch((err) => {
      console.log(err);
      return null;
    });
};
