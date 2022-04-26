const BASE_URL = "http://localhost:5000";

export const ENDPOINTS = {
  computers: {
    computers: BASE_URL + "/api/v1/computers",
    timeIn: BASE_URL + "/api/v1/computers/login",
    timeOut: BASE_URL + "/api/v1/computers/logout",
  },
  sessions: {
    sessions: BASE_URL + "/api/v1/sessions",
  },
  authentication: {
    signin: BASE_URL + "/api/v1/auth/signin",
  },
};
