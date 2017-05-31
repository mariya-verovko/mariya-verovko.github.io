var app = angular.module('app', [])

    .controller("ScrollController", ['$scope', '$location', '$anchorScroll', '$window', function ($scope, $location, $anchorScroll, $window) {
        $scope.activePage = 1;

        var currentScrollPosition = 0;
        var staticHidden = false;
        var pageChanged = false;
        var linkedScroll = false;
 
        

        angular.element($window).bind("scroll", function () {
            console.log('scroll');
            if (!linkedScroll) {
            var newScrollPosition = $window.pageYOffset;
            var offset = newScrollPosition - currentScrollPosition;
            var direction = (offset > 0) ? "up" : "down";
            var currentPage = $scope.activePage;

            if (Math.abs(offset) > 50) {

                if ((direction == "up") && (currentPage < 4)) {
                    currentPage++;
                    pageChanged = true;
                }
                if ((direction == "down") && (currentPage > 1)) {
                    currentPage--;
                    pageChanged = true;
                }

                if (pageChanged) {
                    goToPage(currentPage);

                    if (currentPage == 4) {
                        staticHidden = hideStatic();
                        console.log(staticHidden);
                    } else if (staticHidden) {
                        staticHidden = showStatic();
                    }
                    pageChanged = false;
                }
                currentScrollPosition = $window.pageYOffset;
            }
            } else {
                currentScrollPosition = $window.pageYOffset;
                linkedScroll = false;
            }

        })

        function hideStatic() {
            document.getElementById("static_data").style.visibility = "hidden";
            document.getElementById("footer_div").style.visibility = "hidden";
            return true;
        }

        function showStatic() {
            document.getElementById("static_data").style.visibility = "visible";
            document.getElementById("footer_div").style.visibility = "visible";
            return false;
        }

        $scope.jumpToPage = function (page) {
            if ($scope.activePage == 4) showStatic();
            goToPage(page);
            linkedScroll = true;
        }

        goToPage = function (page) {
            
            $location.hash('page_' + page);
            $anchorScroll();
            $scope.activePage = +page;
            console.log($scope.activePage);
            
        }

        var shifted = false;
        var shift = 110;

        function carusel() {
            var caruselList = document.getElementById("carusel_list");
            if (!shifted) {
                caruselList.style.marginLeft = "-" + shift + 'px';
                shifted = true;
            } else {
                caruselList.style.marginLeft = '0px';
                shifted = false;
            }
        }

        var timerId = setInterval(carusel, 1500);

        
        $scope.carusel = function () {
            timerId = setInterval(carusel, 1500);
        }
        

        $scope.stopCarusel = function () {
            clearInterval(timerId);
        }
    }]);