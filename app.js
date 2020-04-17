'use strict';


var app = angular.module('App', []);

app.directive('datetimepicker', function(){
	return {
		require: '?ngModel',
		restrict: 'A',
		link: function(scope, element, attrs, ngModel){

			if(!ngModel) return; // do nothing if no ng-model

			ngModel.$render = function(){
				element.find('input').val( ngModel.$viewValue || '' );
			}

			element.datetimepicker({ 
				language: 'it' 
			});

			element.on('dp.change', function(){
				scope.$apply(read);
			});

			read();

			function read() {
				var value = element.find('input').val();
				ngModel.$setViewValue(value);
			}
		}
	}
});

app.controller('MyEvntOrganizerAppController', function($scope){
    $scope.date = moment()
  

    function calculateDif(eDate){

        var dateString = moment(eDate,"DD/MM/YYYY");
        var dateObj = dateString.toDate().toLocaleDateString("en-US")

        var curDate = new Date().toLocaleDateString("en-US");
        var givenDate = new Date(dateObj).toLocaleDateString("en-US")

        console.log("Todays Date : " ,new Date());
        console.log("Sent Date : " ,((new Date(dateObj)).toLocaleDateString("en-US")));

        if((new Date()).toLocaleDateString("en-US") <= (new Date(dateObj)).toLocaleDateString("en-US")){
            var dif = Math.abs(new Date(dateObj) - new Date());
            console.log('Dif is : ',dif)
            return dif;
            
         }else{
            var dif = -1
            console.log('Dif is : ',dif)
            return dif;
         } 


    }



    function checkEvents(eDate){

        console.log('date is : ' ,eDate)
        
       
        var dateString = moment(eDate,"DD/MM/YYYY");
        var dateObj = dateString.toDate().toLocaleDateString("en-US")
 
         console.log("give date : ", ((new Date(dateObj)).toLocaleDateString("en-US")));
         console.log('current date', (new Date()).toLocaleDateString("en-US"))

 
         if((new Date()).toLocaleDateString("en-US") <= (new Date(dateObj)).toLocaleDateString("en-US")){
            console.log('Given Date is greater')
            return true;
         }else{
            console.log('Current Date is greater')
             return false;
         } 

        
    }

	$scope.removeEvent = function(event){
        var removeEvent1 = $scope.events.indexOf(event);
        $scope.events.splice(removeEvent1,1); 
        var today  = new Date();

        $scope.model={
            eDateTime1:'13/08/2020 14:49'
        }
     
    }

        $scope.updateEvent = function(event) {
           
            angular.copy(event, {
                eName:$scope.updateEvents.eName,
                eDateTime:$scope.upateEvents.eDateTime,
                isExpire: checkEvents($scope.upateEvents.eDateTime),
                dif:calculateDif($scope.upateEvents.eDateTime)
            });

            $scope.updateEvents.eName="";
            $scope.updateEvents.eDateTime="";
        };
    

	$scope.addEvents = function(){
        $scope.events.push({
            id:$scope.events.length + 1,
            eName:$scope.newEvents.eName,
            eDateTime:$scope.newEvents.eDateTime,
            isExpire:checkEvents($scope.newEvents.eDateTime),
            dif:calculateDif($scope.newEvents.eDateTime)
        });

        $scope.newEvents.eName="";
        $scope.newEvents.eDateTime="";

    }


    $scope.events = [
        {
            id:1,
            eName:"BirthdayPary",
            eDateTime:"16/04/2020 14:45",
            isExpire: checkEvents("16/04/2020 14:45"),
            dif:calculateDif("16/04/2020 14:45")
        },
        {
            id:2,
            eName:"Wedding",
            eDateTime:"14/06/2020 14:45",
            isExpire: checkEvents("14/06/2020 14:45"),
            dif:calculateDif("14/06/2020 14:45")
        },
        {
            id:3,
            eName:"BMovie",
            eDateTime:"12/06/2020 14:36",
            isExpire: checkEvents("12/06/2020 14:36"),
            dif:calculateDif("12/06/2020 14:36")
        },
        {
            id:4,
            eName:"Temple",
            eDateTime:"20/06/2020 13:00",
            isExpire: checkEvents("20/06/2020 13:00"),
            dif:calculateDif("20/06/2020 13:00")
        }
    ];


});