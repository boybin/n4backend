<nav class="navbar navbar-default">
  <div class="container-fluid">
  <div class="navbar-header">
    <a class="navbar-brand" href="#">
      <span class="glyphicon glyphicon-th" aria-hidden="true"></span> 物流房租管理系统</a>
  </div>
  <div id="navbar" class="navbar-collapse collapse">
    <ul class="nav navbar-nav">
      <li>
        <a href="/rent/fee/feestatisticboard">
          <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>收费统计
          <!-- <span class="badge" ng-bind="main.AllRoomsStatus.rentable"></span> -->
          <!-- <span class="badge">19</span> -->
        </a>
      </li>
      <li class="dropdown" ng-class="{active:main.$state.includes('rent.lease')}">
        <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true">出租管理</span>
          <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
          <li  ng-class="{active: main.$state.includes('rent.lease.rentroomstats')}"><a href="/rent/lease/rentroomstats">房屋情况统计</a></li>
        </ul>
      </li>
      <li class="dropdown" ng-class="{active:main.$state.includes('rent.fee')}">
        <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          <span class="glyphicon glyphicon-yen" aria-hidden="true">收费管理</span>
          <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
          <li ng-class="{active: main.$state.includes('rent.fee.feemetaplans')}"><a href="/rent/fee/feemetaplans">收费项目下发</a></li>
          <li ng-class="{active: main.$state.includes('rent.fee.feeroomsboard')}"><a href="/rent/fee/feeroomsboard">管理租户收费项目</a></li>
          <li role="separator" class="divider"></li>
          <li ng-class="{active: main.$state.includes('rent.fee.feeplanboard')}"><a href="/rent/fee/feeplanboard">催费查询</a></li>
          <li role="separator" class="divider"></li>
          <li ng-class="{active: main.$state.includes('rent.fee.feestatisticboard')}"><a href="/rent/fee/feestatisticboard">收费统计</a></li>
        </ul>
      </li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <li class="active">
        <a href="">
          <span ng-bind="currentUser.nick"></span>
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
