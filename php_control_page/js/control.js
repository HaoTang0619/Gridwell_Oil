// Init table

const init_value = (num) => {
  let message;
  $.ajax({
    url: `/${site}/php_control_page/api/get_value.php`,
    type: "POST",
    async: false,
    dateType: "text",
    data: {
      field: 1,
      num,
    },
    success: (data) => {
      message = JSON.parse(data);
    },
  });
  return message;
};

const init_table = () => {
  $.ajax({
    url: `/${site}/php_control_page/api/get_table.php`,
    type: "POST",
    dateType: "text",
    data: {
      field: 1,
    },
    success: (data) => {
      const init = init_value(JSON.parse(data).length);
      $("#table_body").empty();

      const message = JSON.parse(data).map((mes, index) => {
        mes.infor = `
          <span class="control_name_span" id="name_${mes.id}">${mes.name}</span>
          <span style="display: none" id="IP_${mes.id}">${mes.IP}</span>
          <span style="display: none" id="port_${mes.id}">${mes.port}</span>
          <span style="display: none" id="nodeID_${mes.id}">${mes.nodeID}</span>
        `;
        mes.infor += `
          <button class="control_setting" onclick="editNameOpen(${
            mes.id
          })" type="button">
              ${editIcon("button_svg control_svg")}
          </button>
        `;

        mes.content = "";
        switch (mes.type) {
          case "0":
            mes.content += `
                  <button onclick="switchOnOpen(${mes.id})" type="button">
                      ON
                  </button>
                  <button onclick="switchOffOpen(${mes.id})" type="button">
                      OFF
                  </button>
                  <span id="on_off_${mes.id}">--</span>
              </td>
            `;
            break;

          case "1":
            mes.content += `
                  <span id="value_${mes.id}">接點訊號: ${
              init[index + 1].signal === null ? "未知" : init[index + 1].signal
            } / 電壓: ${
              init[index + 1].voltage === null
                ? "未知"
                : init[index + 1].voltage
            }</span>
                  <span style="display: none" id="old_a_${mes.id}">${
              mes.a
            }</span>
                  <span style="display: none" id="old_b_${mes.id}">${
              mes.b
            }</span>
                  <button class="control_setting" onclick="setFormulaOpen(${
                    mes.id
                  })" type="button">
                  ${settingIcon("button_svg control_svg")}
                  </button>
              </td>
            `;
            break;

          case "2":
            mes.content += `
                  <span id="value_${mes.id}">--</span>
                  <span style="display: none" id="old_a_${mes.id}">${
              mes.a
            }</span>
                  <span style="display: none" id="old_b_${mes.id}">${
              mes.b
            }</span>
                  <button class="control_setting" onclick="setFormulaOpen(${
                    mes.id
                  })" type="button">
                  ${settingIcon("button_svg control_svg")}
                  </button>
              </td>
            `;
            break;

          default:
            mes.content += `
                  <button onclick="viewVideo(${mes.id})" type="button">
                      查看
                  </button>
                  <button onclick="editIP(${mes.id})" type="button">
                      編輯
                  </button>
              </td>
            `;
            break;
        }
        mes.status = `
          <button class="control_online" id="status_${
            mes.id
          }" onclick="switchOnlineOpen(${mes.id})" type="button">
              ${init[index + 1].status === "On" ? "上線" : "未知"}
          </button>
        `;

        return mes;
      });

      $("#control_table").bootstrapTable("destroy");
      $("#control_table").bootstrapTable({
        data: message,
        // exportOptions: {
        //   fileName: `索道歷史紀錄${new Date().toLocaleTimeString("en-us", {
        //     year: "numeric",
        //     month: "short",
        //     day: "numeric",
        //   })}`,
        // },
        // exportTypes: ["csv", "excel", "pdf"],
        pagination: true,
        paginationLoop: false,
        showJumpTo: true,
        // showColumns: true,
        // showExport: true,
        search: true,
        // sortName: "time",
        // sortOrder: "desc",
      });
    },
    error: () => alert("網路錯誤，請重試！"),
  });
};

const closeModal = () => {
  $("#modal").css("display", "none");
};

const logOutOpen = () => {
  showCheck("log_out");
};

const logOutLoading = () => {
  $("#check_backdrop").css("pointer-events", "none");
  disableButton("cancel");
  disableButton("confirm");
  $("#confirm").prepend(loadingIcon());
  logOut();
};

