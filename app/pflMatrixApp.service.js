app.service("pflMatrixService", function ($http, $q) {
		
		//public api
		return({
			getIndicatorList:getIndicatorList,
			getOrderedIndicatorList:getOrderedIndicatorList,
			getDifferentiationOptions:getDifferentiationOptions,
			initDifferentiationOptionsRanking:initDifferentiationOptionsRanking,
			updateDifferentiationOptionsRanking:updateDifferentiationOptionsRanking
        });	
		
		
		function getIndicatorList(){
			return pflMatrix.indicators;			
		}

		function getOrderedIndicatorList(){
			//very hack way to do this....
			var orderedIndicators = [];
			for(var i=0; i < Object.keys(pflMatrix.indicators).length;i++){
				orderedIndicators.push({});
			}
			for(var diffInd in pflMatrix.indicators){
				orderedIndicators[pflMatrix.indicators[diffInd].dispOrder]=diffInd;
			}
			
			return orderedIndicators;
			
		}
		
		function getDifferentiationOptions(){
			return pflMatrix.diffOptions;
		}
		
		function initDifferentiationOptionsRanking(){
			var diffOptsRank={};
			for(var diffOpt in pflMatrix.diffOptions){
				diffOptsRank[diffOpt]={}; 
				diffOptsRank[diffOpt].availIndicators=angular.copy(pflMatrix.diffOptions[diffOpt].indicators); 
				diffOptsRank[diffOpt].selectedIndicators=[];
				diffOptsRank[diffOpt].rank=0; //defaults to all being possible options
				diffOptsRank[diffOpt].displayRank=1; 
			}
			//console.log('diffOptsRank',diffOptsRank);
			return diffOptsRank;
		}		
	
		function updateDifferentiationOptionsRanking(selectedIndicator, isSelected, diffOptsRank){
			var ranksClusters=[];
			for(var diffOpt in diffOptsRank){
				if(diffOptsRank[diffOpt].availIndicators.indexOf(selectedIndicator)>=0){
					var index = diffOptsRank[diffOpt].selectedIndicators.indexOf(selectedIndicator);
					if(isSelected && index<0){
						diffOptsRank[diffOpt].selectedIndicators.push(selectedIndicator);
					}
					else if(!isSelected && index>=0){
						diffOptsRank[diffOpt].selectedIndicators.splice(index,1);
					}
					diffOptsRank[diffOpt].rank = Math.floor((diffOptsRank[diffOpt].selectedIndicators.length * 100)/diffOptsRank[diffOpt].availIndicators.length);
				}
				if(ranksClusters.indexOf(diffOptsRank[diffOpt].rank)<0){
					ranksClusters.push(diffOptsRank[diffOpt].rank);
				}				
			}
			ranksClusters.sort(function(a,b){return b-a;});
			//console.log('ranksClusters',ranksClusters);
			var topRankedStrategies=[];
			for(var diffOpt in diffOptsRank){
				diffOptsRank[diffOpt].displayRank = ranksClusters.indexOf(diffOptsRank[diffOpt].rank) + 1;
				if((diffOptsRank[diffOpt].displayRank>0&&diffOptsRank[diffOpt].displayRank<=3) && topRankedStrategies.length<3){
					topRankedStrategies.push(pflMatrix.diffOptions[diffOpt].title);
				}
			}
			return topRankedStrategies;
		}
	
 
//end of service
});