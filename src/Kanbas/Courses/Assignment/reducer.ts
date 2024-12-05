import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [],
};

const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => { 
      state.assignments = action.payload; 
    },

    addAssignment: (state, { payload: assignment }) => {
      const newAssignment = {
        _id: assignment._id,
        title: assignment.title,
        course: assignment.course,
        description: assignment.description,
        due: assignment.due,
        points: assignment.points,
        availableDate: assignment.available,
        availableUntil: assignment.availableUntil,
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      ) as any;
    },
    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      ) as any;
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
  setAssignments,
} = assignmentSlice.actions;
export default assignmentSlice.reducer;