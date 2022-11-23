function check(str) {
  if (str || str === "") {
    return false;
  } else {
    return true;
  }
}

export default {
  namespaced: true,
  state: () => ({
    address: JSON.parse(uni.getStorageSync("address") || "{}"),
    token: uni.getStorageSync("token") || "",
    userinfo: JSON.parse(uni.getStorageSync("userinfo") || "{}"),
    redirectInfo: null
  }),

  mutations: {
    // 更新收货地址
    updateAddress(state, address) {
      state.address = address;
      this.commit("m_user/saveAddressToStorage");
    },
    saveAddressToStorage(state) {
      // if (check(state.address)) {
        uni.setStorageSync("address", JSON.stringify(state.address));
      // } else {
      //   uni.removeStorageSync("address");
      // }
    },
    // 更新用户信息
    updateUserinfo(state, userinfo) {
      state.userinfo = userinfo;
      this.commit("m_user/saveUserinfoToStorage");
    },
    // 存放用户信息
    saveUserinfoToStorage(state) {
      // if (check(state.userinfo)) {
        uni.setStorageSync("userinfo", JSON.stringify(state.userinfo));
      // } else {
      //   uni.removeStorageSync("userinfo");
      // }
    },
    // 存token
    saveTokenToStorage(state) {
      // if (check(state.token)) {
        uni.setStorageSync("token", state.token);
      // } else {
      //   uni.removeStorageSync("token");
      // }
    },
    updateToken(state, token) {
      state.token = token;
      this.commit("m_user/saveTokenToStorage");
    },
    // 更新重定向对象
    updateRedirectInfo(state, redirectInfo) {
      state.redirectInfo = redirectInfo
    }
  },
  getters: {
    addstr(state) {
      if (!state.address.provinceName) return "";
      return (
        state.address.provinceName +
        state.address.cityName +
        state.address.countyName +
        state.address.detailInfo
      );
    },
  },
};
