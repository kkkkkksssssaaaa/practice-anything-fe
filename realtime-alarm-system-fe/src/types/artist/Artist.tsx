export type Artist = {
  id: number;
  name: string;
  profileImage: string;
  group?: Group | undefined;
};

export type Group = {
  id: number;
  name: string;
};
