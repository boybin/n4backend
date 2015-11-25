<!DOCTYPE html>
<html lang="cn" @yield('ng-app')>

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
    @yield('style')
    <!-- <link rel="stylesheet" href="<% elixir('css/all.css') %>"/> -->
</head>

<body @yield('ng-main-ctrl')>
  <!-- Put nav here -->
  <div class="container">
    @yield('nav')
    @yield('status')
    @yield('content')
  </div>

  <script src="node_modules/head/js/head.load.min.js"></script>
  <script src="prejs/boot.js"></script>

  @yield('modalSection')
  @yield('scriptSection')
</body>

</html>
