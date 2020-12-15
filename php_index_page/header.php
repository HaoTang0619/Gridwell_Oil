<title>登入頁面</title>

<?php $site = explode("/", $_SERVER['REQUEST_URI'])[1]; ?>

<!-- General css  -->
<link href="/<?php echo $site ?>/css/button.css" rel="stylesheet" type="text/css">
<link href="/<?php echo $site ?>/css/container.css" rel="stylesheet" type="text/css">
<link href="/<?php echo $site ?>/css/input.css" rel="stylesheet" type="text/css">
<link href="/<?php echo $site ?>/css/nav.css" rel="stylesheet" type="text/css">

<!-- Bootstrap css -->
<link rel="stylesheet" href="/<?php echo $site ?>/css/bootstrap.min.css">

<!-- Page css  -->
<link href="/<?php echo $site ?>/php_index_page/css/index.css" rel="stylesheet" type="text/css">

<!-- Icons  -->
<link href="/<?php echo $site ?>/icons/icons.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="/<?php echo $site ?>/icons/icons.js"></script>

<!-- General js  -->
<script type="text/javascript" src="/<?php echo $site ?>/js/jquery.min.js"></script>
<script type="text/javascript" src="/<?php echo $site ?>/js/cookieHelper.js"></script>

<!-- Page js  -->
<script type="text/javascript" src="/<?php echo $site ?>/php_index_page/js/index.js"></script>