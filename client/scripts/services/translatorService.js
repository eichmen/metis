angular
    .module('Metis')
    .service('translatorService', ['gettextCatalog', function(gettextCatalog) {

        const ENGLISH = 'english';
        const SPANISH = 'spanish';

        this.setLanguage= function(language) {
            if(language === SPANISH) {
                console.log(`Setting ${SPANISH}`);
                gettextCatalog.setCurrentLanguage('es_ES');
                if(typeof Meteor.user() !== 'undefined') {
                    Meteor.users.update({_id : Meteor.userId()}, {$set: {'profile.language': SPANISH}});
                }
            } else {
                console.log(`Setting ${ENGLISH}`);
                gettextCatalog.setCurrentLanguage('en_US');
                if(typeof Meteor.user() !== 'undefined') {
                    Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.language': ENGLISH}});
                }
            }
        }

        this.getLanguage = function() {
            if(typeof Meteor.user() !== 'undefined') {
                if(typeof Meteor.user().profile.language !== 'undefined') {
                    return Meteor.user().profile.language;
                }
            } else {
                return ENGLISH;
            }
        }

        this.ENGLISH = ENGLISH;
        this.SPANISH = SPANISH;

    }]);