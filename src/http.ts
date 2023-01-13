import axios from "axios";

/* This method fires an HTTP GET request to url
using the axios package.
Return array: [response (or null), error (or null)]
*/

const get = async (url: String) => {
  // const result: Array<any> = []
  const result = axios
    .get(url as any)
    .then((response: Object) => {
      return response;
    })
    .catch((error: Object) => {
      return error;
    });
  return result;
};

export { get };
