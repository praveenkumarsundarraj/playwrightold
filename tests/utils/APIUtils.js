class APIUtils{
    
    constructor(apicontext,loginPayload){
        //this constructor is used to initialize the apiContext and payload when the object is created, since they both should be initialized at the start of the execution.
        this.apicontext = apicontext;
        this.loginPayload = loginPayload;
    }

    async getToken(){
            //stores the login response by making post API call using the header URL with payload loaded in second parameter
            const loginResponse = await this.apicontext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
                {
                    data:this.loginPayload
                });
            // expect(loginResponse.ok()).toBeTruthy();//validate the response is success
            const extractLoginResponse = await loginResponse.json();
            //extract store the token value from the login response json simply by calling the key using . operator
            const token = extractLoginResponse.token;
            return token;
    }

    async createOrder(createOrderPayload){
        //create Order
        let response = {};//initialized a javascript object response which has all the object needed and return this object to get token, orderID and message
        response.token = await this.getToken();
            const createOrder = await this.apicontext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
                {
                data:createOrderPayload,
                headers:{
                    'authorization' : response.token,
                    'content-type' : 'application/json',
                }
                });
            const createOrderResponse = await createOrder.json();
            response.orderMessage = createOrderResponse.message;
            response.orderID = createOrderResponse.orders[0];
            return response;
    }

    async addLocalStorage(page, token){
                
            //add java script to initialize page setup and insert the login token into local storage
            await page.addInitScript(value=>{//this value is the function name we have which grabs the token passed as second argument
                window.localStorage.setItem('token',value);//token we placed in this line is the Key we want to insert inside local storage. we can give any name which we want to insert into local storage
            },token);//token specified in this line is the token we created in beforeall which stores the token value
    }

    async initSessionStorage(token, orderID){
        
        await page.addInitScript(value=>{
        window.sessionStorage.setItem('sessionToken',value)
        } , token);//setting session storage for testing purpose to check whether we can add token as session token as key

        await page.addInitScript(order=>{
        window.sessionStorage.setItem('orderId',order)
        } , orderID);
    }

}

module.exports = {APIUtils};