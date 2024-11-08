import { createSlice } from "@reduxjs/toolkit";

const getInitialUserState = () => {
  const storedUser = localStorage.getItem("schrankdesign-app-user");
  return storedUser
    ? JSON.parse(storedUser)
    : { name: "", email: "", authUser: false, role: null, image: null };
};

export const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: getInitialUserState(),
  },
  reducers: {
    login(state, action) {
      const user = action.payload;
      state.user.authUser = true;
      state.user.name = user?.name;
      state.user.email = user?.email;
      state.user.role = user?.role;
      state.user.image = user?.image;
      const saveState = JSON.stringify(state.user);
      localStorage.setItem("schrankdesign-app-user", saveState);
    },
    logout(state) {
      state.user = {
        name: "",
        email: "",
        authUser: false,
        role: null,
        image: null,
      };
      localStorage.removeItem("schrankdesign-app-user", null);
    },
    updateUser(state, action) {
      //   const user = action.payload;
      // //   console.log("U U", user);
      const user = action.payload;
      state.user.name = user?.name;
      state.user.email = user?.email;
      state.user.image = user?.image;
      const saveState = JSON.stringify(user);
      localStorage.setItem("schrankdesign-app-user", saveState);
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
