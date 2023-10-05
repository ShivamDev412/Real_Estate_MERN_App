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
