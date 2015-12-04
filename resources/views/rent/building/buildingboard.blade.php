@extends("rent.index")

@section("title","租赁大厅")

@section("content")
<div class="jumbbotron" ng-controller="BuildboardCtrl as buildboard">
  <div class="row">
  <div class="col-md-2" ng-repeat="building in buildboard.AllBuildings">
    <div class='img-container'>
      <div class='img-text-warning' ng-if="building.warn"><span ng-bind="building.warn"></span></div>
      <div class='img-text'><span ng-bind="building.name"></span></div>
      <a href="/rent/building/@{{building.id}}/roomboard">
      <!-- <img src='@{{building.img}}'/> -->
      <img src='images/Building-green.png'/>
      </a>
    </div>
  </div>
  </div>
</div>
@endsection
