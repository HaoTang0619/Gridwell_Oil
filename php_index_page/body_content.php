<div>
    <!-- Nav bar start-->
    <header class="nav_group">
        <div class="nav_inside">
            <h6 class="nav_title">登入頁面</h6>
        </div>
    </header>
    <!-- Nav bar end-->

    <div class="container">
        <img alt="logo" style="max-width: 300px" src="/<?php echo $site ?>/images/login.jpg">
        <h5 class="index_title">Oil監測控制系統</h5>
        <div class="index_form">
            <span class="index_text">帳號</span>
            <div class="input_group">
                <input type="text" class="input_area" id="account" onkeyup="submit(event)" required />
                <fieldset class="input_field index_field">
                    <legend class="input_legend index_legend">輸入帳號</legend>
                </fieldset>
            </div>
        </div>
        <div class="index_form">
            <span class="index_text">密碼</span>
            <div class="input_group">
                <input type="password" class="input_area" id="password" onkeyup="submit(event)" required />
                <fieldset class="input_field index_field">
                    <legend class="input_legend index_legend">輸入密碼</legend>
                </fieldset>
            </div>
        </div>
        <div class="index_form index_error">
            <strong>帳號或密碼錯誤！</strong>
        </div>
        <div class="index_form">
            <button class="index_button" id="submit" onclick="logIn()" type="button">
                送出
            </button>
        </div>
    </div>
</div>
