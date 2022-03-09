export interface IEnvironment<T> {
  getValueByKey(key: string): T;
}
