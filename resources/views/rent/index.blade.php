<!DOCTYPE html>
<html lang="cn" ng-app="Rent">

<head>
  <base href="/">
  <meta charset="UTF-8">
  <title>@{{title}}</title>
  <!-- <script type="application/javascript" src="<% elixir('js/all.js') %>"></script> -->
  <link rel="stylesheet" href="node_modules/normalize.css/normalize.css">
  <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="node_modules/ui-select/dist/select.min.css">
  <link rel="stylesheet" href="node_modules/angularPrint/angularPrint.css">
  <link rel="stylesheet" href="precss/app.css">
  <!-- <link rel="stylesheet" href="<% elixir('css/all.css') %>"/> -->
</head>

<body ng-controller="MainCtrl as main">
  <div class="container">
    <div ui-view></div>
  </div>

  <script src="node_modules/head/js/head.load.min.js"></script>
  <script src="prejs/boot.js"></script>
</body>

</html>
