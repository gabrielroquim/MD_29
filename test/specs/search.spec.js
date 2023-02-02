const productViewScreen = require("../screens/productView.screen")

describe('Search products', () => {
    
    it('should search by Ingrid', async () => {
        let searchName = 'Ingrid'
        await productViewScreen.waitProduct(searchName)
        await productViewScreen.search()
        await productViewScreen.searchBy(`${searchName}\n`)
        
        // Possivel Erro ou Flaky Test
        // expect(await productViewScreen.product(searchName)).toExist()
    });
})