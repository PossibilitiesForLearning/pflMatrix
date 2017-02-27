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
	
    /*$scope.initCatalog = function () {
        //load available catalogs
        $scope.getCatalogs();        
    }


    var req_getCatalogs = null;
    $scope.loading_getCatalogs = false;
    $scope.catalogs = [];

    $scope.getCatalogs = function() {
        $scope.loading_getCatalogs= true;
        (req_getCatalogs = bbCatalogService.getCatalogs()).then(
			function(response ) {			
			    $scope.loading_getCatalogs = false;
			    console.log(response);
			    $scope.catalogs = response.data;

			},	        
			function( errorMessage ) {
			    $scope.loading_getCatalogs = false;
			    console.log("Error:", errorMessage);
			}	
		);	
    }

    var req_getCategories = null;
    $scope.loading_getCategories = false;
    $scope.categories = [];

    $scope.getCategoriesByCatalog = function (catalogId) {
        $scope.loading_getCategories = true;
        (req_getCategories = bbCatalogService.getCategoriesByCatalog(catalogId)).then(
			function (response) {
			    $scope.loading_getCategories = false;
			    console.log(response);                
			    $scope.categoryHierarchy = [];
			    if (response.data.length > 0) {
			        console.log("categories found");
			        var categories = response.data;
			        for (var i = 0; i < categories.length; i++) {
			            $scope.getCategoryHierarchy(categories[i].categoryId, categories[i]);
			        }
			    }
			    else {
			        $scope.treeConfig.version++;
			    }
			},
			function (errorMessage) {
			    $scope.loading_getCategories = false;
			    console.log("Error:", errorMessage);
			}
		);
    }



    var req_getCategoryHierarchy = null;
    $scope.loading_getCategoryHierarchy = false;
    $scope.categoryHierarchy = [];

    $scope.getCategoryHierarchy = function (categoryId,categoryObj) {
        $scope.loading_getCategoryHierarchy = true;
        (req_getCategoryHierarchy = bbCatalogService.getCategoryHierarchy(categoryId)).then(
			function (response) {
			    $scope.loading_getCategoryHierarchy = false;
			    console.log(response);
			    if (response.data.length > 0) {
			        for (var i = 0; i < response.data.length; i++) {
			            var curTreeNode = response.data[i];
			            if (!curTreeNode.parent) {
			                curTreeNode.parent = "#";
			                curTreeNode.state = { opened: true };
			            } else {
			                curTreeNode.state = { opened: false };
			            }
			            $scope.categoryHierarchy.push(curTreeNode);
			        }
			        $scope.treeConfig.version++;
			    }
			    else {
			        //add empty roots
			        var emptyRoot = {
			            id: categoryObj.categoryId + '',
			            categoryId: categoryObj.categoryId,
			            text: categoryObj.categoryName,
			            parent: '#',
			            state:{ opened: true }
			        }
			        $scope.categoryHierarchy.push(emptyRoot);
			        $scope.treeConfig.version++;
			    }

			},
			function (errorMessage) {
			    $scope.loading_getCategoryHierarchy = false;
			    console.log("Error:", errorMessage);
			}
		);
    }

    var req_getProductsByCategory = null;
    $scope.loading_getProductsByCategory = false;
    $scope.products = [];

    $scope.getProductsByCategory = function (categoryId) {
        $scope.loading_getProductsByCategory = true;
        (req_getProductsByCategory = bbCatalogService.getProductsByCategory(categoryId)).then(
			function (response) {
			    $scope.loading_getProductsByCategory = false;
			    console.log(response);
			    $scope.products = response.data;

			},
			function (errorMessage) {
			    $scope.loading_getProductsByCategory = false;
			    console.log("Error:", errorMessage);
			}
		);
    }

    $scope.currentCategoryId = 0;
    $scope.udpateProducts = function () {
        var selectedCategoryId = $("#categoryHierarchy").jstree("get_selected", null, true);
        console.log(Number(selectedCategoryId[0]));
        $scope.currentCategoryId = Number(selectedCategoryId[0]);
        $scope.getProductsByCategory(Number(selectedCategoryId[0]));

    }

    $scope.treeConfig = {
        core: {
            multiple: false,
            animation: true,
            error: function (error) {
                $log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
            },
            check_callback: true,
            worker: true
        },
        version: 1,
        plugins: ['types']
    };

    /////////////////////Add /edit catalog objects


    ////Catalogs
    $scope.getCatalogObjectById=function(catalogId){
        for(var i=0;i<$scope.catalogs.length;i++){
            if($scope.catalogs[i].catalogId==catalogId){
                return $scope.catalogs[i];
            }
        }
        return null;
    }

    $scope.isEditCatalog = false;
    $scope.tempCatalog = {};
    $scope.editCatalog = function (catalogId) {
        console.log(catalogId);
        angular.copy($scope.getCatalogObjectById(catalogId), $scope.tempCatalog);
        $scope.isEditCatalog = true;
    }

    var req_saveCatalog = null;
    $scope.loading_saveCatalog = false;
    $scope.saveCatalog = function (catalogObj) {
        //{"catalogName" : "api Test 1",  "catalogId" : 0,  "categories":[]}
        var reqObj = {
            catalogName: catalogObj.catalogName,
            catalogId: catalogObj.catalogId,
            categories: catalogObj.categories
        };

        $scope.loading_saveCatalog = true;
        (req_addNewCatalog = bbCatalogService.saveCatalog(reqObj)).then(
			function (response) {
			    $scope.loading_saveCatalog = false;
			    console.log(response);
			    $scope.getCatalogs();

			},
			function (errorMessage) {
			    $scope.loading_saveCatalog = false;
			    console.log("Error:", errorMessage);
			}
		);
    }

    $scope.isAddCatalog = false;
    $scope.addCatalog = function () {
        //{"catalogName" : "api Test 1",  "catalogId" : 0,  "categories":[]}
        $scope.tempCatalog = {
            catalogName: "Catalog Name",
            catalogId: 0,
            categories: []
        };

        $scope.isAddCatalog = true;
    }

    var req_addNewCatalog = null;
    $scope.loading_addNewCatalog = false;
    $scope.addNewCatalog = function (catalogObj) {
        //{"catalogName" : "api Test 1",  "catalogId" : 0,  "categories":[]}
        var reqObj = {
            catalogName: catalogObj.catalogName,
            catalogId: catalogObj.catalogId,
            categories: catalogObj.categories
        };

        $scope.loading_addNewCatalog = true;
        (req_addNewCatalog = bbCatalogService.addNewCatalog(reqObj)).then(
			function (response) {
			    $scope.loading_addNewCatalog = false;
			    console.log(response);
			    $scope.getCatalogs();

			},
			function (errorMessage) {
			    $scope.loading_addNewCatalog = false;
			    console.log("Error:", errorMessage);
			}
		);
    }

    var req_deleteCatalog = null;
    $scope.loading_deleteCatalog = false;
    $scope.deleteCatalog = function (catalogId) {
        if (!confirm("Are you sure you want to delete this catalog?\n\nAll products and categories will also \nbe deleted by this action.")) {
            return;
        }

        $scope.loading_deleteProduct = true;
        (req_deleteCatalog = bbCatalogService.deleteCatalog(catalogId)).then(
			function (response) {
			    $scope.loading_deleteCatalog = false;
			    console.log(response);
			    $scope.getCatalogs();
			    $scope.selectedCatalog = null;
			    $scope.categories = [];
			    $scope.products = [];
			    $scope.currentCategoryId = 0;

			},
			function (errorMessage) {
			    $scope.deleteCatalog = false;
			    console.log("Error:", errorMessage);
			}
		);
    }


    //Categories
    $scope.getCategoryObjectById = function (categoryId) {
        for (var i = 0; i < $scope.categoryHierarchy.length; i++) {
            if ($scope.categoryHierarchy[i].categoryId == categoryId) {
                return $scope.categoryHierarchy[i];
            }
        }
        return null;
    }

    $scope.isEditCategory = false;
    $scope.tempCategory = {};
    $scope.editCategory = function (categoryId) {
        console.log(categoryId);
        angular.copy($scope.getCategoryObjectById(categoryId), $scope.tempCategory);
        $scope.tempCategory.categoryName = $scope.tempCategory.text;
        $scope.isEditCategory = true;
        console.log($scope.tempCategory);
    }

    var req_saveCategory = null;
    $scope.loading_saveCategory = false;
    $scope.saveCategory = function (categoryObj,catalogId) {
        //{"categoryName" : "cat3",  "categoryId" : 0,  "subCategories":[], "products":[]}
        var reqObj = {
            categoryName: categoryObj.categoryName,
            categoryId: categoryObj.categoryId,
            subCategories: [],
            products: []
        };

        $scope.loading_saveCategory = true;
        (req_saveCategory = bbCatalogService.saveCategory(reqObj)).then(
			function (response) {
			    $scope.loading_saveCategory = false;
			    console.log(response);
			    $scope.getCategoriesByCatalog(catalogId);

			},
			function (errorMessage) {
			    $scope.loading_saveCategory = false;
			    console.log("Error:", errorMessage);
			}
		);
    }

    $scope.isAddCategory = false;
    $scope.addCategory = function () {
        //{"categoryName" : "cat3",  "categoryId" : 0,  "subCategories":[], "products":[]}
        $scope.tempCategory = {
            categoryName: "Category Name",
            catalogId: 0,
            subCategories: [],
            products:[]
        };

        $scope.isAddCategory = true;
    }

    var req_addNewCategoryToCatalog = null;
    $scope.loading_addNewCategoryToCatalog = false;
    $scope.addNewCategoryToCatalog = function (categoryObj,catalogId) {
        //{"categoryName" : "cat3",  "categoryId" : 0,  "subCategories":[], "products":[]}
        var reqObj = {
            categoryName: categoryObj.categoryName,
            categoryId: 0,
            subCategories: [],
            products: []
        };

        $scope.loading_addNewCategoryToCatalog = true;
        (req_addNewCatalog = bbCatalogService.addNewCategoryToCatalog(reqObj,catalogId)).then(
			function (response) {
			    $scope.loading_addNewCategoryToCatalog = false;
			    console.log(response);
			    $scope.getCategoriesByCatalog(catalogId);

			},
			function (errorMessage) {
			    $scope.loading_addNewCategoryToCatalog = false;
			    console.log("Error:", errorMessage);
			}
		);
    }

    var req_addNewCategoryToCategory = null;
    $scope.loading_addNewCategoryToCategory = false;
    $scope.addNewCategoryToCategory = function (categoryObj, catalogId) {
        //{"categoryName" : "cat3",  "categoryId" : 0,  "subCategories":[], "products":[]}
        var reqObj = {
            categoryName: categoryObj.categoryName,
            categoryId: 0,
            subCategories: [],
            products: []
        };

        $scope.loading_addNewCategoryToCategory = true;
        (req_addNewCategoryToCategory = bbCatalogService.addNewCategoryToCategory(reqObj, $scope.currentCategoryId)).then(
			function (response) {
			    $scope.loading_addNewCategoryToCategory = false;
			    console.log(response);
			    $scope.getCategoriesByCatalog(catalogId);

			},
			function (errorMessage) {
			    $scope.loading_addNewCategoryToCategory = false;
			    console.log("Error:", errorMessage);
			}
		);
    }


    var req_deleteCategory = null;
    $scope.loading_deleteCategory = false;
    $scope.deleteCategory = function (categoryId, catalogId) {
        if (!confirm("Are you sure you want to delete this category?\n\nAll products will also be deleted by this action.")) {
            return;
        }

        $scope.loading_deleteCategory = true;
        (req_deleteCategory = bbCatalogService.deleteCategory(categoryId)).then(
			function (response) {
			    $scope.loading_deleteCategory = false;
			    console.log(response);
			    $scope.getCategoriesByCatalog(catalogId);
			    $scope.products = [];
			    $scope.currentCategoryId = 0;

			},
			function (errorMessage) {
			    $scope.deleteCategory = false;
			    console.log("Error:", errorMessage);
			}
		);
    }


    ////Products
    $scope.isEditProduct = false;
    $scope.tempProduct = {};
    $scope.editProduct = function (productObj) {
        console.log(productObj);
        angular.copy(productObj, $scope.tempProduct);
        $scope.isEditProduct = true;
    }

    var req_saveProduct = null;
    $scope.loading_saveProduct = false;
    $scope.saveProduct = function (productObj) {
        //{"productName" : "product 2 update",  "productId" :0,  "description": "first product update" ,  "price":2.34 }
        var reqObj = {
            productName: productObj.productName,
            productId: productObj.productId,
            description: productObj.description,
            price: Number(productObj.price)
        };

        $scope.loading_saveProduct = true;
        (req_saveProduct = bbCatalogService.saveProduct(reqObj)).then(
			function (response) {
			    $scope.loading_saveProduct = false;
			    console.log(response);
			    $scope.getProductsByCategory($scope.currentCategoryId);

			},
			function (errorMessage) {
			    $scope.loading_saveProduct = false;
			    console.log("Error:", errorMessage);
			}
		);
    }

    var req_deleteProduct = null;
    $scope.loading_deleteProduct = false;
    $scope.deleteProduct = function (productId) {
        if (!confirm("Are you sure you want to delete this product?")) {
            return;
        }

        $scope.loading_deleteProduct = true;
        (req_saveProduct = bbCatalogService.deleteProduct(productId)).then(
			function (response) {
			    $scope.loading_deleteProduct = false;
			    console.log(response);
			    $scope.getProductsByCategory($scope.currentCategoryId);

			},
			function (errorMessage) {
			    $scope.loading_deleteProduct = false;
			    console.log("Error:", errorMessage);
			}
		);
    }


    $scope.isAddProduct = false;
    $scope.addProduct = function () {
        //{"productName" : "product 2 update",  "productId" :0,  "description": "first product update" ,  "price":2.34 }
        $scope.tempProduct = {
            productName: "Product Name",
            productId: 0,
            description: "Product Description",
            price: 0.00
        };

        $scope.isAddProduct = true;
    }

    var req_addProduct = null;
    $scope.loading_addProduct = false;
    $scope.addNewProductToCategory = function (productObj) {
        //{"productName" : "product 2 update",  "productId" :0,  "description": "first product update" ,  "price":2.34 }
        var reqObj = {
            productName: productObj.productName,
            productId: productObj.productId,
            description: productObj.description,
            price: Number(productObj.price)
        };

        $scope.loading_addProduct = true;
        (req_addProduct = bbCatalogService.addNewProductToCategory(reqObj, $scope.currentCategoryId)).then(
			function (response) {
			    $scope.loading_addProduct = false;
			    console.log(response);
			    $scope.getProductsByCategory($scope.currentCategoryId);

			},
			function (errorMessage) {
			    $scope.loading_addProduct = false;
			    console.log("Error:", errorMessage);
			}
		);
    }*/

    


//end of controller
});