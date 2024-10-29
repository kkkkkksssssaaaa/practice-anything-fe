import { useApi } from "..";

const findAllEndpoint = "/artists";

export const useFindAllArtistRequest = () => {
  const api = useApi();

  const findAllArtistRequest = async () => {
    return api.get({
      path: findAllEndpoint,
    });
  };

  return { findAllArtistRequest };
};
