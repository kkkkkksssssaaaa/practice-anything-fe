import { Link } from "react-router-dom";
import "../../assets/styles/common/bottom.scss";

const Bottom = () => {
  return (
    <div className={"bottom-menu"}>
      <div className={"menu-item"}>
        <Link to={`/`}>친구</Link>
      </div>
      <div className={"menu-item"}>
        <span>채팅</span>
      </div>
      <div className={"menu-item"}>
        <Link to={`/more`}>더보기</Link>
      </div>
    </div>
  );
};

export default Bottom;
