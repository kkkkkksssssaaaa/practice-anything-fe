import { RawAxiosRequestHeaders } from "axios";

const contentType: Header = {
  key: "Content-Type",
  value: "application/json",
};

export class Headers {
  private readonly values: Header[];

  constructor(values?: Header[]) {
    if (!values) {
      this.values = [contentType];
    } else {
      this.values = values;
    }
  }

  static default(): Headers {
    return new Headers([contentType]);
  }

  public toAxiosHeader(): RawAxiosRequestHeaders {
    const result: RawAxiosRequestHeaders = {};

    this.values.forEach((v) => (result[v.key.toString()] = v.value.toString()));

    return result;
  }
}

export interface Header {
  key: string;
  value: string;
}
