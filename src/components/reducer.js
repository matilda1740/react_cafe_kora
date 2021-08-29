
import { db, storage, time } from './firebase'

const customersRef = db.collection('user')
const productsRef = db.collection('product')
const ordersRef = db.collection('order')
const orderDetailsRef = db.collection('orderDetails')

export const initialState = {
    users: [],
    products: [],
    cart: [],
    orders: [],
    userOrders: []
};

// USER FUNCTIONS
export const getTotalCustomers = (customers) => customers?.filter(customer => customer.type === "customer").length
 
export const getTotalTeam = (customers) => customers?.filter(customer => customer.type === "admin").length

// CART FUNCTIONS
export const getSubTotal = (cart) => {
  return cart?.reduce((amount, item) => item.quantity > 1 ? amount+=parseInt(item.product_price * item.quantity) :amount+=parseInt(item.product_price), 0)   
}
export const getproductTotal = (cart) => cart?.reduce((amount, item) => amount+=parseInt(item.quantity), 0)


export const reducer = (prevState = initialState, action) => {
    switch(action.type) {

//USER OPERATIONS
        case "fetch_users": 
            let fetchedUsers = [...prevState.users]
            // console.log("Fetch Users Action: ", action)
            try{
                customersRef 
                .onSnapshot((snapshot) => {
                    snapshot.docChanges().forEach( item => {
                        if(fetchedUsers.length === 0){
                            fetchedUsers.push(item.doc.data())
                        }else{
                            let itemExists = fetchedUsers.findIndex( users => users.userID === item.doc.data().userID)
                            if(itemExists < 0){
                                fetchedUsers.push(item.doc.data())
                            }
                        }
                    })
                })
            }catch(error){
                console.log(error)
            }            
            return {
                 ...prevState, 
                users: fetchedUsers         
            }

        case "delete_user": 
            let copyUsers = [...prevState.users]
            // console.log("Delete User Action: ", action)
             try{ 
                customersRef
                    .where("userID", "==", `${action.targetID}`)
                    .get()
                    .then( snapshot => {
                        snapshot.forEach( user => {
                            if(action.targetID){
                                customersRef.doc(user.id).delete() 
                                let userIndex = copyUsers.findIndex( current => current.userID === user.data().userID)  
                                if (userIndex >= 0) {
                                copyUsers.splice(userIndex, 1);
                                }                              
                            }
                        })
                    })
                    .catch(error => console.log("Deletion Error: ", error))         
            }catch(error){
                console.log("Deletion Error: ", error)
            }           
            return {
                 ...prevState, 
                users: copyUsers          
            }
        case "update_user": 

            let updatedUser = [...prevState.users]
            console.log("Update User: ", action)
            return {
                 ...prevState, 
                users: [...updatedUser]            
            }
//PRODUCT OPERATIONS
        case "add_product": 

            let addProduct = [...prevState.products]
            console.log("Add Action: " ,action)
            try{
                const { product_name, product_descr, product_cat, product_price } = action.updateData

                storage
                    .ref(`/products/${product_cat}/${product_name}`)
                    .put(action.image, {contentType: 'image/png'},)
                    .on("state_changed" , 
                        (snapshot) => {
                        const prog = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) *  100
                        );
                        // setProgress(prog);
                        // console.log(snapshot, progress)
                    },
                    (error) => {
                        console.log(error);
                        alert(error.message);
                    },
                    () => {
                        storage
                        .ref(`/products/${product_cat}/`)
                        .child(product_name)
                        .getDownloadURL()
                        .then((url) => {
                            productsRef.add({
                                product_id: productsRef.doc().id,
                                product_name: product_name,
                                product_descr : product_descr,
                                product_image: url,
                                product_price: product_price,
                                product_cat: product_cat,
                                dateadded: time,
                                })
                        })                  
                        .catch( error => console.log("Error Adding Firestore Products: ", error))
                        }
                    )
            }catch(error){
                console.log("Error Updating Storage: ", error)
            }

            return {
                 ...prevState, 
                products: [...addProduct]            
            }     

        case "update_product_info":
            let updateProducts = [...prevState.products]
            console.log("Update Action: " ,action)
            try {
                const { product_name, product_descr, product_cat, product_price } = action.updateData

                storage
                    .ref(`/products/${product_cat}/${product_name}`)
                    .put(action.image, {contentType: 'image/png'},)
                    .on("state_changed" , 
                        (snapshot) => {
                        const prog = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) *  100
                        );
                        // setProgress(prog);
                        // console.log(snapshot, progress)
                    },
                    (error) => {
                        console.log(error);
                        alert(error.message);
                    },
                    () => {
                        storage
                        .ref(`/products/${product_cat}/`)
                        .child(product_name)
                        .getDownloadURL()
                        .then((url) => {
                        productsRef
                            .where("product_id", "==", `${action.targetID}`)
                            .get()
                            .then( snapshot => {
                                snapshot.forEach( item => {
                                    productsRef
                                        .doc(item.id)
                                        .set({
                                                product_id: productsRef.doc().id,
                                                product_name: product_name,
                                                product_descr : product_descr,
                                                product_image: url,
                                                product_price: product_price,
                                                product_cat: product_cat,
                                                dateadded: time,
                                        }
                                        , {merge: true})
                                })
                            })
                        })                  
                        .catch( error => console.log("Error Adding Firestore Products: ", error))                        

                    } 
                    )               
            }catch(error){
                console.log("Update Error: ", error)
            }
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
                            let prodIndex = copyProducts.findIndex( product => product.product_id === item.data().product_id)  
                            if (prodIndex >= 0) {
                               copyProducts.splice(prodIndex, 1);
                            }                           
                        })
                    })
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
                .orderBy('product_name', 'asc')
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
//CART OPERATIONS  
        case "add_to_cart": 
            let addedCart = [...prevState.cart]
            console.log("Add To Cart Action: ", action)
            try {
                let itemExists = addedCart.find( product => product.product_id === action.item.product_id);
                !itemExists && addedCart.push({...action.item, quantity: 1}) 
            
            }catch(error){
                console.log("Error Adding Item To Cart: ", error)
            }
            return {
                 ...prevState, 
                cart: addedCart         
            }  
        case "increase_qty": 
            let increasedCart = [...prevState.cart]; 
            console.log("Increase Qty Action: ", action)
            try{
                let productId = increasedCart.findIndex(product => product.product_id === action.item.product_id)
                productId !== -1 ? increasedCart[productId].quantity +=1
                : console.log("Error Increasing Quantity: ", productId);
               
            }catch(error){
                console.log("Error Increasing Quantity: ",error);
            }
            return {
                ...prevState,
                cart: increasedCart
            };
    
        case "decrease_qty":
            let currentCartCopy = [...prevState.cart]; 
            try{
                let itemExists = currentCartCopy.find( product => product.product_id === action.item.product_id);

                itemExists.quantity <= 1 ? 
                     currentCartCopy.splice(prevState.cart.findIndex( item  => item.id === action.item.product_id), 1)
                    :itemExists.quantity = parseInt(itemExists.quantity) - 1
                
            }catch(error){
                console.log(error);
            }
            return {
                ...prevState,
                cart: currentCartCopy
            };            

