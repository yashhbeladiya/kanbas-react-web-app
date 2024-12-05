import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/enrollments`;

export const fetchAllEnrollments = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const enrolledCourse = async (enrollment: any) => {
  const response = await axios.post(COURSES_API, enrollment);
  return response.data;
};

export const unenrolledCourse = async (id: string) => {
  const response = await axios.delete(`${COURSES_API}/${id}`);
  return response.data;
};
