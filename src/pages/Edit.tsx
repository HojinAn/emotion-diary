import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";
import { DiaryInfo } from "../types/DiaryInfo";

const Edit = () => {
  const [originData, setOriginData] = useState<DiaryInfo>();
  const navigate = useNavigate();
  const { id } = useParams();

  const diaryList = useContext(DiaryStateContext);
  useEffect(() => {
    if (diaryList.length >= 1 && id) {
      const targetDiary = diaryList.find((it) => it.id === parseInt(id));
      targetDiary
        ? setOriginData(targetDiary)
        : navigate("/", { replace: true });
    }
  }, [id, diaryList]);
  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
