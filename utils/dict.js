
const dict = {
    us2g:{
    default: ['point_of_interest', 'establishment'],
    food: ['food', 'restaurant'],
    shopping: ['supermarket', 'shopping_mall', 'store'],
    nature: ['natural_feature'],
    nightlife: ['bar', 'nightclub'],
    park: ['park'],
    artnhistory: ['museum', 'art_gallery']
},
    g2us: {
        point_of_interest: 'default',
        establishment: 'default',
        museum: 'artnhistory',
        shopping_mall: 'shopping',
        park: 'park',
        supermarket: 'shopping',
        grocery_or_supermarket: 'shopping',
        //food: 'food',
        store: 'shopping',
        natural_feature: 'nature',
        bar: 'nightlife',
        restaurant: 'food',
        night_club: 'nightlife'
    }
}
export default dict;