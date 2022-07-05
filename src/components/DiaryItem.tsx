import { useNavigate } from "react-router-dom";

import { DiaryInfo } from "../types/DiaryInfo";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }: DiaryInfo) => {
  const navigate = useNavigate();
  const strDate = new Date(date).toLocaleDateString();
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };
  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          `emotion_img_wrapper`,
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img
          src={`${process.env.PUBLIC_URL}assets/emotion${emotion}.png`}
          alt=""
        />
      </div>
      <div className="info_wrapper" onClick={goDetail}>
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton text={"수정하기"} onClick={goEdit} />
      </div>
    </div>
  );
};
export default DiaryItem;
