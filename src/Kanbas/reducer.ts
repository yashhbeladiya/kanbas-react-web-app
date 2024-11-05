import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "./Database";

const initialState = {
  enrollments: enrollments,
};

const courseSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        enrolledCourse: (state, { payload: enrollment}) => {
            const newEnrollment = {
                _id: new Date().getTime().toString(),
                user: enrollment.user,
                course: enrollment.course,
            };
            state.enrollments = [...state.enrollments, newEnrollment] as any;
        },

        unenrolledCourse: (state, { payload: enrollmentID }) => {
            state.enrollments = state.enrollments.filter((enrollment: any) => enrollment._id !== enrollmentID);
        }
    },
});

export const { enrolledCourse, unenrolledCourse } = courseSlice.actions;
export default courseSlice.reducer;