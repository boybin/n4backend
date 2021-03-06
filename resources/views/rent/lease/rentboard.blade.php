@extends("rent.index")

@section("title","租赁大厅")

@section("content")
<div class="jumbbotron" ng-controller="RentboardCtrl as rentboard">
  <div class="row">
  <div class="col-md-2" ng-repeat="building in rentboard.AllBuildings">
    <div class='img-container'>
      <div class='img-text-warning' ng-if="building.warn"><span ng-bind="building.warn"></span></div>
      <div class='img-text'><span ng-bind="building.title"></span></div>
      <a href="/rent/lease/roomboard">
      <img src='@{{building.img}}'/>
      </a>
    </div>
  </div>
  </div>
</div>
@endsection
