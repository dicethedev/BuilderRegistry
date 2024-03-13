import { uploadFileToFirebase } from "./types/firebase";
import { uploadFileToLocal } from "./types/local";

const selectedSerive = process.env.GOOGLE_APPLICATION_CREDENTIALS ? "firebase" : "local";

export const uploadFile = selectedSerive === "firebase" ? uploadFileToFirebase : uploadFileToLocal;
