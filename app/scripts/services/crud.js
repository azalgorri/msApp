'use strict';

/**
 * @ngdoc service
 * @name msAppApp.crud
 * @description
 * # crud
 * Service in the msAppApp.
 */
angular.module('msAppApp')
  .service('crudService', ["$http", function ($http)
  {
    this.appNamespace = "/mobile-store";
    this.ajaxData = {};
    this.ajaxData["viewModels"] = {};

    this.ajaxObjectCall = function (actionUrl, key, postData)
    {
      var response = $http({
        method: 'POST',
        url: actionUrl,
        data: JSON.stringify(this.ajaxData),
        dataType: 'json',
        contentType: 'application/json'
      })
        .error(function(data, status, headers, config) {
          alert("Ha fallado la petici%oacute;n. Estado HTTP:"+status);
        });

      return response;
    };

    this.addObjToData = function (key, obj)
    {
      if(obj)
      {
        var dataObj = (typeof obj == 'object') ? JSON.stringify(obj) : obj;
        this.ajaxData["viewModels"][key] = dataObj;
      }
    };

    this.removeFromData = function (key)
    {
      if(key)
      {
        delete this.ajaxData["viewModels"][key];
      }
    };

    this.execute = function (action, entity, namespace, valor, option)
    {
      var url = this.appNamespace;
      var key = "";

      if(!valor)
        valor = "";

      if(namespace && namespace != "")
        url += "/"+namespace;

      switch (action)
      {
        // SELECT ENTITY
        case 'select':
          key = 'seleccion';
          url += "/select-" + entity;
          break;

        // CREATE ENTITY
        case 'create':
          this.removeFromData('modificacion');
          key = 'alta';
          url += "/new-" + entity;
          break;

        // UPDATE ENTITY
        case 'update':
          this.removeFromData('alta');
          key = 'modificacion';
          url += "/new-" + entity;
          break;

        // READ ENTITY
        case 'read':
          key = 'filtro';
          url += "/find-" + entity;
          break;

        // DELETE ENTITY
        case 'delete':
          key = 'baja';
          url += "/delete-" + entity;
          break;

        // DELETE ENTITY
        case 'complete':
          this.addObjToData("option", option);
          key = 'completar';
          url += "/complete-" + entity;
          break;
      }

      this.addObjToData(key, valor);

      return  $http({
        method: 'POST',
        url: url,
        data: JSON.stringify(this.ajaxData),
        dataType: 'json',
        contentType: 'application/json'
      })
        .error(function(data, status, headers, config) {
          alert("Ha fallado la peticion. Estado HTTP:"+status);
        });
    };
  }]);
