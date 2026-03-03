class APITest{

    constructor(apiContext,loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken(){
        const loginAPI = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login' , {
            data: this.loginPayload
        });
        const responseValue = await loginAPI.json();
        const tokenValue =responseValue.token;
        return tokenValue;
    }

    async createOrder(orderPayload){
        const responseSet = {};
        responseSet.token = await this.getToken();
        const orderCreation = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data:orderPayload,
                headers:{
                    'authorization': responseSet.token,
                    'content-type' : 'application/json',
                },
            }
        )
        const orderResponse =await orderCreation.json();
        responseSet.orderId = orderResponse.orders[0];
        responseSet.message = orderResponse.message;
        return responseSet;
    }

}

module.exports = {APITest}