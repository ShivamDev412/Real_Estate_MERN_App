export const getApiCall = async (url: string) => {
  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await data.json();
};
export const postApiCall = async (url: string, body: any) => {
  const data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await data.json();
};
export const putApiCall = async (url: string, body: any) => {
  const data = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await data.json();
};
export const deleteApiCall = async (url: string) => {
  const data = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await data.json();
};
