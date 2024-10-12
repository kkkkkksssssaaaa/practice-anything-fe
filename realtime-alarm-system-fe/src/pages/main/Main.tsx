import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Artist } from "../../types/artist/Artist";
import { findAllArtistRequest } from "../../api/artist/artist";
import { AxiosResponse } from "axios";
import ArtistListItem from "../../components/artist/ArtistListItem";

const Main = () => {
  const navigate = useNavigate();
  const [artists, setArtists] = useState<Artist[] | undefined>(undefined);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      console.log("User not logged in.");
      navigate("/auth/login");
    }

    findAllArtistRequest()
      .then((res: AxiosResponse) => {
        setArtists(res.data);
      })
      .catch((err) => {
        alert("Cannot find artists. Please re-try later.");
      });
  }, []);

  return (
    <Container>
      <Row>
        {artists?.map((artist) => (
          <ArtistListItem key={artist.id} {...artist} />
        ))}
      </Row>
    </Container>
  );
};

export default Main;
