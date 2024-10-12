import { Row } from "react-bootstrap";
import { Artist } from "../../types/artist/Artist";
import { useEffect, useState } from "react";

const ArtistListItem = (props: Artist) => {
  const [artist, setArtist] = useState<Artist>();

  useEffect(() => {
    if (!props) {
      alert("Cannot find artists. Please re-try later.");
    }

    setArtist(props);
  }, []);

  return (
    <Row className="artist-list-item">
      <span>profileImage={artist?.profileImage}</span>
      <span>id={artist?.id}</span>
      <span>name={artist?.name}</span>
      <span>group={artist?.group?.name}</span>
    </Row>
  );
};

export default ArtistListItem;
