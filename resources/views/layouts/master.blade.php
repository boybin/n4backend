<!DOCTYPE html>
<html lang="cn" ng-app="@yield('ng-app')">

<head>
    <base href="/">
    <meta charset="UTF-8">
    <title>@yield('title')</title>
    <!-- <script type="application/javascript" src="<% elixir('js/all.js') %>"></script> -->
    <link rel="stylesheet" href="node_modules/normalize.css/normalize.css">
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="node_modules/ui-select/dist/select.min.css">
    <link rel="stylesheet" href="node_modules/angularPrint/angularPrint.css">
    <link rel="stylesheet" href="precss/app.css">
    <script src="node_modules/head/js/head.load.min.js"></script>
    <script src="prejs/boot.js"></script>
    @section("stylesection")
    @show
    <!-- <link rel="stylesheet" href="<% elixir('css/all.css') %>"/> -->
</head>

<body ng-controller="MainCtrl as main">
  <!-- Put nav here -->
  <div class="container">
    @section('nav')
    @show
    @section('status')
    @show
    @section('content')
    @show
  </div>

  @yield('modalSection')
  @section("scriptsection")
  @show
</body>

</html>
