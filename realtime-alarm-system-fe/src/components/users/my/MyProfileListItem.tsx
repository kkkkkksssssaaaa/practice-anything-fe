import { Row } from "react-bootstrap";
import defaultProfileIcon from "../../../assets/images/default-profile-image.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyInfoResponse } from "../../../types/users/MyInfoResponse";
import { getMyInfoRequest } from "../../../api/users/my";
import { AxiosError, AxiosResponse } from "axios";

const MyProfileListItem = () => {
  const navigate = useNavigate();
  const [myInfo, setMyInfo] = useState<MyInfoResponse>();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      console.log("User not logged in.");
      navigate("/auth/login");
    } else {
      getMyInfoRequest()
        .then((res: AxiosResponse) => {
          setMyInfo(res.data);
        })
        .catch((err: AxiosError) => {
          alert(err.message);
        });
    }
  }, []);

  return (
    <Row>
      <div className={"profile-list-item"}>
        <div className="profile-image imageS">
          <img src={myInfo?.profile?.image || defaultProfileIcon} />
        </div>
        <div className={"profile-content"}>
          <span>{myInfo?.personalInfo.name}</span>
        </div>
      </div>
    </Row>
  );
};

export default MyProfileListItem;
