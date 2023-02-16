import { axios } from "../axios/index";
// 接口模拟的是本地json 数据
const loginApi = {
  login: "src/mock/login.json",
  menu: "src/mock/menu.json",
  user: "src/mock/user.json",
};
export function handleLogin(data: any) {
  return axios.post({ url: loginApi.login, data });
  //   return axios.post({ url: loginApi.login, data }, { abort: true });
}
export function getMenu(id: number) {
  return axios.get({
    url: loginApi.menu,
  });
}
export function getUser(id: number) {
  return axios.get({
    url: loginApi.user,
  });
}
