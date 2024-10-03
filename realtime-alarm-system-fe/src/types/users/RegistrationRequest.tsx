export interface RegistrationRequest {
  loginId: string;
  password: string;
  passwordConfirm: string;
  personalInfo: RegistrationPersonalInfo;
}

export interface RegistrationPersonalInfo {
  name: string;
  birth: Date;
}
