app.controller("pflMatrixController", function ($scope, pflMatrixService) {

    console.log("loading pflMatrixController");
    
	$scope.language='default_en';	
	$scope.indicators={};
	$scope.diffOptions={};
	$scope.diffOptRankings={};
	$scope.topDiffOpts={}
	$scope.userInfo={};
	
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
	
	$scope.savePflMatrix=function(){
		var indicatorList = [];
		for (var pflInd in $scope.indicators) {
			if ($scope.indicators[pflInd].isSelected) {
				indicatorList.push(pflInd)
			}
		}
		
		var userDataForSave=angular.copy($scope.userInfo);
		userDataForSave.indicators=indicatorList;
		var dataStr=JSON.stringify(userDataForSave);
		console.log(userDataForSave,dataStr);	
		downloadFile('pflMatrix.pfl',dataStr);		
	}
	
	document.getElementById('file-input').addEventListener('change', readSingleFile, false);
	function readSingleFile(e) {
		var file = e.target.files[0];
		if (!file) {return;}
		var reader = new FileReader();
		reader.onload = function(e) {
			var contents = e.target.result;
			console.log(contents);
			loadMatrixFromFile(contents);
		};
		reader.readAsText(file);
	}
	
	function downloadFile(filename, text) {
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}
	
	function loadMatrix(){
		$scope.indicators=angular.copy(pflMatrixService.getIndicatorList());
		$scope.diffOptions=angular.copy(pflMatrixService.getDifferentiationOptions());
		$scope.diffOptRankings=pflMatrixService.initDifferentiationOptionsRanking();
		
	}	
	
	function loadMatrixFromFile(fileStr){
		$scope.userInfo = angular.copy(JSON.parse(fileStr));
		$scope.userInfo.pflDate=new Date($scope.userInfo.pflDate);
		console.log($scope.userInfo);					
		
		for (var pflInd in $scope.indicators) {$scope.indicators[pflInd].isSelected=false;}
		
		for(var i=0;i<$scope.userInfo.indicators.length;i++){
			var pflInd=$scope.userInfo.indicators[i];
			console.log($scope.indicators[pflInd]);
			//$scope.updateRank(indicator)
			$scope.indicators[pflInd].isSelected=true;
			$scope.updateRank($scope.indicators[pflInd]);
		}
		$scope.$apply();
		
	}
	
	loadMatrix();
	
  
//end of controller
});