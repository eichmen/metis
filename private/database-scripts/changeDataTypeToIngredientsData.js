//Changing Proximates
db.ingredients.find({'proximates.protein.value': {$exists: true}}).forEach(function(obj) {
    obj.proximates.energKcal.value = parseFloat(obj.proximates.energKcal.value);
    obj.proximates.protein.value = parseFloat(obj.proximates.protein.value);
    obj.proximates.lipidTot.value = parseFloat(obj.proximates.lipidTot.value);
    obj.proximates.carbohydrt.value = parseFloat(obj.proximates.carbohydrt.value);
    db.ingredients.save(obj);
});