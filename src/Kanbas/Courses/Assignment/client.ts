import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENT_API = `${REMOTE_SERVER}/api/courses/:courseId/assignments`;

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axios.delete(`${ASSIGNMENT_API}/${assignmentId}`);
  return response.data;
}

export const updateAssignment = async (assignment: any) => {
  const response = await axios.put(`${ASSIGNMENT_API}/${assignment._id}`, assignment);
  return response.data;
}