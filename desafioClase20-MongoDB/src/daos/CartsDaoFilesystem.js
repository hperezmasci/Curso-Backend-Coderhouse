import AsyncFSContainer from '../containers/AsyncFSContainer.js'

class CartsDaoFilesystem extends AsyncFSContainer {
    constructor() {
        super('carts.json')
    }
}

export default CartsDaoFilesystem