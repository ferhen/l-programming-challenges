export const database = {
    uri: 'mongodb://database:27018/products?authSource=admin&ssl=false',
    dbName: 'api'
}

export const cache = {
    uri: 'redis://cache:6379',
    expireDuration: 600
}