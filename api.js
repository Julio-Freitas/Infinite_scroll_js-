
const allList = async (page) => {
  const url = `https://jsonplaceholder.typicode.com/posts?_limit=25&_page=${page || 1}`;
  const resp = await fetch(url);
  const dataJson = await resp.json();
  return dataJson;
}

export default {
  allList
}