import { DiaryInfo } from "../types/DiaryInfo";
import { useState } from "react";

type Option = { value: string; name: string };

const sortOptionList: Option[] = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
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
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option value={it.value} key={idx}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }: { diaryList: DiaryInfo[] }) => {
  const [sortType, setSortType] = useState("latest");

  const getProcessedDiaryList = () => {
    const compare = (a: DiaryInfo, b: DiaryInfo) => {
      return sortType === "latest" ? b.date - a.date : a.date - b.date;
    };

    const copyList: DiaryInfo[] = JSON.parse(JSON.stringify(diaryList));
    const sortedList = copyList.sort(compare);
    return sortedList;
  };

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />
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