const editNameOpen = (id) => {
  const name = $(`#name_${id}`).html();
  const IP = $(`#IP_${id}`).html();
  const port = $(`#port_${id}`).html();
  const nodeid = $(`#nodeID_${id}`).html();

  $("#modal").css("display", "block");
  const header = `
    <div class="control_form">
        <h2 class="control_text">編輯資訊</h2>
    </div>
  `;

  const form = `
    <div class="control_form">
        <span class="control_text">名稱</span>
        <div class="input_group">
            <input type="text" class="input_area" id="new_name" value="${name}" required />
            <fieldset class="input_field">
                <legend class="input_legend">輸入名稱</legend>
            </fieldset>
        </div>
    </div>
    <div class="control_form">
        <span class="control_text">IP位址</span>
        <div class="input_group">
            <input type="text" class="input_area" id="new_IP" value="${IP}" required />
            <fieldset class="input_field">
                <legend class="input_legend">輸入IP</legend>
            </fieldset>
        </div>
    </div>
    <div class="control_form">
        <span class="control_text">通訊埠</span>
        <div class="input_group">
            <input type="text" class="input_area" id="new_port" value="${port}" required />
            <fieldset class="input_field">
                <legend class="input_legend">輸入通訊埠</legend>
            </fieldset>
        </div>
    </div>
    <div class="control_form">
        <span class="control_text">Node ID</span>
        <div class="input_group">
            <input type="text" class="input_area" id="new_nodeID" value="${nodeid}" required />
            <fieldset class="input_field">
                <legend class="input_legend">輸入Node ID</legend>
            </fieldset>
        </div>
    </div>
  `;

  const buttons = `
    <div class="control_form">
        <button onclick="closeModal()" type="button">
            取消
        </button>
        <button onclick="showCheck('name', ${id})" type="button">
            送出
        </button>
    </div>
  `;

  $("#modal_box").empty();
  $("#modal_box").append(header);
  $("#modal_box").append(form);
  $("#modal_box").append(buttons);
};

const editName = (id) => {
  const name = $("#new_name").val();
  const IP = $("#new_IP").val();
  const port = $("#new_port").val();
  const nodeid = $("#new_nodeID").val();
  $("#check_backdrop").css("pointer-events", "none");
  disableButton("cancel");
  disableButton("confirm");
  $("#confirm").prepend(loadingIcon());

  $.ajax({
    url: `/${site}/php_control_page/api/edit_name.php`,
    type: "POST",
    dateType: "text",
    data: {
      field: 1,
      id,
      name,
      IP,
      port,
      nodeid,
    },
    success: (data) => {
      const message = JSON.parse(data);
      if (message.success) {
        $(`#name_${id}`).text(name);
        $(`#IP_${id}`).text(IP);
        $(`#port_${id}`).text(port);
        $(`#nodeID_${id}`).text(nodeid);
        closeCheck();
        closeModal();
      } else {
        alert("網路錯誤，請重試！");
        enableButton("cancel");
        enableButton("confirm");
        $("#confirm").html("確認");
      }
      $("#check_backdrop").css("pointer-events", "auto");
    },
    error: () => {
      alert("網路錯誤，請重試！");
      enableButton("cancel");
      enableButton("confirm");
      $("#confirm").html("確認");
      $("#check_backdrop").css("pointer-events", "auto");
    },
  });
};

const switchOnOpen = (id) => {
  showCheck("switch_on", id);
};

const switchOn = (id) => {
  const IP = $(`#IP_${id}`).html();
  const port = $(`#port_${id}`).html();
  const nodeid = $(`#nodeID_${id}`).html();
  $("#check_backdrop").css("pointer-events", "none");
  disableButton("cancel");
  disableButton("confirm");
  $("#confirm").prepend(loadingIcon());

  let flag = false;
  const sendCommand = (i) => {
    if (flag) return;
    $.ajax({
      url: `http://${IP}:${port}/onn`,
      type: "GET",
      dateType: "jsonp",
      data: {
        nodeid,
      },
      async: false,
      success: (data) => {
        if (data === "OK") {
          getSwitchStatus(id, "onn");
          flag = true;
        }
      },
    });
    if (!flag && i === 4) {
      alert("網路錯誤，請重試！");
      enableButton("cancel");
      enableButton("confirm");
      $("#confirm").html("確認");
      $("#check_backdrop").css("pointer-events", "auto");
    }
  };

  for (let i = 0; i < 5; i++) {
    setTimeout(() => sendCommand(i), i * 1000);
  }
};

