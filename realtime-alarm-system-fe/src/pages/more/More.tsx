import { useEffect, useState } from "react";
import { MyInfoResponse } from "../../types/users/MyInfoResponse";
import { useGetMyInfoRequest } from "../../api/users/my";
import { AxiosError, AxiosResponse } from "axios";
import { Col, Container, Row } from "react-bootstrap";
import defaultProfileIcon from "../../assets/images/default-profile-image.png";
import Bottom from "../../components/common/Bottom";
import MoreListItem from "./MoreListItem";
import { settings } from "../../types/more/Settings";

const More = () => {
  const [myInfo, setMyInfo] = useState<MyInfoResponse>();
  const { getMyInfoRequest } = useGetMyInfoRequest();

  useEffect(() => {
    getMyInfoRequest()
      .then((res: AxiosResponse) => {
        setMyInfo(res.data);
      })
      .catch((err: AxiosError) => {
        // alert(err.message);
      });
  }, []);

  return (
    <Container className="profile-more">
      <Row className="justify-content-center mb-4">
        <h1>MORE</h1>
      </Row>
      <Row className="justify-content-center mb-4 profile-item">
        <Col xs="auto">
          <div className="profile-image">
            <img src={myInfo?.profile?.image || defaultProfileIcon} />
          </div>
          <div className="profile-nickname my-nickname">
            <span>{myInfo?.personalInfo?.name}</span>
          </div>
          <div className="profile-login-id my-login-id">
            <span>{myInfo?.personalInfo?.loginId}</span>
          </div>
        </Col>
      </Row>
      {settings.map((item) => (
        <MoreListItem key={item.link} {...item} />
      ))}
      <Bottom />
    </Container>
  );
};

export default More;
