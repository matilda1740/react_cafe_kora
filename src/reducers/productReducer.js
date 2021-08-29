
import { db } from '../components/firebase'

export const initialState = {
    products: []
};


export const productReducer = (prevState = initialState, action) => {
    const productsRef = db.collection('product')
    switch(action.type) {

        case "update_product_info":
            let updateProducts = [...prevState.products]
            return {
                ...prevState, 
                products: updateProducts  
            }
        case "delete_product":
            let copyProducts =  [...prevState.products];
            try{ 
                productsRef
                    .where("product_id", "==", `${action.targetID}`)
                    .get()
                    .then( snapshot => {
                        snapshot.forEach( item => {
                            productsRef.doc(item.id).delete() 
                            let prodIndex = copyProducts.findIndex( product => product.product_id ===item.data().product_id)  
                            if (prodIndex >= 0) {
                               copyProducts.splice(prodIndex, 1);
                            }                           
                        })
                        console.log(copyProducts)
                    }).catch( error => console.log(error))
                    
                    
            }catch(error){
                console.log("Deletion Error: ", error)
            }            
            return {
                ...prevState, 
                products: copyProducts              
            }
        case "fetch_products":
            let fetchedProducts = [...prevState.products];
            try{
                productsRef 
                .onSnapshot((snapshot) => {
                    snapshot.docChanges().forEach( item => {
                        if(fetchedProducts.length === 0){
                            fetchedProducts.push(item.doc.data())
                        }else{
                            let itemExists = fetchedProducts.findIndex( product => product.product_id === item.doc.data().product_id)

                            if(itemExists < 0){
                                fetchedProducts.push(item.doc.data())
                            }
                        }
                    })
                })
            }catch(error){
                console.log(error)
            }
            return{
                ...prevState, 
                products: fetchedProducts,
            }
        default: 
            return prevState;
    }
}

