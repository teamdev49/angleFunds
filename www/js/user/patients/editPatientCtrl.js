angular.module('angleFunds')
	   .controller('editPatientCtrl', function($scope, editPatientService, $state, 
	   	$stateParams) {
	 	var patientId = $stateParams.id;
	 	var date = {};
	 	$scope.newPatient = {};
		$scope.errors = {};
		$scope.newPatient = {};
		$scope.organization={};
		$scope.loading = false;
	    editPatientService.updatePatientDetails(patientId)
						  .then(function(result){
						  	$scope.loading = true;
	 					  	console.log(result);
	 					  	date = result.date_of_birth;
	 					  	$scope.newPatient =  result;				  	
	 					}); 
		$scope.loading = false;
	 	$scope.goPatientList = function(){
	 		$state.go('menu.patientList');
	 	}
	 	var date = $scope.newPatient.date_of_birth;
	 	console.log(date);
	 	$scope.newPatient.onezoneDatepicker = {
		    date: new Date(date), // MANDATORY                     
		};

	 	$scope.hideErrorMsg = function (id, key) {
	      	if($scope.errors[key] && $scope.errors[key][id]) {
	        	$scope.errors[key][id] = false;
	      	}
	    }
	    
	 	$scope.savePatientDetails = function(){
		$scope.errors.newPatient= {};
		$scope.newPatient.organization = $scope.organization;
			if(!$scope.newPatient.patient_name){
				$scope.errors.newPatient.patient_name = 'please enter patient name';
				return false;
			} 
			if(!$scope.newPatient.onezoneDatepicker){
				$scope.errors.newPatient.onezoneDatepicker = 'please enter patient date of birth';
			}
			if(!$scope.newPatient.parent_guardian_name){
				$scope.errors.newPatient.parent_guardian_name = "please enter patient's parent name";
			}
			if(!$scope.newPatient.primary_phone_number){
				$scope.errors.newPatient.primary_phone_number = "please enter valid phone number";
			}else{
				var evt = $scope.newPatient.primary_phone_number;
				if(!isNaN(evt)){
					if(!(evt.length == 10)){
						$scope.errors.newPatient.primary_phone_number = "Phone number is incorrect";	
					}
				}else{
					$scope.errors.newPatient.primary_phone_number = "please enter numbers only";		
				}
			}
			if(!$scope.newPatient.alternate_phone_number){
				$scope.errors.newPatient.alternate_phone_number = "please enter Alternate phone number";
			}else{
				var evt = $scope.newPatient.alternate_phone_number;
				if(!isNaN(evt)){
					if(!(evt.length == 10)){
						$scope.errors.newPatient.alternate_phone_number = "Phone number is incorrect";	
					}
				}else{
					$scope.errors.newPatient.alternate_phone_number = "please enter numbers only";		
				}
			}
			if(!$scope.newPatient.patient_email){
				$scope.errors.newPatient.patient_email = "please enter email address";
			}else{
			    var x = $scope.newPatient.patient_email;
			    var atpos = x.indexOf("@");
			    var dotpos = x.lastIndexOf(".");
			    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
			        $scope.errors.newPatient.patient_email = "please enter email address";
			    }
			}
			if(!$scope.newPatient.doctor_name){
				$scope.errors.newPatient.doctor_name = "please enter doctorn name";
			}
			if(!$scope.newPatient.diagnosis){
				$scope.errors.newPatient.diagnosis = "please enter diagnosis";
			}
			if(!$scope.newPatient.disease_name){
				$scope.errors.newPatient.disease_name = "please enter disease";
			}
			if(!$scope.newPatient.duration_of_treatment){
				$scope.errors.newPatient.duration_of_treatment = "please enter duration time";
			}
			if(!$scope.newPatient.duration_type){
				$scope.errors.newPatient.duration_type = "please enter type of treatment";
			}
			if(!$scope.newPatient.approximate_cost){
				$scope.errors.newPatient.approximate_cost = "please enter approximate cost";
			}else {
				var approximate_cost = $scope.newPatient.approximate_cost;
				if(isNaN(approximate_cost)){
					$scope.errors.newPatient.approximate_cost = "please enter approximate cost in numbers ";	
				}
			}
			if(!$scope.newPatient.monthly_family_income){
				$scope.errors.newPatient.monthly_family_income = "please enter monthly family income";
			}else {
				var monthly_family_income = $scope.newPatient.monthly_family_income;
				if(isNaN(monthly_family_income)){
					$scope.errors.newPatient.monthly_family_income = "please enter familyIncome in numbers ";	
				}
			}
			if(!$scope.newPatient.occupation){
				$scope.errors.newPatient.occupation = "please enter atleast one occupation";
			}
			if(!$scope.newPatient.personName){
				$scope.errors.newPatient.personName = "please enter atleast one personName";
			}
			if($scope.organization.length > 0){
				$scope.errors.newPatient.organization = "please select atleast one organization";
			}
			console.log($scope.newPatient);
			//$log.debug($scope.errors.newPatient);
			//calling the service method
			if(angular.equals({}, $scope.errors.newPatient)) {
				newPatientService.setAddNewPatientDetails($scope.newPatient)
					 .then(function(){
					$state.go('menu.patientList');
				}, function(error) {
					console.log('error', error);
					$state.go('menu.patientList');
				}); 
				
			}
		}
});