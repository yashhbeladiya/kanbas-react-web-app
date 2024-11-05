import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/Assignment/reducer";
import enrollmentReducer from "./reducer";
const store = configureStore({
  reducer: {
    modulesReducer, accountReducer, assignmentReducer, enrollmentReducer,
  },
});
export default store;