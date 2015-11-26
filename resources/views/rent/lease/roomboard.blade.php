@extends("rent.index")

@section("title","租赁大厅")

@section("content")
<div class="jumbbotron" ng-controller="LRoomboardCtrl as roomboard">
  <div class="row">
  <div class="col-md-2" ng-repeat="room in roomboard.AllRooms">
    <div class='img-container'>
      <div class='img-text-warning' ng-if="room.warn"><span ng-bind="room.warn"></span></div>
      <div class='img-text'><span ng-bind="room.title"></span></div>
      <a href="#">
      <img src='@{{room.img}}'/>
      </a>
    </div>
  </div>
  </div>
</div>
@endsection
