import { MouseEventHandler } from "react";

const MyButton = ({
  text,
  type,
  onClick,
}: {
  text: string;
  type: string;
  onClick: MouseEventHandler;
}) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
