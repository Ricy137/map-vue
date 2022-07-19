import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
  timeout: 3000000
});

const defaultOpt = { login: true };

// function getMd5SignStr(params) {
//   const timestamp = (new Date().getTime() / 1000).toString().slice(0, 10);
//   const keysArray = Object.keys(params).sort();
//   let signStr = `${keysArray.filter((key) => (key !== 'timestamp' && key !== 'sign')).map((key) => params[key]).join('')}${timestamp}${CKEY}`;
  // if (keysArray.length > 0) {
  //   signStr 
  // }
  // else {
  //   signStr = `${timestamp}${CKEY}`
  // }
//   let checkSign = new MD5().update(signStr).digest('hex').toString().toUpperCase();
//   params.timestamp = parseInt(timestamp);
//   params.sign = checkSign;
//   return params;
// }

async function baseRequest(options) {
  // let ses = new Session();
  // let bar = ses.getSession("bar", "local");
  // if (!bar) {
  //   bar = '{"token":null}'
  // }
  // let userInfo = JSON.parse(bar);
  // const token = userInfo.token || null;
  const headers = options.headers || {};
  // if (options.url != "/auth/login") {
  //   headers["Authorization"] = `Bearer ${token}`;
  // }
  headers["content-type"] = "application/x-www-form-urlencoded";
  options.headers = headers;

  return instance(options).then(res => {
    const data = res.data || {};
    if (res.status !== 200)
      return Promise.reject({ msg: "请求失败", res, data });
    if (res.status === 200) {
      return Promise.resolve(data, res);
    } else {
      return Promise.reject({ msg: res.data.msg, res, data });
    }
  });
}

/**
 * http 请求基础类
 * 参考文档 https://nsd5nuk7s2.feishu.cn/docs/doccnJXN49DF4xeaWHlXuvsN6ob#
 *
 */
const request = ["post", "delete", "put", "patch"].reduce((request, method) => {
  /**
   *
   * @param url string 接口地址
   * @param data object post参数
   * @param options object axios 配置项
   * @returns {AxiosPromise}
   */
  request[method] = (url, datas = {}, options = {}) => {
    let data = {};
    if (datas && datas != {}) {
      data = JSON.stringify(datas);
    }
    return baseRequest(
      Object.assign({ url, data, method }, defaultOpt, options)
    );
  };
  return request;
}, {});

["get", "head"].forEach(method => {
  /**
   *
   * @param url string 接口地址
   * @param params object get参数
   * @param options object axios 配置项
   * @returns {AxiosPromise}
   */
  request[method] = (url, datas = {}, options = {}) => {
    let params = {};
    if (datas && datas != {}) {
      params = JSON.stringify(datas);
    }
    return baseRequest(
      Object.assign({ url, params, method }, defaultOpt, options)
    );
  };
});

export default request;
