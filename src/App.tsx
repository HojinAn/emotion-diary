import React, { useEffect, useReducer, useRef } from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

// COMPONENTS
import { DiaryInfo } from "./types/DiaryInfo";

type Action =
  | {
      type: "INIT";
      data: DiaryInfo[];
    }
  | {
      type: "CREATE" | "EDIT";
      data: DiaryInfo;
    }
  | { type: "REMOVE"; targetId: number };

const reducer = (state: DiaryInfo[], action: Action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

interface ContextProps {
  onCreate: Function;
  onRemove: Function;
  onEdit: Function;
}

export const DiaryStateContext = React.createContext<DiaryInfo[]>([]);
export const DiaryDispatchContext = React.createContext<ContextProps>(
  {} as ContextProps
);

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      const diaryList: DiaryInfo[] = JSON.parse(localData).sort(
        (a: DiaryInfo, b: DiaryInfo) => b.id - a.id
      );
      dataId.current = diaryList[0].id + 1;

      dispatch({ type: "INIT", data: diaryList });
    }
  }, []);

  const dataId = useRef(0); // dummy data가 5개 있으므로 6부터 시작해야함
  // CREATE
  const onCreate = (date: Date, content: string, emotion: number) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  // REMOVE
  const onRemove = (targetId: number) => {
    dispatch({ type: "REMOVE", targetId });
  };
  // EDIT
  const onEdit = (
    targetId: number,
    date: Date,
    content: string,
    emotion: number
  ) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
