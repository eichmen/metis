/* Prevent profile editing */
Meteor.users.deny({
  update: function() {
    return true;
  }
});
