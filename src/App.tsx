import React from "react";
import { HashRouter} from "react-router-dom";
import Labs from "./Labs";
export default function App() {
  return (
    <HashRouter>
      <div>
        <Labs />
      </div >
    </HashRouter>
  );
}