import axios from "axios";
import { toast } from "react-toastify";
export const setHeaders = (token) => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const setAcademicYearHeaders = (academicYear) => {
  if (academicYear) {
    axios.defaults.headers.common["ACADEMIC_YEAR"] = academicYear;
  } else {
    delete axios.defaults.headers.common["ACADEMIC_YEAR"];
  }
};

export const interceptor = () => {
  axios.interceptors.response.use(
    async (response) => {
      const message = await response.data.message;
      return response;
    },
    async (error) => {
      const message = error?.response?.data?.message;
      console.error(message);
      return Promise.reject(error);
    }
  );
};

export default setHeaders;
