export type Artist = {
  id: number;
  name: string;
  group?: Group | undefined;
  profile?: Profile | undefined;
  isSubscribed: boolean;
};

export type Group = {
  id: number;
  name: string;
};

export type Profile = {
  image?: string;
  statusMessage?: string;
};
