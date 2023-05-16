export interface IRecogResponse {
  data: IRecogData;
  message: string;
  status: "ok" | "error";
}

export interface IRecogData {
  Face: Face;
  Similarity: number;
  employe: Employe;
}

export interface Face {
  BoundingBox: BoundingBox;
  Confidence: number;
  Landmarks: Landmark[];
  Pose: Pose;
  Quality: Quality;
}

export interface BoundingBox {
  Height: number;
  Left: number;
  Top: number;
  Width: number;
}

export interface Landmark {
  Type: string;
  X: number;
  Y: number;
}

export interface Pose {
  Pitch: number;
  Roll: number;
  Yaw: number;
}

export interface Quality {
  Brightness: number;
  Sharpness: number;
}

export interface Employe {
  _id: string;
  firstName: string;
  lastName: string;
  type: string;
  photo: string;
  created_at: string;
  updated_at: string;
  __v: number;
}
