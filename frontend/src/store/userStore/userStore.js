import { makeAutoObservable } from "mobx";

class UserStore {
  user = null;
  token = localStorage.getItem("token");

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user) {
    this.user = { ...user };
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }
}

const userStore = new UserStore();
export default userStore;
