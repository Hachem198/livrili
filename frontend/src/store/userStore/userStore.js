import { makeAutoObservable, runInAction } from "mobx";

class UserStore {
  user = null;
  token = localStorage.getItem("token");
  isLoading = true;

  constructor() {
    makeAutoObservable(this);
    this.loadUser();
  }

  setUser(user) {
    this.user = user;
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }

  loadUser() {
    try {
      const storedUser = localStorage.getItem("user");
      if (this.token && storedUser) {
        runInAction(() => {
          this.user = JSON.parse(storedUser);
        });
      }
    } catch (e) {
      console.error("Error loading user:", e);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  logout() {
    this.setUser(null);
    this.setToken(null);
  }
}

const userStore = new UserStore();
export default userStore;
