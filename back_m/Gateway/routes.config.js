const GatewayProvider = require('./controllers/gateway.provider');
const AuthorizationValidation = require('../security/authorization/authorization.validation');
const AuthorizationPermission = require('../security/authorization/authorization.permission');
const config = require('../env.config');

const Master = config.permissionLevels.Master;
const Member = config.permissionLevels.Member;
const Surfer = config.permissionLevels.Surfer;

exports.routesConfig = function (app) {
    app.post('/gateways', [
        GatewayProvider.insert
    ]);
    app.get('/gateways', [
        AuthorizationValidation.validJWTNeeded,
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        GatewayProvider.list
    ]);
    /*app.get('/gateways/:gatewayId', [
        AuthorizationValidation.validJWTNeeded,
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        GatewayProvider.getById
    ]);*/
   

   /* app.delete('/gateways/:gatewayId', [
        AuthorizationValidation.validJWTNeeded,
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        GatewayProvider.removeById
    ]);*/
/*
    app.patch('/gateways/:gatewayId', [
        AuthorizationValidation.validJWTNeeded,
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        GatewayProvider.patchById
    ]);*/

    //delete device by GTW_Id
       app.delete('/gateways/:GTW_ID', [
        AuthorizationValidation.validJWTNeeded,
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        GatewayProvider.removeName
    ]);

    //patch device by GTW_Id

    app.patch('/gateways/:GTW_ID', [
        AuthorizationValidation.validJWTNeeded,
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        GatewayProvider.patch
    ]);


    
// get by GTW_ID 
    app.get('/gateways/:GTW', [
        AuthorizationValidation.validJWTNeeded,
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        GatewayProvider.getID
    ]);

    /**
     * In a PUT request, the enclosed entity is considered to be
     * a modified version of the resource stored on the origin server,
     * and the client is requesting that the stored version be replaced.
     * So all the attributes are to be updated!
     * Thus this is a privileged action done only by administrator
     */
   /* app.put('/users/:userId', [
        AuthorizationValidation.validJWTNeeded,
        AuthorizationPermission.minimumPermissionLevelRequired(Master),
        AuthorizationPermission.sameUserCantDoThisAction,
        IdentityProvider.putById
    ]);*/

    /**
     * PATCH specifies that the enclosed entity contains a set of instructions describing
     * how a resource currently residing on the origin server should be modified to produce a new version.
     * So, some attributes could or should remain unchanged.
     * In our case, a regular user cannot change permissionLevel!
     * Thus only same user or admin can patch without changing identity permission level.
     */
    
};