const switchOffOpen = (id) => {
  showCheck("switch_off", id);
};

const switchOff = (id) => {
  const IP = $(`#IP_${id}`).html();
  const port = $(`#port_${id}`).html();
  const nodeid = $(`#nodeID_${id}`).html();
  $("#check_backdrop").css("pointer-events", "none");
  disableButton("cancel");
  disableButton("confirm");
  $("#confirm").prepend(loadingIcon());

  let flag = false;
  const sendCommand = (i) => {
    if (flag) return;
    $.ajax({
      url: `http://${IP}:${port}/off`,
      type: "GET",
      dateType: "jsonp",
      data: {
        nodeid,
      },
      async: false,
      success: (data) => {
        if (data === "OK") {
          getSwitchStatus(id, "off");
          flag = true;
        }
      },
    });
    if (!flag && i === 4) {
      alert("網路錯誤，請重試！");
      enableButton("cancel");
      enableButton("confirm");
      $("#confirm").html("確認");
      $("#check_backdrop").css("pointer-events", "auto");
    }
  };

  for (let i = 0; i < 5; i++) {
    setTimeout(() => sendCommand(i), i * 1000);
  }
};

const switchOnlineOpen = (id) => {
  showCheck("switch_online", id);
};

const switchOnline = (id) => {
  const IP = $(`#IP_${id}`).html();
  const port = $(`#port_${id}`).html();
  const nodeid = $(`#nodeID_${id}`).html();
  $("#check_backdrop").css("pointer-events", "none");
  disableButton("cancel");
  disableButton("confirm");
  $("#confirm").prepend(loadingIcon());

  let flag = false;
  const sendCommand = (i) => {
    if (flag) return;
    $.ajax({
      url: `http://${IP}:${port}/init_stat`,
      type: "GET",
      dateType: "jsonp",
      data: {
        nodeid,
      },
      async: false,
      success: (data) => {
        if (data === "OK") {
          getSwitchStatus(id, "stat");
          flag = true;
        }
      },
    });
    if (!flag && i === 4) {
      alert("網路錯誤，請重試！");
      enableButton("cancel");
      enableButton("confirm");
      $("#confirm").html("確認");
      $("#check_backdrop").css("pointer-events", "auto");
    }
  };

  for (let i = 0; i < 5; i++) {
    setTimeout(() => sendCommand(i), i * 1000);
  }
};

const checkRecv = (data, id, command) => {
  if (data.length !== 16) return false;

  let sum = 0;
  for (let i = 2; i <= 12; i += 2) {
    sum += parseInt(data.slice(i, i + 2), 16);
  }
  if (parseInt(data.slice(14, 16), 16) !== sum % 256) return false;

  let success = false;

  switch (command) {
    case "onn":
      if (
        parseInt(data.slice(2, 4), 16) === id &&
        parseInt(data.slice(4, 6), 16) === 2 &&
        parseInt(data.slice(6, 8), 16) === 1
      ) {
        $(`#on_off_${id}`).text("On");
        success = true;
        addHistory(id, command);
      }
      break;

    case "off":
      if (
        parseInt(data.slice(2, 4), 16) === id &&
        parseInt(data.slice(4, 6), 16) === 2 &&
        parseInt(data.slice(6, 8), 16) === 0
      ) {
        $(`#on_off_${id}`).text("Off");
        success = true;
        addHistory(id, command);
      }
      break;

    case "stat":
      if (
        parseInt(data.slice(2, 4), 16) === id &&
        parseInt(data.slice(4, 6), 16) === 1
      ) {
        if (parseInt(data.slice(6, 8), 16) === 1) $(`#on_off_${id}`).text("On");
        if (parseInt(data.slice(6, 8), 16) === 0)
          $(`#on_off_${id}`).text("Off");

        $(`#status_${id}`).html("上線");

        let D3 = parseInt(data.slice(6, 8), 16);
        let D4 = parseInt(data.slice(8, 10), 16);
        let vol_L = parseInt(data.slice(10, 12), 16);
        let vol_H = parseInt(data.slice(12, 14), 16) << 8;
        let voltage = (vol_L + vol_H) / 100;

        console.log(data);

        const a = $(`#old_a_${id}`).html();
        const b = $(`#old_b_${id}`).html();
        //voltage = isFinite(voltage) ? a * voltage + b : voltage;

        $(`#value_${id}`).html(`接點訊號: ${D3} / 電壓: ${voltage}`);
        success = true;
      }
      break;
  }

  if (success) {
    closeCheck();
    $("#check_backdrop").css("pointer-events", "auto");
  }
  return success;
};

