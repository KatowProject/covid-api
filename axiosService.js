const axios = require("axios").default;
const baseUrl = 'https://covid19.karawangkab.go.id/';
const axiosCookieJarSupport = require("axios-cookiejar-support").default;
const tough = require("tough-cookie");
axiosCookieJarSupport(axios);
const cookiejar = new tough.CookieJar();
axios.defaults.baseURL = baseUrl;
// axios.defaults.httpsAgent = tunnelAgent;
axios.defaults.jar = cookiejar;

const AxiosService = async (url) => {
  try {
    const response = await axios.get(url, process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0);
    if (response.status === 200) {
      return Promise.resolve(response);
    }
    return Promise.reject(new Error(response));
  } catch (error) {
    return Promise.reject(new Error(error));
  }
};
module.exports = AxiosService;
