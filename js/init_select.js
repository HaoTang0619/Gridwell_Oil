// Init select
const init_select = () => {
  $.ajax({
    url: `/${site}/api/get_select.php`,
    type: "POST",
    async: false,
    success: (data) => {
      const message = JSON.parse(data);
      message.forEach((mes) => {
        $("#select_field").append(`
            <option value="${mes.id}">${mes.field}</option>
        `);
      });
      if (message.length > 0)
        $("#select_field").val(message[0]["id"]);
    },
    error: () => alert("網路錯誤，請重試！"),
  });
};
