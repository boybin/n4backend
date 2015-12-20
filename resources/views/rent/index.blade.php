<!DOCTYPE html>
<html lang="cn" ng-app="Rent">

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

    <!-- <link rel="stylesheet" href="<% elixir('css/all.css') %>"/> -->
</head>

<body ng-controller="MainCtrl as main">
  <!-- Put nav here -->
  <div class="container">
  <nav class="navbar navbar-default">
    <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">
        <span class="glyphicon glyphicon-th" aria-hidden="true"></span> 物流房租管理系统</a>
    </div>
    <div id="navbar" class="navbar-collapse collapse">
      <ul class="nav navbar-nav">
        <li ng-class="{active:main.isRentBoard()}">
          <a href="/rent/lease/rentroomsboard">
            <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> 出租房屋大厅
            <!-- <span class="badge" ng-bind="main.AllRoomsStatus.rentable"></span> -->
            <!-- <span class="badge">19</span> -->
          </a>
        </li>
        <li class="dropdown" ng-class="{active:main.isBuilding()}">
          <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            <span class="glyphicon glyphicon-home" aria-hidden="true">楼房管理</span>
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <!-- <li><a href="/rent/building/buildingboard">房屋大厅</a></li> -->
            <li ng-class="{active: main.$state.includes('buildingboard')}"><a href="/rent/building/buildingboard">房屋大厅</a></li>
            <!--
            <li role="separator" class="divider"></li>
            <li><a href="#/addBuild">添加楼栋</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#/addRoom">添加房屋</a></li>
            -->
          </ul>
        </li>
        <li class="dropdown" ng-class="{active:main.isRent()}">
          <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true">出租管理</span>
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li  ng-class="{active: main.$state.includes('leaseboard')}"><a href="/rent/lease/leaseboard">出租楼栋大厅</a></li>
            <li role="separator" class="divider"></li>
            <li  ng-class="{active: main.$state.includes('rentroomsboard')}"><a href="/rent/lease/rentroomsboard">出租房屋大厅</a></li>
          </ul>
        </li>
        <li class="dropdown" ng-class="{active:main.isFee()}">
          <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            <span class="glyphicon glyphicon-yen" aria-hidden="true">收费管理</span>
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li ng-class="{active: main.$state.includes('feemetaboard')}"><a href="/rent/fee/feemetaboard">收费项目管理</a></li>
            <li ng-class="{active: main.$state.includes('feemetaplans')}"><a href="/rent/fee/feemetaplans">收费项目下发</a></li>
            <li ng-class="{active: main.$state.includes('feeroomsboard')}"><a href="/rent/fee/feeroomsboard">管理租户收费项目</a></li>
            <li role="separator" class="divider"></li>
            <li ng-class="{active: main.$state.includes('feeboard')}"><a href="/rent/fee/feeboard">缴费大厅</a></li>
            <li role="separator" class="divider"></li>
            <li ng-class="{active: main.$state.includes('feeplanboard')}"><a href="/rent/fee/feeplanboard">催费查询</a></li>
            <li role="separator" class="divider"></li>
            <li ng-class="{active: main.$state.includes('feestatisticboard')}"><a href="/rent/fee/feestatisticboard">收费统计</a></li>
          </ul>
        </li>
        <li class="dropdown" ng-class="{active:main.isUserManager()}">
          <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            <span class="glyphicon glyphicon-user" aria-hidden="true">用户管理</span>
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <!-- <li><a href="#">用户角色管理</a></li> -->
            <!-- <li role="separator" class="divider"></li> -->
            <li ng-class="{active: main.$state.includes('userboard')}"><a href="/auth/userboard">用户管理</a></li>
          </ul>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li class="active">
          <a href="">
            <!-- <span ng-bind="globals.currentUser.username"></span> -->
            <span>郭建明</span>
            <span class="sr-only"></span>
          </a>
        </li>
        <li>
        <li>
          <a href="#" ng-click="main.logout()" >
            <span class="glyphicon glyphicon-off" aria-hidden="true"></span> 退出系统</a>
        </li>
      </ul>
    </div>
    <!--/.nav-collapse -->
  </div>
  <!--/.container-fluid -->
  </nav>
  <!-- 搜索和状态显示栏目 -->
  <div class="jumbotron" style="padding:10px;">
  <!--系统客房状态显示栏-->
    <div class="panel panel-default" style="margin-bottom:10px;">
      <div class="panel-body n4-panel-status-body">
      <ul class="list-inline">
        <li>
          <h3>可租用房屋:
            <span class="label label-info" ng-bind="main.AllRoomsStatus.rentable"></span>
          </h3>
        </li>
        <li>
          <h3>当前欠费房屋:
            <span class="label label-info" ng-bind="main.AllRoomsStatus.rented"></span>
          </h3>
        </li>
        <li>
          <h3>已租用房屋:
            <span class="label label-info" ng-bind="main.AllRoomsStatus.needclean"></span>
          </h3>
        </li>
      </ul>
      </div>
    </div>
  </div>
  @yield("content")
  <div ui-view></div>
  </div>

  <script src="node_modules/head/js/head.load.min.js"></script>
  <script src="prejs/boot.js"></script>
</body>

</html>
