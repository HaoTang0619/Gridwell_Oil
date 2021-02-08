// Cookie function from "js/cookieHelper.js"

const submit = (event) => {
  // press "Enter"
  if (event.which === 13) {
    $("#submit").click();
  }
};

const logIn = () => {
  acc = $("#account").val();
  pwd = $("#password").val();
  $("#submit").prepend(loadingIcon());

  $.ajax({
    url: `/${site}/php_index_page/api/log_in.php`,
    type: "POST",
    dateType: "text",
    data: {
      acc,
      pwd,
    },
    success: (data) => {
      const message = JSON.parse(data);
      if (message.valid) {
        setCookie(`accessToken_${site}`, message.token, 1);
        window.location.href = `/${site}/control.php`;
      } else {
        $(".index_error").css("display", "block");
        $("#submit").html("送出");
      }
    },
    error: () => alert("訊號不穩，請重試！"),
  });
};
