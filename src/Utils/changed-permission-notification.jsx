/**
 * this fucntion run an onchange event for notification object when
 * reset permission or set permisson to prompt it means default or denied
 * if user loggined or current_token existed in local storage call the ajaxToServer fucntion
 * to send the ajax request
 * @returns {promisc} - promise object for success and error mode
 */
export function changedPermissionNotification(callback) {
  navigator.permissions
    .query({ name: "notifications" })
    .then(function (notificationPerm) {
      notificationPerm.onchange = function () {
        return callback(notificationPerm.state);
      };
    });
}
