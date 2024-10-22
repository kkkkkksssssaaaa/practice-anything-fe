import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Artist } from "../../types/artist/Artist";
import { findAllArtistRequest } from "../../api/artist/artist";
import { AxiosResponse } from "axios";
import ArtistListItem from "../../components/artist/ArtistListItem";
import MyProfileListItem from "../../components/users/my/MyProfileListItem";
import Bottom from "../../components/common/Bottom";

const Main = () => {
  const navigate = useNavigate();
  const [artists, setArtists] = useState<Artist[] | undefined>(undefined);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      console.log("User not logged in.");
      navigate("/auth/login");
    } else {
      findAllArtistRequest()
        .then((res: AxiosResponse) => {
          setArtists(res.data);
        })
        .catch((err) => {
          alert("Cannot find artists. Please re-try later.");
        });
    }
  }, []);

  return (
    <Container>
      <Row>
        <h1>FREIDNS</h1>
      </Row>
      <Row>
        <span>내 프로필</span>
        <MyProfileListItem />
      </Row>
      <Row>
        <span>추천 친구</span>
        {artists?.map((artist) => (
          <ArtistListItem key={artist.id} {...artist} />
        ))}
      </Row>
      <Bottom />
    </Container>
  );
};

export default Main;