// ADMIN SIDE: FETCH ORDERS 
        case "fetch_orders": 
        let fetchedOrders = [...prevState.orders];
        try{
            ordersRef 
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach( item => {
                    if(fetchedOrders.length === 0){
                        fetchedOrders.push(item.doc.data())
                    }else{
                        let itemExists = fetchedOrders.findIndex( order => order.orderID === item.doc.data().orderID)

                        if(itemExists < 0){
                            fetchedOrders.push(item.doc.data())
                        }
                    }
                })
            })
        }catch(error){
            console.log(error)
        }
        return{
            ...prevState, 
            orders: fetchedOrders,
        } 
//SEND CART ITEMS TO DB
        case "new_order":
        let copyOrders = [...prevState.orders];

        return {
            ...prevState,
            orders: copyOrders
        };            

//ACCOUNT ACTIONS
        case "user_order_history":
            let copyUserOrders = [...prevState.userOrders];
            try{
                ordersRef
                    .where("customerID", "==", `${action.userID}`)
                    .get()
                    .then( snapshot => snapshot.forEach( item => copyUserOrders.push({...item.data()})
                    ))
            }catch(error){
                console.log("Error Displayong Order History: ", error)
            }
            return {
            ...prevState,
            userOrders: copyUserOrders                
            }
        default: 
            return prevState;
    }
}

