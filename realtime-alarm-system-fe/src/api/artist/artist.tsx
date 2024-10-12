import api from "..";

const findAllEndpoint = "/artists";

export const findAllArtistRequest = async () => {
  return api.get({
    path: findAllEndpoint,
  });
};