const getSwitchStatus = (id, command) => {
  const IP = $(`#IP_${id}`).html();
  const port = $(`#port_${id}`).html();
  const nodeid = $(`#nodeID_${id}`).html();
  let flag = false;

  const sendCommand = (i) => {
    if (flag) return;
    $.ajax({
      url: `http://${IP}:${port}/get_stat`,
      type: "GET",
      dateType: "jsonp",
      data: {
        nodeid,
      },
      async: false,
      success: (data) => {
        flag = checkRecv(data, id, command);
      },
    });
    if (!flag && i === 39) {
      if (command === "stat") {
        closeCheck();
        $(`#on_off_${id}`).text("--");
        $(`#status_${id}`).html("未知");
      } else {
        alert("網路錯誤，請重試！");
        enableButton("cancel");
        enableButton("confirm");
        $("#confirm").html("確認");
      }
      $("#check_backdrop").css("pointer-events", "auto");
    }
  };
  for (let i = 0; i < 40; i++) {
    setTimeout(() => sendCommand(i), (i + 1) * 500);
  }
};

const addHistory = (id, command) => {
  let record = "";
  switch (command) {
    case "onn":
      // From `/${site}/js/cookieHelper.js`:
      record += acc + "：開啟";
      break;
    case "off":
      // From `/${site}/js/cookieHelper.js`:
      record += acc + "：關閉";
      break;
  }

  $.ajax({
    url: `/${site}/php_control_page/api/add_history.php`,
    type: "POST",
    dateType: "text",
    data: {
      field: 1,
      name: $(`#name_${id}`).html(),
      record,
    },
    success: (data) => {
      const message = JSON.parse(data);
      if (!message.success) {
        alert("網路錯誤：更新歷史資料失敗！");
      }
    },
    error: () => {
      console.log("error");
      alert("網路錯誤：更新歷史資料失敗！");
    },
  });
};

const setFormulaOpen = (id) => {
  const old_a = $(`#old_a_${id}`).html();
  const old_b = $(`#old_b_${id}`).html();

  $("#modal").css("display", "block");
  const header = `
    <div class="control_form">
        <h2 class="f">編輯公式</h2>
    </div>
  `;

  const form = `
    <div class="control_form">
        <span class="control_text">a</span>
        <div class="input_group">
            <input type="text" class="input_area" id="new_a" onkeyup="changeFormula()" value="${old_a}" required />
            <fieldset class="input_field">
                <legend class="input_legend">輸入a值</legend>
            </fieldset>
        </div>
    </div>
    <div class="control_form">
        <span class="control_text">b</span>
        <div class="input_group">
            <input type="text" class="input_area" id="new_b" onkeyup="changeFormula()" value="${old_b}" required />
            <fieldset class="input_field">
                <legend class="input_legend">輸入b值</legend>
            </fieldset>
        </div>
    </div>
  `;

  const text = `
    <div class="control_form">
        <span class="control_text">
            <span id="text_a">${old_a}</span> X + <span id="text_b">${old_b}</span>
        </span>
    </div>
  `;

  const buttons = `
    <div class="control_form">
        <button onclick="closeModal()" type="button">
            取消
        </button>
        <button onclick="showCheck('formula', ${id})" type="button">
            送出
        </button>
    </div>
  `;

  $("#modal_box").empty();
  $("#modal_box").append(header);
  $("#modal_box").append(form);
  $("#modal_box").append(text);
  $("#modal_box").append(buttons);
};

const changeFormula = () => {
  $("#text_a").text($("#new_a").val());
  $("#text_b").text($("#new_b").val());
};

