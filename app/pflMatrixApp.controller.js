app.controller("pflMatrixController", function ($scope, pflMatrixService) {

    console.log("loading pflMatrixController");
    
	$scope.language='default_en';	
	$scope.indicators={};
	$scope.diffOptions={};
	$scope.diffOptRankings={};
	$scope.topDiffOpts={}
	
	$scope.showHelp=function(){
		$( "#helpDialog" ).dialog({
			  modal: true,
			  width: 600,
			buttons: {
					Ok: function() {
					  $( this ).dialog( "close" );
					}
				  },
			closeOnEscape: false,
				open: function(event, ui) {
					$(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
				}				  
		});
	}
	
	$scope.setLanguage=function(isStudentText){
		if(isStudentText){$scope.language='kids_en';}
		else{$scope.language='default_en';}
	}
	
	$scope.setIndicatorLocation=function(indicator, diffOpt){
		if(diffOpt.indicators.indexOf(indicator.id)>=0){return true;}
		return false;
	}
	
	$scope.updateRank=function(indicator){
		$scope.topDiffOpts=pflMatrixService.updateDifferentiationOptionsRanking(indicator.id, indicator.isSelected, $scope.diffOptRankings);
	}	
	
	function loadMatrix(){
		$scope.indicators=angular.copy(pflMatrixService.getIndicatorList());
		$scope.diffOptions=angular.copy(pflMatrixService.getDifferentiationOptions());
		$scope.diffOptRankings=pflMatrixService.initDifferentiationOptionsRanking();
		
	}	
	
	loadMatrix();
	

    


//end of controller
});
