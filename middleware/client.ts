export const fetchData = async (url: string) => {
  const axios = (await import("axios")).default;
  const response = axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      const errData = { success: false, err: error.message };
      return errData;
    });
  return response;
};
export async function postData(url : string, data) {
  const axios = (await import("axios")).default;
  const response = await axios({
    method: "post",
    url,
    data,
  }).then((res) => res.data)
    .catch((error) => {
      console.log(error);
      if (error?.response?.data?.err?.code == 11000) {
        console.log('Duplicate key error: name must be unique.');
        throw {
          code: 11000,
          message: "name must be unique.",
        };
      }
      console.log(error);
        throw {
          code: error?.response?.status || 500,
          message: error?.response?.data?.message
        }
    });

  return response;
}

export async function updateData(url :string, data) {
  const axios = (await import("axios")).default;
  const response = await axios({
    method: "put",
    url,
    data,
  })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error.message);
      const errData = { success: false, err: error.message };
      return errData;
    });

  return response;
}

export async function deleteData(url :string, data) {
  const axios = (await import("axios")).default;
  const response = await axios({
    method: "delete",
    url,
    data,
  })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error.message);
      const errData = { success: false, err: error.message };
      return errData;
    });

  return response;
}