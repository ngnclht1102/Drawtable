import Config from '../configs/evn.config';
import store from '@/configs/store.config.ts';
import {loadAccessToken} from '@/utils/storage';

let accessToken: string = '';

const getAccessToken = async () => {
  if (accessToken) return accessToken;
  const storageAccessToken = await loadAccessToken();
  if (storageAccessToken) {
    accessToken = storageAccessToken;
    return accessToken;
  }
  return '';
};

export const updateAccessToken = async (at: string) => {
  accessToken = at;
};

export const buildGetQuery = (params: any) => {
  const query_array = Object.keys(params);
  let query = [];
  for (let i = 0; i < query_array.length; i++) {
    const key = query_array[i];
    if (params[key])
      query.push(
        encodeURIComponent(key) + '=' + encodeURIComponent(params[key]),
      );
  }
  return query.length ? query.join('&') : '';
};

export const authenticatedPost = async (
  urlPath: string,
  params: any,
  jsonStringifyParams: boolean,
) => {
  const requestInit: RequestInit = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': await getAccessToken(),
    },
    // @ts-ignore
    body: jsonStringifyParams ? JSON.stringify(params) : params,
  };
  const url = `${Config.API_BASE}${urlPath}`;
  const res = await fetch(url, requestInit);
  return await handleResponse(res, url, requestInit);
};

export const authenticatedPut = async (
  urlPath: string,
  params: any,
  jsonStringifyParams: boolean,
) => {
  const requestInit: RequestInit = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': await getAccessToken(),
    },
    // @ts-ignore
    body: jsonStringifyParams ? JSON.stringify(params) : params,
  };
  const url = `${Config.API_BASE}${urlPath}`;
  const res = await fetch(url, requestInit);
  return await handleResponse(res, url, requestInit);
};

export const authenticatedGet = async (urlPath: string) => {
  const requestInit: RequestInit = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': await getAccessToken(),
    },
  };
  const url = `${Config.API_BASE}${urlPath}`;
  const res = await fetch(url, requestInit);
  return await handleResponse(res, url, requestInit);
};

export const authenticatedDelete = async (
  urlPath: string,
  params: any,
  jsonStringifyParams: boolean,
) => {
  const requestInit: RequestInit = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': await getAccessToken(),
    },
    // @ts-ignore
    body: jsonStringifyParams ? JSON.stringify(params) : params,
  };
  const url = `${Config.API_BASE}${urlPath}`;
  const res = await fetch(url, requestInit);
  return await handleResponse(res, url, requestInit);
};

// using fetch atm, we might consider using axios
export const unauthenticatedPost = async (
  urlPath: string,
  params: any,
  jsonStringifyParams: boolean,
) => {
  const requestInit: RequestInit = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    // @ts-ignore
    body: jsonStringifyParams ? JSON.stringify(params) : params,
  };
  const url = `${Config.API_BASE}${urlPath}`;
  const res = await fetch(url, requestInit);
  return await handleResponse(res, url, requestInit);
};

const handleResponse = async (res: any, url: string, params: any) => {
  const resJson = await res.json();
  // await delayPromise(2500)
  if (res.status >= 400) {
    // navigate to onboaring when access token is expired
    if (res.status === 401 && store.getState().auth.access_token) {
      setTimeout(() => {
        store.dispatch({type: 'LOGOUT_REQUEST', payload: '401'});
      }, 1000);
      return;
    } else {
      const rejectError = new Error();
      if (typeof resJson.errors !== 'string') {
        console.log('resJson: ', resJson);
        if (resJson.errors instanceof Array) {
          const status =
            Config.IS_PRODUCTION === '1' ? '' : ' Status: ' + res.status; // not show for production
          rejectError.message = resJson.errors.join(', ') + status;
        } else {
          rejectError.message =
            Config.IS_PRODUCTION === '1'
              ? `Unexpected Error \nOps, we encountered an unexpected error. Please try again or contact support@thoughtfull.world! `
              : ' server error with detail ' + JSON.stringify(res); // undefined or something even more weird...
        }
      } else {
        rejectError.message = resJson.message;
      }

      // @ts-ignore
      rejectError.status = res.status;
      throw rejectError;
    }
  }
  return resJson;
};

export const authenticatedPostMultipart = async (
  urlPath: string,
  params: any,
) => {
  let options: any = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      'x-access-token': await getAccessToken(),
    },
  };

  options.body = new FormData();

  for (let name in params) {
    options.body.append(name, params[name]);
  }

  const url = `${Config.API_BASE}${urlPath}`;
  console.log('request', url, options);
  const res = await fetch(url, options);
  return await handleResponse(res, url, {});
};
export const authenticatedPutMultipart = async (
  urlPath: string,
  params: any,
) => {
  let options: any = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      'x-access-token': await getAccessToken(),
    },
  };

  options.body = new FormData();

  for (let name in params) {
    options.body.append(name, params[name]);
  }

  const url = `${Config.API_BASE}${urlPath}`;
  console.log('request', url, options);
  const res = await fetch(url, options);
  return await handleResponse(res, url, {});
};
