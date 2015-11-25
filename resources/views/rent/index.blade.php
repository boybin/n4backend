@extends('layouts.master')

@section('title',"房租管理首页")

@section('nav')
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">
        <span class="glyphicon glyphicon-th" aria-hidden="true"></span> 物流房租管理系统</a>
    </div>
    <div id="navbar" class="navbar-collapse collapse">
      <ul class="nav navbar-nav">
        <li ng-class="{active:$route.current.activeTab == 'roomboard'}">
          <a href="#/rent/lease/rentboard">
            <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> 出租大厅
            <!-- <span class="badge" ng-bind="main.AllRoomsStatus.rentable"></span> -->
            <span class="badge">23</span>
          </a>
        </li>
        <li class="dropdown" ng-class="{active:$route.current.activeTab == 'roommanage'}">
          <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            <span class="glyphicon glyphicon-home" aria-hidden="true">楼房管理</span>
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li><a href="#/buildList">房屋大厅</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#/addBuild">添加楼栋</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#/addRoom">添加房屋</a></li>
          </ul>
        </li>
        <li class="dropdown" ng-class="{active:$route.current.activeTab == 'roommanage'}">
          <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true">出租管理</span>
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li><a href="#/addRoom">出租大厅</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#/roommanage">出租大厅</a></li>
          </ul>
        </li>
        <li class="dropdown" ng-class="{active:$route.current.activeTab == 'roommanage'}">
          <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            <span class="glyphicon glyphicon-yen" aria-hidden="true">收费管理</span>
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li><a href="#/addRoom">收费项目管理</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#/roommanage">缴费大厅</a></li>
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
@stop

@section('status')
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
@stop
