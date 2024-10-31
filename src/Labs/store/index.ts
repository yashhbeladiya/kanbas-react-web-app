import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "../Lab4/ReduxExample/HelloRedux/helloReducer"
import counterReducer from "../Lab4/ReduxExample/CounterRedux/counterReducer";
import addReducer from "../Lab4/ReduxExample/AddRedux/addReducer";
import todosReducer from "../Lab4/ReduxExample/todos/todosReducer";
const store = configureStore({
  reducer: { helloReducer, counterReducer, addReducer, todosReducer},
});
export default store;