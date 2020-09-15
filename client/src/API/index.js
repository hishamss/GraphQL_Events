// export const createUser = (requestBody) => {
//   return fetch("/graphql", {
//     method: "POST",
//     body: JSON.stringify(requestBody),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// };

export const loginAuth0 = (domain, requestBody) => {
  return fetch(`https://${domain}/oauth/token`, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const userProfileAuth0 = (domain, token) => {
  return fetch(`https://${domain}/userinfo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
