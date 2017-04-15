app.controller("pflMatrixController", function ($scope, pflMatrixService) {

    console.log("loading pflMatrixController");
    
	$scope.language='default_en';	
	$scope.indicators={};
	$scope.orderdIndicators={};
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
		$scope.orderdIndicators=angular.copy(pflMatrixService.getOrderedIndicatorList());
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
	
	var colors={grey:100,white:255, black:0, blue:"#0000ff",cadetblue:"#5f9ea0",dodgerblue:"#1e90ff" };
	var colorsRgb={
		grey:{r:125,g:125,b:125},
		white:{r:255,g:255,b:255}, 
		black:{r:0,g:0,b:0}, 
		blue:{r:0,g:0,b:255},
		cadetblue:{r:95,g:158,b:160},
		dodgerblue:{r:30,g:144,b:255} 
		};
	
	var pdfFontSize=10;
	var pdfTextHeight=6;
	
	function writePdfLine(pdfObj, x,y, text, color){
		pdfObj.setFontSize(pdfFontSize);
		pdfObj.setTextColor(color);
		pdfObj.text(x, y, text);		
		return y+pdfTextHeight;
	}
	
	function writePdfText(pdfObj, x,y, text, color,tilt){
		pdfObj.setFontSize(pdfFontSize);
		pdfObj.setTextColor(color);
		pdfObj.text(x, y, text, null, tilt);		
	}
	
	function fillDiffOptsByIndicator(pdfObj,x,y,pflInd, pflDiffOpt,color){
		var matchingIndicator=$scope.setIndicatorLocation(pflInd, pflDiffOpt);
		pdfObj.setLineWidth(1);		
		pdfObj.setDrawColor(color.r,color.g,color.b);
		
		if(pflInd.isSelected && matchingIndicator){
			pdfObj.line(x,y,x-1,y-2);
			pdfObj.line(x,y,x+3,y-4); 
		}
		if(!pflInd.isSelected && matchingIndicator){
			pdfObj.line(x-1,y,x+3,y-3);
			pdfObj.line(x-1,y-3,x+3,y);
		}
		
	}
	
	var orderedDiffOptsArray=[
		{id:"contAbs",color:colors.blue, colorRgb:colorsRgb.blue},
		{id:"contComp",color:colors.blue, colorRgb:colorsRgb.blue},
		{id:"extTop",color:colors.blue, colorRgb:colorsRgb.blue},
		{id:"livLiv",color:colors.blue, colorRgb:colorsRgb.blue},
		{id:"orgLivVal",color:colors.blue, colorRgb:colorsRgb.blue},
		{id:"relLiTop",color:colors.blue, colorRgb:colorsRgb.blue},
		{id:"selSelCont",color:colors.blue, colorRgb:colorsRgb.blue},
		
		{id:"cmplxThink",color:colors.cadetblue, colorRgb:colorsRgb.cadetblue},
		{id:"expMeths",color:colors.cadetblue, colorRgb:colorsRgb.cadetblue},
		{id:"groupInt",color:colors.cadetblue, colorRgb:colorsRgb.cadetblue},
		{id:"indvPurs",color:colors.cadetblue, colorRgb:colorsRgb.cadetblue},
		{id:"inqBasLea",color:colors.cadetblue, colorRgb:colorsRgb.cadetblue},
		{id:"opEnd",color:colors.cadetblue, colorRgb:colorsRgb.cadetblue},
		{id:"pacProc",color:colors.cadetblue, colorRgb:colorsRgb.cadetblue},
		{id:"reasRefl",color:colors.cadetblue, colorRgb:colorsRgb.cadetblue},
		{id:"selSelProc",color:colors.cadetblue, colorRgb:colorsRgb.cadetblue},
		{id:"procVariety",color:colors.cadetblue, colorRgb:colorsRgb.cadetblue},
		
		{id:"authAud",color:colors.dodgerblue, colorRgb:colorsRgb.dodgerblue},
		{id:"feedAssProd",color:colors.dodgerblue, colorRgb:colorsRgb.dodgerblue},
		{id:"selSelProd",color:colors.dodgerblue, colorRgb:colorsRgb.dodgerblue},
		{id:"transProd",color:colors.dodgerblue, colorRgb:colorsRgb.dodgerblue},
		{id:"prodVariety",color:colors.dodgerblue, colorRgb:colorsRgb.dodgerblue}
	];
	
	$scope.printPflMatrix=function(){
		var leftCorner={x:10,y:10};
		var x=leftCorner.x;
		var y=leftCorner.y;
		
		var doc = new jsPDF('landscape'); 
		
		// title info
		y=writePdfLine(doc,x,y,'Guide for Selecting Differentiation Strategies for High Ability Learners',colors.grey);
		y=writePdfLine(doc,x,y,'Name: '+$scope.userInfo.pflName,colors.grey);
		y=writePdfLine(doc,x,y,'Grade: '+$scope.userInfo.pflGrade,colors.grey);
		y=writePdfLine(doc,x,y,'Date: '+moment(angular.copy($scope.userInfo.pflDate)).format("DD MMM YYYY"),colors.grey);
		
		//display suggested strategies
		var topY=writePdfLine(doc,195,10,'Suggested Differentiation Strategies: ',colors.grey);
		for(var i=0;i<$scope.topDiffOpts.length;i++){	
			doc.ellipse(200, topY-1, 1, 1);		
			topY=writePdfLine(doc,202,topY,$scope.topDiffOpts[i],colors.black);			
		}
		
		//build out headers
		var dx=9;
		var dy=6;
		
		writePdfText(doc,x+65+((7*dx)/2)-3,y,"Content",colors.blue,0);
		writePdfText(doc,x+65+7*dx+((10*dx)/2)-3,y,"Process",colors.cadetblue,0);
		writePdfText(doc,x+65+17*dx+((5*dx)/2)-3,y,"Product",colors.dodgerblue,0);
		
		//var i=0;
		var topY=y+25;
		for(var i=0;i<orderedDiffOptsArray.length;i++){
			writePdfText(doc,x+65+i*dx,y+25,$scope.diffOptions[orderedDiffOptsArray[i].id].title,orderedDiffOptsArray[i].color,30);
		}
		var totalDiffs=orderedDiffOptsArray.length;
		
		//indicators		
		var i=0;		
		for (var pflInd in $scope.indicators) {
			writePdfText(doc,x+3,y+30+i*dy,$scope.indicators[pflInd].title,colors.grey,0);
			doc.setFillColor(colors.white);	
			if ($scope.indicators[pflInd].isSelected) {
				doc.setFillColor(colors.grey);	
			}
			doc.ellipse(x, y+30-1+i*dy, 2, 2,'FD');
			i=i+1;
		}
		var totalInds=i;
		
		//grid
		doc.setLineWidth(0.1);		
		doc.setDrawColor(colorsRgb.black.r,colorsRgb.black.g,colorsRgb.black.b);
		
		//horizontal lines
		var i=-1;				
		for (var pflInd in $scope.indicators) {			
			doc.line(x+3,y+30+i*dy+1, x+60+(totalDiffs-1)*dx+6, y+30+i*dy+1);	
			for(var j=0;j<orderedDiffOptsArray.length;j++){
				//writePdfText(doc,x+65+i*dx,y+25,$scope.diffOptions[orderedDiffOptsArray[i].id].title,orderedDiffOptsArray[i].color,30);
				fillDiffOptsByIndicator(
					doc,
					x+60+j*dx,
					y+30+(i+1)*dy,
					$scope.indicators[pflInd],
					$scope.diffOptions[orderedDiffOptsArray[j].id],
					orderedDiffOptsArray[j].colorRgb
				);
				//reset draw colors
				doc.setLineWidth(0.1);		
				doc.setDrawColor(colorsRgb.black.r,colorsRgb.black.g,colorsRgb.black.b);
			}							
			i=i+1;
		}		
		//build last horizontal line
		doc.line(x+3,y+30+i*dy+1, x+60+(totalDiffs-1)*dx+6, y+30+i*dy+1);

		//vertical lines
		var i=0;				
		for (var diffOpt in $scope.diffOptions) {
			doc.line(x+60+i*dx-3, y+30+1-dy, x+60+i*dx-3, y+30+(totalInds)*dy+1-dy); 
			doc.line(x+60+i*dx-3, y+30+1-dy, x+60+(i+1)*dx-3, y+20); //angled indicator line
			i=i+1;
		}		
		//build last vertical line
		doc.line(x+60+i*dx-3, y+30+1-dy, x+60+i*dx-3, y+30+(totalInds)*dy+1-dy);
		doc.line(x+60+i*dx-3, y+30+1-dy, x+60+(i+1)*dx-3, y+20); //angled indicator line
		
		doc.output("dataurlnewwindow");
	}
	
	loadMatrix();
	
  
//end of controller
});