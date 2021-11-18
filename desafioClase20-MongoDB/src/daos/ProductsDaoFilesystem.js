import AsyncFSContainer from '../containers/AsyncFSContainer.js'

class ProductsDaoFilesystem extends AsyncFSContainer {
    constructor() {
        super('products.json')
    }
}

export default ProductsDaoFilesystem