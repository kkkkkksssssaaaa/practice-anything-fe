import { Row } from "react-bootstrap";
import defaultProfileIcon from "../../../assets/images/default-profile-image.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyInfoResponse } from "../../../types/users/MyInfoResponse";
import { AxiosError, AxiosResponse } from "axios";
import "../../../assets/styles/users/my.scss";
import { useGetMyInfoRequest } from "../../../api/users/my";

const MyProfileListItem = () => {
  const navigate = useNavigate();
  const [myInfo, setMyInfo] = useState<MyInfoResponse>();
  const { getMyInfoRequest } = useGetMyInfoRequest();

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
          // alert(err.message);
        });
    }
  }, []);

  return (
    <Row>
      <div className={"profile-list-item"} id={`my-${myInfo?.id}`}>
        <div className={"profile-left"}>
          <div className="profile-image">
            <img src={myInfo?.profile?.image || defaultProfileIcon} />
          </div>
          <div className={"profile-nickname my-nickname"}>
            <span>{myInfo?.personalInfo?.name}</span>
          </div>
        </div>
      </div>
    </Row>
  );
};

export default MyProfileListItem;
