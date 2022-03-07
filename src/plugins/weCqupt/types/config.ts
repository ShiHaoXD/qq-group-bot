export interface StudentInfo {
  [name: string]: {
    info: {
      xh: string;
      name: string;
      xy: string;
      openid: string;
      address: string;
      gender: string;
    };
    owner_id: number;
  };
}

export default interface Config {
  infos: StudentInfo;
}
