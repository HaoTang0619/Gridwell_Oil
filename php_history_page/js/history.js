// Init table
const init_table = () => {
  $.ajax({
    url: `/${site}/php_history_page/api/get_table.php`,
    type: "POST",
    dateType: "text",
    data: {
      field: 1,
    },
    success: (data) => {
      $("#table_body").empty();

      const message = JSON.parse(data);
      message.forEach((mes) => {
        const tr_start = `<tr class="table_body_tr">`;
        let reg_time = `
          <td class="table_body_td">
            <span>${mes.time}</span>
          </td>
        `;

        let name = `
          <td class="table_body_td">
            <span>${mes.name}</span>
          </td>
        `;

        const record = `
          <td class="table_body_td">
            <span>${mes.record}</span>
          </td>
        `;
        const tr_end = `</tr>`;

        $("#table_body").append(
          `${tr_start}${reg_time}${name}${record}${tr_end}`
        );
      });
    },
    error: () => alert("網路錯誤，請重試！"),
  });
};

const logOutOpen = () => {
  showCheck("log_out");
};

const logOutLoading = () => {
  $("#check_backdrop").css("pointer-events", "none");
  $("#confirm").prepend(loadingIcon());
  logOut();
};

const closeCheck = () => {
  $("#check").css("display", "none");
};

const showCheck = (action, id) => {
  $("#check").css("display", "block");

  switch (action) {
    case "log_out":
      const text1 = `
        <div class="history_form">
            <span class="history_text">確認要登出嗎？</span>
        </div>
      `;

      const buttons1 = `
        <div class="history_form">
            <button class="button_group" onclick="closeCheck()" type="button">
                取消
            </button>
            <button class="button_group" id="confirm" onclick="logOutLoading()" type="button">
                確認
            </button>
        </div>
      `;

      $("#check_box").empty();
      $("#check_box").append(text1);
      $("#check_box").append(buttons1);
      break;
  }
};
