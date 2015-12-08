/* Prevent profile editing, only for language */
Meteor.users.deny({
    update: function (userId, docs, fields, modifier) {
        var englishAllowed = {'$set': {'profile.language': 'english'}};
        var spanishAllowed = {'$set': {'profile.language': 'spanish'}};

        return !(userId === docs._id && _.isEqual(fields, ['profile']) &&
            (_.isEqual(modifier, spanishAllowed) || _.isEqual(modifier, englishAllowed)));
    }
});

Meteor.users.allow({
    update: function () {
        return true;
    }
});