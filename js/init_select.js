// Init select
const init_select = () => {
  const allField = fields.replace(/\s/g, "").split(","); // Remove spaces
  $.ajax({
    url: `/${site}/api/get_select.php`,
    type: "POST",
    async: false,
    success: (data) => {
      const message = JSON.parse(data);
      let flag = 0;
      message.forEach((mes) => {
        if (allField.includes(String(mes.id))) {
          $("#select_field").append(`
            <option value="${mes.id}">${mes.field}</option>
        `);
          flag = 1;
        }
      });
      if (message.length > 0) $("#select_field").val(message[0]["id"]);
    },
    error: () => alert("訊號不穩，請重試！"),
  });
};
