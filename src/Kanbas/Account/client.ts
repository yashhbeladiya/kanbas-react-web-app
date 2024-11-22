import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
axios.defaults.withCredentials = true;

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const signin = async (credentials: any) => {
  try {
    const response = await axiosWithCredentials.post(
      `${USERS_API}/signin`,
      credentials
    );
    console.log(response);
    return response.data;
  } catch (error) {
    // printing error message to the console
    if (axios.isAxiosError(error)) {
        console.error("Axios error details:", {
          message: error.message,
          code: error.code,
          config: error.config,
          request: error.request,
          response: error.response,
        });
      } else {
        console.error("Non-Axios error:", error);
      }
      return;
  }
};

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return response.data;
};

export const profile = async () => {
  try {
    console.log("Making profile request to:", `${USERS_API}/profile`);
    const response = await axiosWithCredentials.get(`${USERS_API}/profile`);
    console.log("Profile API response:", response);
    return response.data;
  } catch (error) {
    console.log("Error fetching profile:", error);
    return null;
  }
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

export const findMyCourses = async (userId: string) => {
  console.log("Fetching courses for user", userId);
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/${userId}/courses`
  );
  console.log(data);
  return data;
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};

// export const enrolledCourse = async (enrollment: any) => {
//   const { data } = await axiosWithCredentials.post(
//     `${USERS_API}/current/courses`,
//     enrollment
//   );
//   return data;
// }

// export const unenrolledCourse = async (enrollmentId: string) => {
//   const { data } = await axiosWithCredentials.delete(
//     `${USERS_API}/current/courses/${enrollmentId}`
//   );
//   return data;
// }

// export const findEnrollmentsForUser = async (userId: string) => {
//   const { data } = await axiosWithCredentials.get(
//     `${USERS_API}/${userId}/courses`
//   );
//   return data;
// }

// export const findAllEnrollments = async () => {
//   const { data } = await axiosWithCredentials.get(`${USERS_API}/enrollments`);
//   return data;
// }