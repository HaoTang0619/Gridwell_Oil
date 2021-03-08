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
            <button class="history_button" onclick="window.location.href='/<?php echo $site ?>/control.php'" type="button">
                開 / 關
            </button>
            <button class="history_button" type="button">
                歷史資訊
            </button>
            <button class="history_button" onclick="logOutOpen()" type="button">
                登出
            </button>
        </div>

        <div class="select_group">
            <select class="select_text" id="select_field" required>
                <script type="text/javascript">
                    init_select();
                </script>
            </select>
            <fieldset class="select_field">
                <legend class="select_legend">選擇場域</legend>
            </fieldset>
        </div>

        <table id="history_table" class="table_group table table-striped table-bordered table-sm" aria-label="table">
            <thead>
                <tr>
                    <th data-field="time" data-sortable="true">操作時間</th>
                    <th data-field="name">操作設備</th>
                    <th data-field="record">操作紀錄</th>
                </tr>
            </thead>
            <!-- php_history_page/js/history.js -->
            <!-- Loading Icon show first -->
            <tbody id="table_body">
                <script type="text/javascript">
                const switchTable = () => {
                        $("#table_body").empty();
                        $("#table_body").append("<td></td>");
                        $("#table_body").append(loadingIcon("history_loading"));
                        $("#table_body").append("<td></td>");
                        init_table();
                    }
                    switchTable()
                    $("#select_field").change(() => switchTable());
                </script>
            </tbody>
        </table>
    </div>
</div>

<!-- Modal  -->
<script type="text/javascript" src="/<?php echo $site ?>/php_history_page/components/modal.js"></script>
