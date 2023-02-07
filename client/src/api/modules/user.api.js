import publicClient from "../client/public.client";
import privateClient from "../client/private.client";

const userEndpoints = {
  signin: "user/signin",
  signup: "user/signup",
  getInfo: "user/info",
};

const userApi = {
  signin: async ({ email, password, designation }) => {
    try {
      const response = await publicClient.post(userEndpoints.signin, {
        email,
        password,
        designation,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);
      
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default userApi;
