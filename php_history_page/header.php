<title>歷史資訊查詢頁面</title>

<?php $site = explode("/", $_SERVER['REQUEST_URI'])[1]; ?>

<!-- General css  -->
<link href="/<?php echo $site ?>/css/button.css" rel="stylesheet" type="text/css">
<link href="/<?php echo $site ?>/css/container.css" rel="stylesheet" type="text/css">
<link href="/<?php echo $site ?>/css/modal.css" rel="stylesheet" type="text/css">
<link href="/<?php echo $site ?>/css/nav.css" rel="stylesheet" type="text/css">
<link href="/<?php echo $site ?>/css/select.css" rel="stylesheet" type="text/css">
<link href="/<?php echo $site ?>/css/table.css" rel="stylesheet" type="text/css">

<!-- Bootstrap css -->
<link rel="stylesheet" href="https://kit-free.fontawesome.com/releases/latest/css/free.min.css">
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/bootstrap-table.min.css">
<link rel="stylesheet" href="css/bootstrap-table-page-jump-to.min.css">

<!-- Page css  -->
<link href="/<?php echo $site ?>/php_history_page/css/history.css" rel="stylesheet" type="text/css">

<!-- Icons  -->
<link href="/<?php echo $site ?>/icons/icons.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="/<?php echo $site ?>/icons/icons.js"></script>

<!-- General js  -->
<script type="text/javascript" src="/<?php echo $site ?>/js/jquery.min.js"></script>
<script type="text/javascript" src="/<?php echo $site ?>/js/cookieHelper.js"></script>
<script type="text/javascript" src="/<?php echo $site ?>/js/init_select.js"></script>

<!-- Bootstrap js -->
<script src="/<?php echo $site ?>/js/popper.min.js"></script>
<script src="/<?php echo $site ?>/js/bootstrap.min.js"></script>
<script src="/<?php echo $site ?>/js/bootstrap-table.min.js"></script>
<script src="/<?php echo $site ?>/js/bootstrap-table-page-jump-to.min.js"></script>
<script src="/<?php echo $site ?>/js/bootstrap-table-export.min.js"></script>
<script src="/<?php echo $site ?>/js/tableExport.min.js"></script>
<script src="/<?php echo $site ?>/js/xlsx.full.min.js"></script>
<script src="/<?php echo $site ?>/js/jspdf.min.js"></script>
<script src="/<?php echo $site ?>/js/jspdf.plugin.autotable.js"></script>

<!-- Page js  -->
<script type="text/javascript" src="/<?php echo $site ?>/php_history_page/js/history.js"></script>