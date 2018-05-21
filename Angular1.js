app = angular.module('app1', [])
app.controller('ctrl1', function($scope, $http, FactoryName) {



	$http( {
		method: 'GET',
		url: 'http://localhost:8080/test/'
	}).then(function successCallback(response){
		console.log("Connection Succeeded");
	}, function errorCallback(response) {
		console.log('Connection Failed');
	});


	$scope.testName = "asdasd";
	
    $scope.mod = {

        name: "Mathe",
        credit: 2,
        note: 3

    };
	

    $scope.module = [{ "mod": $scope.mod  }];

    $scope.addToList = function (vName, vCredit, vNote) {

        $scope.mod = {
            name: vName,
            credit: vCredit,
            note: vNote
        };

        $scope.module.push(angular.copy($scope.mod));	// angular.copy damit es nichts in der Tabelle überschreibt
    }

    $scope.addToList = function (modul) {

        $scope.module.push(angular.copy($scope.modul));	// angular.copy damit es nichts in der Tabelle überschreibt
    }

	
	
	$scope.loadLocalStorage = function() {		// Alle Werte aus dem LocalStorage in tabelle eintragen
		if(localStorage.key(localStorage.length-1)) {

		for (i=(localStorage.length-1); i>=0; i--) {
		//parseInt(localStorage.key(localStorage.length-1))
		//if (localStorage.getItem(i)) {	// Abfrage ob es das Item gibt oder es gelöscht wurde
			$scope.addToList(JSON.parse(localStorage.getItem(localStorage.key(i)))[0] ,JSON.parse(localStorage.getItem(localStorage.key(i)))[1], JSON.parse(localStorage.getItem(localStorage.key(i)))[2] );
		}
		}
	}

    $scope.handleDelete = function(index) {

    	$scope.module.splice(index, 1);
		localStorage.removeItem(index-1);
	}


	$scope.deleteRow = function(index) {

    	$scope.module.splice(index, 1);
    	$http.delete('http://localhost:8080/del/:'+index);
	}

    $scope.dele = function() {

        $scope.module.splice(1, 1);
        $http.delete('http://localhost:8080/del/:'+1);
    }

	$scope.handleAdd = function () {	// inputs unnötig

		//$scope.module.push(angular.copy($scope.mod));
		
		var value = [$scope.mod.name, $scope.mod.credit, $scope.mod.note];

		$http.post('http://localhost:8080/setMod', JSON.stringify($scope.mod)).then(function successCallback(response) {
			$scope.module.push(angular.copy($scope.mod));
			console.log("post works");
		}), (function failedCallback () {
			alert("failed");
		});
	};
	
	//FactoryName.loadLocalStorage();

	$scope.putTable = function() {

    	$http.get('http://localhost:8080/getMod').then(function successCallback(response) {
    		$scope.module = response.data;	// Wenn es response gibt dann Tabelle = alle Daten aus dem Server
		}), (function errorCallback(response) {
			console.log('geht nicht');
		})
	};

	//$scope.loadLocalStorage();
	
	FactoryName.test($scope);
	
});


app.factory('FactoryName', function() {
	return {
		
			test: function(scope) {
			
				console.log(scope.testName);
			}
			
		}
});
	



app.directive('tableRow', function() {
	return {
		templateUrl: 'Directive.html',
		restrict: 'EA', // 'A' oder nur 'E'
		scope:true,	// verschiedene Scopes und Variablen, jedes Element bekommt eigenes scope wird Vererbt

		scope: {
			modul: '=m',	// modul: das was in der directive angezeigt wird; '=mod' istdas HTML-Attribut; die Variable im Controller die ins Directive übergeben wird kommt in HTML m='VariableName'
			test: '=test',
			//onAdd: '&',
			onDelete: '&'
		},

		/*
		scope.values.name = "asd";
		scope.values.credit = 1;
		scope.values.note = 2.3;
		*/
		
		link: function (scope) {

			/*
            scope.add = function() {
                scope.onAdd(scope.mod);
            };
			*/

			scope.delete = function() {
				//scope.onDelete();
				scope.onDelete();
			};


		//scope.r=0;
		//scope.g=120;
		//scope.b=2;

		scope.rgb.r = 255;	// Überschreibt andere Werte

		//console.log(scope);

		}

		
	};
});



function calculateAverage() {
	var a = document.getElementsByClassName("r");
	
	var cred = document.getElementByClassName("c");
	alert("asd");
	alert(cred[0].innerHTML);
	
	var durchschnitt = 0;
	var gesCred = 0;
	for (i=0; i<a.length; i++) {
		getCred += cred[i].innerHTML;
		durchschnitt += Number(a[i].innerHTML)* Number(cred[i].innerHTML);
	}
	
	durchschnitt = durchschnitt / gesCred;
	
	document.getElementById("durchschnitt").innerHTML = durchschnitt / a.length;
	
	localStorage.setItem("asd");
}
