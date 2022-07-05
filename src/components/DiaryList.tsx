import { DiaryInfo } from "../types/DiaryInfo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MyButton from "./MyButton";

type Option = { value: string; name: string };

const sortOptionList: Option[] = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList: Option[] = [
  { value: "all", name: "전부 다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은만감정만" },
];

const ControlMenu = ({
  value,
  onChange,
  optionList,
}: {
  value: string;
  onChange: Function;
  optionList: Option[];
}) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option value={it.value} key={idx}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }: { diaryList: DiaryInfo[] }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const filterCallback = (item: DiaryInfo) => {
      return filter === "good" ? item.emotion <= 3 : item.emotion > 3;
    };
    const compare = (a: DiaryInfo, b: DiaryInfo) => {
      return sortType === "latest" ? b.date - a.date : a.date - b.date;
    };
    const copyList: DiaryInfo[] = JSON.parse(JSON.stringify(diaryList));
    const filteredList =
      filter === "all" ? copyList : copyList.filter(filterCallback);
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
