angular.module('Rent.Common')
    .service('BillModel',
        function ($http) {
            var service = this;
            service.AllBuildings = function(){
                return [
                  {id:'1',number:'1',title:'1#楼',img:'images/Building-green.png',warn:'3户欠费'},
                  {id:'2',number:'2',title:'2#楼',img:'images/Building-green.png'},
                  {id:'3',number:'3',title:'3#楼',img:'images/Building-green.png'},
                  {id:'4',number:'4',title:'4#楼',img:'images/Building-green.png'},
                  {id:'5',number:'5',title:'5#楼',img:'images/Building-green.png',warn:'5户欠费'},
                  {id:'6',number:'6',title:'6#楼',img:'images/Building-green.png'},
                  {id:'7',number:'7',title:'7#楼',img:'images/Building-green.png'},
                  {id:'8',number:'8',title:'8#楼',img:'images/Building-green.png'},
                  {id:'9',number:'9',title:'9#楼',img:'images/Building-green.png'},
                  {id:'10',number:'10',title:'10#楼',img:'images/Building-green.png'}
                ];
          };

          service.AllRooms = function(){
              return [
                {id:'1',number:'1',title:'203室',img:'images/Apartment-green.png'},
                {id:'2',number:'2',title:'102室',img:'images/Apartment-green.png'},
                {id:'3',number:'3',title:'204室',img:'images/Apartment-green.png'},
                {id:'4',number:'4',title:'204室',img:'images/Apartment-green.png'},
                {id:'5',number:'5',title:'207室',img:'images/Apartment-green.png'},
                {id:'6',number:'6',title:'304室',img:'images/Apartment-green.png'},
                {id:'7',number:'7',title:'224室',img:'images/Apartment-green.png'},
                {id:'8',number:'8',title:'804室',img:'images/Apartment-green.png'},
                {id:'9',number:'9',title:'208室',img:'images/Apartment-green.png'},
                {id:'10',number:'10',title:'205室',img:'images/Apartment-green.png'}
              ];
        };
        });
