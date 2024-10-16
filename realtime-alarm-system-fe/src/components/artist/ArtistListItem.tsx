import { Row } from "react-bootstrap";
import { Artist } from "../../types/artist/Artist";
import { useEffect, useState } from "react";
import "../../assets/styles/global.scss";
import "../../assets/styles/artist/artist.scss";
import defaultProfileIcon from "../../assets/images/default-profile-image.png";

const ArtistListItem = (props: Artist) => {
  const [artist, setArtist] = useState<Artist>();

  useEffect(() => {
    if (!props) {
      alert("Cannot find artists. Please re-try later.");
    }

    setArtist(props);
  }, []);

  return (
    <Row>
      <div className={"artist-list-item"} id={`artist-${artist?.id}`}>
        <div className="artist-image imageS">
          <img src={artist?.profile?.image || defaultProfileIcon} />
        </div>
        <div className="artist-profile">
          <span>name={artist?.name}</span>
          <span>group={artist?.group?.name}</span>
        </div>
      </div>
    </Row>
  );
};

export default ArtistListItem;
