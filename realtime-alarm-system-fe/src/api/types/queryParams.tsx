export class QueryParams {
  private readonly params: QueryParam[];

  constructor(params: QueryParam[]) {
    this.params = params;
  }

  map(
    callback: (value: QueryParam, index: number, array: QueryParam[]) => string,
  ) {
    return this.params.map(callback);
  }
}

export interface QueryParam {
  key: string;
  value: any;
}
