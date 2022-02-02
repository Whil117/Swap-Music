export const customGet = async (url: string, session: any | null) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  }).then((res) => res.json())

  return res
}
