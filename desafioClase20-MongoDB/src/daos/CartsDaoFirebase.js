import FirebaseContainer from '../containers/FirebaseContainer.js'

class CartsDaoFirebase extends FirebaseContainer {
    constructor() {
        super('carts')
    }
}

export default CartsDaoFirebase