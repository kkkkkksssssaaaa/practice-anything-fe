export interface MyInfoResponse {
  id: number;
  personalInfo: PersonalInfo;
  profile?: MyProfile;
}

export interface PersonalInfo {
  name: string;
  birth: string;
}

export interface MyProfile {
  image?: string;
  backgroundImage?: string;
  statusMessage?: string;
}
