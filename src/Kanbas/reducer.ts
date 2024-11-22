import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [],
};

const courseSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        setEnrollments: (state, { payload: enrollments }) => {
            state.enrollments = enrollments;
        },
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

export const { enrolledCourse, unenrolledCourse, setEnrollments } = courseSlice.actions;
export default courseSlice.reducer;