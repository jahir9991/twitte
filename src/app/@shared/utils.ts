import jwtDecode from 'jwt-decode';
export const jwtDecodeFunction = (code: string) => {
  return jwtDecode(code);
};
export const isJwtExpired = (tokens: number): boolean => {
  const date: Date = new Date(tokens * 1000);
  const parsedDate = Date.parse(date.toString());
  if (parsedDate - Date.now() > 0) {
    return false;
  } else {
    return true;
  }
};