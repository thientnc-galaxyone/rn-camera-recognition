import axios, {Method} from 'axios';
import moxios from 'moxios';

const baseURL = 'https://some-domain.com/api/';
const _instance = axios.create({
  baseURL,
  timeout: 10 * 1000,
});

const mockRequest = () => {
  moxios.stubRequest(/face.*/, {
    status: 200,
    responseText: JSON.stringify({
      id: new Date().getTime(),
    }),
  });
};

const sendRequest = async (
  url: string,
  method: Method,
  body: any,
  headers = {},
) => {
  const _headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // Authorization: token
  };
  try {
    moxios.install(_instance);
    mockRequest();
    const response = await _instance.request({
      url,
      method,
      data: body,
      headers: {..._headers, ...headers},
      // cancelToken: this.apiSource.token
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  } finally {
    moxios.uninstall(_instance);
  }
};

export const callRegisterFace = async ({name, base64}: FaceData) => {
  const result = await sendRequest(
    '/face/register',
    'post',
    JSON.stringify({name, base64}),
  );
  return result;
};

export const callCheckinFace = async ({base64}: FaceData) => {
  const result = await sendRequest(
    '/face/checkin',
    'post',
    JSON.stringify({base64}),
  );
  return result;
};

export type FaceData = {
  name?: string;
  base64?: string;
  id?: string;
};
