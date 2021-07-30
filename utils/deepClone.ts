function deepClone<T>(json: T): T {
  return JSON.parse(JSON.stringify(json));
}

export default deepClone;
