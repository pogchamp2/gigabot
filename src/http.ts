const axios = require('axios');

/* This method fires an HTTP GET request to url
using the axios package.
Return array: [response (or null), error (or null)]
*/

const get = async (url: String) => {
    let result: Array<any> = []
    axios.get(url)
      .then((response: Object) => {
        result[0] = response.data.toString();
      })
      .catch((error: Object) => {
        result[1] = error;
      });
    return result;
}

export { get };