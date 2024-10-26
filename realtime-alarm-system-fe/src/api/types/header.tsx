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

    if (localStorage.getItem("accessToken")) {
      this.values.push({
        key: "Authorization",
        value: `Bearer ${localStorage.getItem("accessToken")}`,
      });
    }
  }

  static default(): Headers {
    return new Headers([contentType]);
  }

  static empty(): Headers {
    return new Headers([]);
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
