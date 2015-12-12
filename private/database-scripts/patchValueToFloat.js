db.ingredients.find({'proximates.protein.value': {$exists: true}}).forEach(function(obj) {

    for (var key in obj) {
        if(key === 'vitamins' || key === 'minerals' || key === 'lipids') {
            for (var key2 in obj[key]) {
                for (var key3 in obj[key][key2]) {
                    if(key3 === 'value' && obj[key][key2][key3] != '') {
                        obj[key][key2][key3] = parseFloat(obj[key][key2][key3]);
                    }
                }
            }
        }
    }

    db.ingredients.save(obj);
});