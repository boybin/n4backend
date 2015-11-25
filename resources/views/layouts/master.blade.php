<!DOCTYPE html>
<html lang="cn">
<head>
    <base href="/">
    <meta charset="UTF-8">
    <title>@yield('title')</title>
    <!-- <script type="application/javascript" src="<% elixir('js/all.js') %>"></script> -->
    <link rel="stylesheet" href="node_modules/normalize.css/normalize.css">
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="node_modules/ui-select/dist/select.min.css">
    <!-- <link rel="stylesheet" href="<% elixir('css/all.css') %>"/> -->
</head>
<body>
  <!-- Put nav here -->
  @yield('nav')
  
  @section('content')
  <div class="container">
    <div ng-view>
    </div>
  </div>
  @show

  <script src="node_modules/head/js/head.load.min.js"></script>
  <script src="prejs/boot.js"></script>

  @yield('scriptSection')
</body>
</html>
