'use strict';

/**
 * @ngdoc directive
 * @name msAppApp.directive:msColorpicker
 * @description
 * # msColorpicker
 */
angular.module('msAppApp')
  .directive('msColorpicker', function () {
    var directiveDefinitionObject ={
      restrict:"EA",
      replace : true,
      templateUrl: 'scripts/directives/ms-color-picker.html',
      scope:{
        colors:"=",
        model:"="
      },
      link: function(scope, element, attrs)
      {
        scope.$watch('model', function ()
        {
          if(scope.model && scope.model.color)
          {
            var selColor = '#' + scope.model.color;

            controlColor(scope, element);
          }
        });

        scope.selectColor = function (ev)
        {
          var newColor = ev.currentTarget.getAttribute('data-color');
          scope.model.color = newColor;
          controlColor(scope, element);
        };

        var lastDiv;

        var controlColor = function (scope, element)
        {
          if(lastDiv)
            lastDiv.removeClass('selectedOneColor');

          var div = element.find('[data-color="'+scope.model.color+'"]');
          lastDiv = div;

          div.addClass('selectedOneColor');
        }
      }
    };

    return directiveDefinitionObject;
  });
