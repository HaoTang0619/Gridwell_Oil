<div>
    <!-- Nav bar start-->
    <header class="nav_group">
        <div class="nav_inside">
            <h6 class="nav_title" id="nav_title">歷史資訊查詢頁面</h6>
            <script type="text/javascript">
                // From `/${site}/js/cookieHelper.js`:
                $("#nav_title").append(`
                    <span style="position: absolute; right: 24px">使用者：${acc}<span>
                `)
            </script>
        </div>
    </header>
    <!-- Nav bar end-->

    <div class="container">
        <div class="history_header">
            <button class="button_group history_button" onclick="window.location.href='/<?php echo $site ?>/control.php'" type="button">
                開 / 關
            </button>
            <button class="button_group history_button" type="button">
                歷史資訊
            </button>
            <button class="button_group history_button" onclick="logOutOpen()" type="button">
                登出
            </button>
        </div>

        <div class="select_group">
            <select class="select_text" id="select_field" required>
                <option value=""></option>
                <script type="text/javascript">
                    init_select();
                </script>
            </select>
            <fieldset class="select_field">
                <legend class="select_legend">選擇場域</legend>
            </fieldset>
        </div>

        <div class="table_group">
            <table class="table_root" aria-label="table">
                <thead class="table_head">
                    <tr class="table_head_tr">
                        <th class="table_head_th" scope="col">操作時間</th>
                        <th class="table_head_th" scope="col">操作設備</th>
                        <th class="table_head_th" scope="col">操作紀錄</th>
                    </tr>
                </thead>
                <!-- php_history_page/js/history.js -->
                <!-- Loading Icon show first -->
                <tbody class="table_body" id="table_body">
                    <script type="text/javascript">
                        $("#table_body").append("<td></td>");
                        $("#table_body").append(loadingIcon("history_loading"));
                        init_table();
                    </script>
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Modal  -->
<script type="text/javascript" src="/<?php echo $site ?>/php_history_page/components/modal.js"></script>