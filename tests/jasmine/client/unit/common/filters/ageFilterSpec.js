describe('ageFilter', function () {

    beforeEach(module('Metis'));

    var $filter, now, ageFilter;

    beforeEach(inject(function(_$filter_){
        $filter = _$filter_;
        ageFilter = $filter('ageFilter');
        now = new Date();
    }));

    it('returns undefined when null is passed', function() {
        expect(ageFilter(null)).not.toBeDefined();
    });

    it('returns 14 years when 15 years are substracted from now date', function() {
        var birthday = new Date(now.setFullYear(now.getFullYear() - 15));
        expect(ageFilter(birthday)).toBe(14);
    });

    it('returns 0 years when 11 months are substracted from now date', function() {
        var birthday = new Date(now.setMonth(now.getMonth() - 11));
        expect(ageFilter(birthday)).toBe(0);
    });

    it('returns 1 years when 13 months are substracted from now date', function() {
        var birthday = new Date(now.setMonth(now.getMonth() - 13));
        expect(ageFilter(birthday)).toBe(1);
    });

    it('returns 4 years when 48 months are substracted from now date', function() {
        var birthday = new Date(now.setMonth(now.getMonth() - 48));
        expect(ageFilter(birthday)).toBe(4);
    });

});
