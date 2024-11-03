import React from "react";
import store from "./Kanbas/store";
import { Provider } from "react-redux";
import { HashRouter, Navigate, Route, Routes} from "react-router-dom";
import Labs from "./Labs";
import Kanbas from "./Kanbas";
export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
      <div>
        <Routes>
        <Route path="/" element={<Navigate to="Kanbas"/>}/>
          <Route path="/Kanbas/*" element={<Kanbas />} />
          <Route path="/Labs/*" element={<Labs />} />
        </Routes>
      </div >
      </Provider>
    </HashRouter>
  );
}