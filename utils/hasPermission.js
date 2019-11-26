let permissionsConfig = require("../config/permissions.config.json");

function rejectRequest(res) {
    let messege = "Permission denied.";
    let statusCode = 403;
    res.status(statusCode).send(messege);
}

module.exports = function (tokenData, permissionKey, req, res, ) {

    if (!tokenData || !tokenData.user_role || !tokenData.user_id) {
        rejectRequest(res);
        return false;
    }

    let role = tokenData.user_role;

    if (!permissionsConfig.roles[role]) {
        rejectRequest(res);
        return false;
    }

    let rolePermissions = permissionsConfig.roles[role];

    if (rolePermissions[permissionKey]) {
        return true;
    } else {
        rejectRequest(res);
        return false;
    };
}