function RoadMapCtrl($scope, $http) {
    $http.get('data/roadmap.json').success(function(data) {
        //console.log(data)
        $scope.data = data;
        addPath(data.Shifu, '');
        addPath(data.ShifuDashboard, '');
        $scope.features = [data.Shifu, data.ShifuDashboard];
        $scope.statusLkp = {};
        $scope.data.meta.statusIndex.forEach(function(status) {
            status.show = true;
            $scope.statusLkp[status.status] = status;
        })

       
    })

    $scope.view = 'tree';
    $scope.showDefinition = false;

    function addPath(feature, prefix) {
        if (feature.type == "Feature") {
            feature.path = prefix + feature.name;
        } else if (feature.type == "FeatureGroup") {
            feature.path = prefix + feature.name 
            feature.features.forEach(function(f) {
                addPath(f, feature.path + ' > ');
            })
        }
    }

    $scope.expandAll = function(feature) {
        if (feature.type == "FeatureGroup") {
            feature.expand = true;
            feature.features.forEach(function(feature) {
                $scope.expandAll(feature);
            })
        }
    }

    $scope.showAllStatus = function() {
        $scope.data.meta.statusIndex.forEach(function(status) {
            status.show = true;          
        })
    }

    $scope.hideAllStatus = function() {
        $scope.data.meta.statusIndex.forEach(function(status) {
            status.show = false;          
        })
    }


    $scope.emptyGroupFilter = function(feature) {
        //console.log(countDisplayedFeatures(feature));
        if (countDisplayedFeatures(feature) > 0) {
            return true;
        }
    }

    var countDisplayedFeatures = function(feature) {
        if (feature.type == "Feature") {
            if ($scope.statusLkp[feature.status].show) {
                return 1;
            } else {
                return 0;
            }
        } else {
            var count = 0;
            feature.features.forEach(function(f) {
                count += countDisplayedFeatures(f);
            })
            return count;
        }
    }

}