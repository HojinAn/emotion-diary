import { ReactElement } from "react";

const MyHeader = ({
  headText,
  leftChild,
  rightChild,
}: {
  headText: string;
  leftChild: ReactElement;
  rightChild: ReactElement;
}) => {
  return (
    <header>
      <div className="head_btn_left">{leftChild}</div>
      <div className="head_text">{headText}</div>
      <div className="head_btn_right">{rightChild}</div>
    </header>
  );
};

export default MyHeader;
