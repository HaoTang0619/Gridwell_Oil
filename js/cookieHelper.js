const site = document.location.pathname.split("/")[1];

const setCookie = (name, value, days) => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
  document.cookie = `${name}=${value};path=/;expires=${d.toGMTString()}`;
};

const getCookie = (name = `accessToken_${site}`) => {
  const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return v ? v[2] : null;
};

const deleteCookie = (name = `accessToken_${site}`) => {
  setCookie(name, "", -1);
};

// Check login
const accessToken = getCookie();
let acc;
$.ajax({
  url: `/${site}/api/check_login.php`,
  type: "POST",
  dateType: "text",
  async: false,
  data: {
    accessToken,
  },
  success: (data) => {
    const message = JSON.parse(data);
    if (message.valid) {
      acc = message.acc;
      if (
        window.location.pathname.toLowerCase().replaceAll("/", "") ===
        site.toLowerCase()
      ) {
        window.location.href = `/${site}/control.php`;
      }
    } else {
      if (
        window.location.pathname.toLowerCase().replaceAll("/", "") !==
        site.toLowerCase()
      ) {
        alert("您尚未登入！");
        window.location.href = `/${site}/`;
      }
    }
  },
  error: () => alert("網路錯誤，請重試！"),
});

const logOut = () => {
  deleteCookie();
  window.location.href = `/${site}/`;
};
