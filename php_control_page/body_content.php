<div>
    <!-- Nav bar start-->
    <header class="nav_group">
        <div class="nav_inside">
            <h6 class="nav_title" id = "nav_title">監控頁面</h6>
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
        <div class="control_header">
            <button class="control_button" type="button">
                開 / 關
            </button>
            <button class="control_button" onclick="window.location.href='/<?php echo $site ?>/history.php'" type="button">
                歷史資訊
            </button>
            <button class="control_button" onclick="logOutOpen()" type="button">
                登出
            </button>
        </div>

        <div class="select_group">
            <select class="select_text" id="select_field" required>
                <option value="" selected></option>
                <script type="text/javascript">
                    init_select();
                </script>
            </select>
            <fieldset class="select_field">
                <legend class="select_legend">選擇場域</legend>
            </fieldset>
        </div>

        <table id = "control_table" class="table_group table table-striped table-bordered table-sm" aria-label="table">
            <thead>
                <tr>
                    <th data-field="infor">設備名稱</th>
                    <th data-field="content">設備內容</th>
                    <th data-field="status">設備狀態</th>
                </tr>
            </thead>
            <!-- php_control_page/js/control.js -->
            <!-- Loading Icon show first -->
            <tbody id="table_body">
                <script type="text/javascript">
                    $("#table_body").append("<td></td>");
                    $("#table_body").append(loadingIcon("control_loading"));
                    $("#table_body").append("<td></td>");
                    init_table();
                </script>
            </tbody>
        </table>
        <div class="control_footer">
            <p>本頁面資訊每十分鐘會更新一次，若要取得即時資訊請點擊該設備右方按鈕，立即取得新資料。</p>
            <p>按鈕上文字顯示為“未知”代表設備未開機或不在電信服務範圍內。</p>
        </div>
    </div>
</div>

<!-- Modal  -->
<script type="text/javascript" src="/<?php echo $site ?>/php_control_page/components/modal.js"></script>
