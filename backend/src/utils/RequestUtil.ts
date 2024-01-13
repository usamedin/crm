export function getHeadersJSONType(headers: { [key: string]: string }) {
  return {
    Authorization: headers.authorization,
    "Content-Type": 'application/json'
  }
}