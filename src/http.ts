import axios from "axios";

/* This method fires an HTTP GET request to url
using the axios package.
Return array: [response (or null), error (or null)]
*/

// Add Types to response

const get = async (url: String) => {
  // const result: Array<any> = []
  const result = axios
    .get(url as string)
    .then((response: any) => {
      const data = response.data;

      return data;
    })
    .catch((error: Object) => {
      return error;
    });
  return result;
};

export { get };