const setFormula = (id) => {
  const new_a = $("#new_a").val();
  const new_b = $("#new_b").val();
  $("#check_backdrop").css("pointer-events", "none");
  disableButton("cancel");
  disableButton("confirm");
  $("#confirm").prepend(loadingIcon());

  $.ajax({
    url: `/${site}/php_control_page/api/edit_formula.php`,
    type: "POST",
    dateType: "text",
    data: {
      field: 1,
      id,
      new_a,
      new_b,
    },
    success: (data) => {
      const message = JSON.parse(data);
      if (message.success) {
        $(`#old_a_${id}`).text(new_a);
        $(`#old_b_${id}`).text(new_b);
        closeCheck();
        closeModal();
      } else {
        alert("網路錯誤，請重試！");
        enableButton("cancel");
        enableButton("confirm");
        $("#confirm").html("確認");
      }
      $("#check_backdrop").css("pointer-events", "auto");
    },
    error: () => {
      alert("網路錯誤，請重試！");
      enableButton("cancel");
      enableButton("confirm");
      $("#confirm").html("確認");
      $("#check_backdrop").css("pointer-events", "auto");
    },
  });
};

const disableButton = (id) => {
  $(`#${id}`).attr("disabled", true);
  $(`#${id}`).css("opacity", 0.5);
  $(`#${id}`).css("cursor", "not-allowed");
};

const enableButton = (id) => {
  $(`#${id}`).attr("disabled", false);
  $(`#${id}`).css("opacity", 1);
  $(`#${id}`).css("cursor", "pointer");
};

const closeCheck = () => {
  $("#check").css("display", "none");
};

const showCheck = (action, id) => {
  $("#check").css("display", "block");

  switch (action) {
    case "name":
      const text1 = `
        <div class="control_form">
            <span class="control_text">確認要更改此設備的資訊嗎？</span>
        </div>
      `;

      const buttons1 = `
        <div class="control_form">
            <button id="cancel" onclick="closeCheck()" type="button">
                取消
            </button>
            <button id="confirm" onclick="editName(${id})" type="button">
                確認
            </button>
        </div>
      `;

      $("#check_box").empty();
      $("#check_box").append(text1);
      $("#check_box").append(buttons1);
      break;

    case "switch_on":
      const text2 = `
        <div class="control_form">
            <span class="control_text">確認要開啟此設備嗎？</span>
        </div>
      `;

      const buttons2 = `
        <div class="control_form">
            <button id="cancel" onclick="closeCheck()" type="button">
                取消
            </button>
            <button id="confirm" onclick="switchOn(${id})" type="button">
                確認
            </button>
        </div>
      `;

      $("#check_box").empty();
      $("#check_box").append(text2);
      $("#check_box").append(buttons2);
      break;

    case "switch_off":
      const text3 = `
        <div class="control_form">
            <span class="control_text">確認要關閉此設備嗎？</span>
        </div>
      `;

      const buttons3 = `
        <div class="control_form">
            <button id="cancel" onclick="closeCheck()" type="button">
                取消
            </button>
            <button id="confirm" onclick="switchOff(${id})" type="button">
                確認
            </button>
        </div>
      `;

      $("#check_box").empty();
      $("#check_box").append(text3);
      $("#check_box").append(buttons3);
      break;

    case "switch_online":
      const text4 = `
        <div class="control_form">
            <span class="control_text">確認要更新此設備狀態嗎？</span>
        </div>
      `;

      const buttons4 = `
        <div class="control_form">
            <button id="cancel" onclick="closeCheck()" type="button">
                取消
            </button>
            <button id="confirm" onclick="switchOnline(${id})" type="button">
                確認
            </button>
        </div>
      `;

      $("#check_box").empty();
      $("#check_box").append(text4);
      $("#check_box").append(buttons4);
      break;

    case "formula":
      const text5 = `
        <div class="control_form">
            <span class="control_text">確認要更改此設備的公式嗎？</span>
        </div>
      `;

      const buttons5 = `
        <div class="control_form">
            <button id="cancel" onclick="closeCheck()" type="button">
                取消
            </button>
            <button id="confirm" onclick="setFormula(${id})" type="button">
                確認
            </button>
        </div>
      `;

      $("#check_box").empty();
      $("#check_box").append(text5);
      $("#check_box").append(buttons5);
      break;

    case "log_out":
      const text6 = `
        <div class="control_form">
            <span class="control_text">確認要登出嗎？</span>
        </div>
      `;

      const buttons6 = `
        <div class="control_form">
            <button id="cancel" onclick="closeCheck()" type="button">
                取消
            </button>
            <button id="confirm" onclick="logOutLoading()" type="button">
                確認
            </button>
        </div>
      `;

      $("#check_box").empty();
      $("#check_box").append(text6);
      $("#check_box").append(buttons6);
      break;
  }
};
