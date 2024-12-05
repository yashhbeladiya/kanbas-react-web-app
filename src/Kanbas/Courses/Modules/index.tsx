import React, { useState, useEffect } from "react";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import { addModule, editModule, updateModule, deleteModule, setModules }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as courseClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await courseClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(module));
    setModuleName("");
    console.log("Created module", module);
  };

  const fetchModules = async () => {
    const modules = await courseClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const removeModule = async (moduleId: string) => {
    console.log("Removing module", moduleId);
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  }
  
  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule({ ...module, editing: false }));
  };

  return (
    <div className="me-4">
      {currentUser?.role === "FACULTY" && (
      <ModulesControls moduleName={moduleName} setModuleName={setModuleName}
        addModule={createModuleForCourse} />
      )}
      <button id="wd-collapse-all" className="btn btn-lg btn-secondary me-1 float-end">
        Collapse All
      </button>
      <br />
      <br />
      <ul id="wd-modules" className="list-group rounded-0 mt-5 me-2">
        {modules
          .map((module: any) => (
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                {module.editing && (
                  <input
                    className="form-control w-50 d-inline-block"
                    onChange={(e) =>
                      dispatch(updateModule({ ...module, name: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveModule(module);
                      }
                    }}
                    defaultValue={module.name}
                  />
                )}

                {currentUser?.role === "FACULTY" && (
                <ModuleControlButtons moduleId={module._id}
                  deleteModule={(moduleId) => {
                    removeModule(moduleId);
                  }}
                  editModule={(moduleId) => dispatch(editModule(moduleId))} />
                )}
              </div>
              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <li className="wd-lesson list-group-item p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                      {currentUser?.role === "FACULTY" && (
                      <LessonControlButtons />
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
