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

        var dateString = moment(eDate,"dd/mm/yyyy hh:mm").format();
       // var dateString = new Date(eDate).toLocaleDateString();
        //var dateObj = dateString.toDate().toLocaleDateString()
       var dateObj = dateString

       //getting date diference
       var dateString2 = moment(eDate,"DD/MM/YYYY");
       var dateObj2 = dateString2.toDate().toLocaleDateString("en-US")
       var currentDate = new Date().toLocaleDateString("en-US");

       //getting new date diference
        var date1 = new Date(dateObj2);
        var date2 = new Date(currentDate);
        var diffTime = Math.abs(date2 - date1);
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        console.log("Date Difference is : " ,diffDays);

        var DatesInMiliSeconds = diffDays * 3600 * 1000 * 24; 

      

       console.log("Senddd date is : ",dateObj2);
       console.log("Current date is : ",currentDate);

      

        console.log("Date OBJ is : ",dateObj);

        var curDate = new Date().toLocaleDateString("en-US");
        var givenDate = new Date(dateObj).toLocaleDateString("en-US")

        console.log("Todays Date : " ,new Date().toLocaleDateString("en-US"));
        console.log("Sent Date : " ,new Date(dateObj).toLocaleDateString("en-US"));
        console.log("Moment Date : " ,new Date(dateObj).getTime());


        

        var cur_date = new Date();
        var date2 = new Date(dateObj);

        console.log("Structured Current Date : " ,new Date(cur_date));
        console.log("Structured New Date : " ,new Date(date2));
        console.log('Diference : ',new Date(date2) - new Date(cur_date));
        var minTime = 0;


        if((new Date()).toLocaleDateString("en-US") <= (new Date(dateObj)).toLocaleDateString("en-US")){
        
            var dif = Math.abs(new Date(date2).getTime() - new Date(cur_date).getTime());
            console.log('new date',(new Date(dateObj)).getTime());
            console.log('current date',(new Date()).getTime());
            console.log('Dif is : ',dif)
            return dif+ DatesInMiliSeconds;
            
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
         console.log('current date', (new Date()).toLocaleDateString("en-US"));

         var cur_date = new Date();
         var date2 = new Date(dateObj);

        console.log('Event Length : ' );
        
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

        var dateString = moment($scope.newEvents.eDateTime,"DD/MM/YYYY");
        var dateObj = dateString.toDate().toLocaleDateString("en-US")

        if((new Date()).toLocaleDateString("en-US") <= (new Date(dateObj)).toLocaleDateString("en-US")){

      
                $scope.events.push({
                    id:$scope.events.length + 1,
                    eName:$scope.newEvents.eName,
                    eDateTime:$scope.newEvents.eDateTime,
                    isExpire:checkEvents($scope.newEvents.eDateTime),
                    dif:calculateDif($scope.newEvents.eDateTime)
                });
        
                $scope.newEvents.eName="";
                $scope.newEvents.eDateTime="";
     
           
   
        }else{
            alert("You are not allowed to add Past dates from the calander");
        }

 

        //getLatestEvent();

    }


    $scope.getLatestEvent  = function() {

   // var latestEventDif = $scope.events[0].dif;
         
       var latestEventDif = $scope.events[Object.keys($scope.events).length-1].dif;
        for(var i = 0 ; i < (Object.keys($scope.events).length-1) ; i++){

            if($scope.events[i].dif !== -1){            
                if($scope.events[i].dif < latestEventDif){
                    latestEventDif = $scope.events[i].dif;
                }
            }

        }
        
        console.log('Latest Event dif : ',latestEventDif);
       // var count = Object.keys($scope.events).length-1;
        //console.log(count);
        // if(latestEventDif <= 0){
        //     return latestEventDif;
        // }
        // else{
        //     return 0;
        // }

        return latestEventDif;
     
    }


   // $scope.latesEvent = $scope.getLatestEvent(); 


    function hello(){
        return 'hello';
    }
 //   getLatestEvent();

    $scope.events = [
        {
            id:1,
            eName:"Birthday Pary",
            eDateTime:"29/05/2020 14:45",
            isExpire: checkEvents("29/05/2020 14:45"),
            dif:calculateDif("29/05/2020 14:45")
        },

        {
            id:2,
            eName:"To Wacth a Movie",
            eDateTime:"12/06/2020 23:52",
            isExpire: checkEvents("12/06/2020 23:52"),
            dif:calculateDif("12/06/2020 23:52")
        }
    ];



});