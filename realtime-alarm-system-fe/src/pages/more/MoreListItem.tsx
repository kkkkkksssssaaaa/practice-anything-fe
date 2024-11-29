import { Row } from "react-bootstrap";
import "../../assets/styles/global.scss";
import "../../assets/styles/artist/artist.scss";
import { Setting } from "../../types/more/Settings";
import { IoIosArrowForward } from "react-icons/io";

const MoreListItem = (props: Setting) => {
  return (
    <Row className={"setting-list"}>
      <div className={"setting-list-item"}>
        <div className={"setting-left"}>
          <div className="setting-icon">{props.icon}</div>
          <div className={"setting-name"}>
            <span>{props.name}</span>
          </div>
        </div>
        <div className={"setting-right"}>
          <div className={"setting-arrow"}>
            <IoIosArrowForward />
          </div>
        </div>
      </div>
    </Row>
  );
};

export default MoreListItem;
