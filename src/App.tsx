import React from "react";
import store from "./Kanbas/store";
import { Provider } from "react-redux";
import { HashRouter, Navigate, Route, Routes} from "react-router-dom";
import Labs from "./Labs";
import Kanbas from "./Kanbas";
import { Toaster } from "react-hot-toast";
export default function App() {
  return (
    <HashRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
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