import {LoginPage} from './LoginPage';
import { ProductPage } from './ProductPage';
import { CartPage } from './CartPage';
import { OrdersPage} from './OrdersPage';
class POManager
{
    constructor(page,expect)
    {
        this.page = page;
        this.expect = expect;
        this.LoginPage = new LoginPage(this.page);
        this.ProductPage = new ProductPage(this.page);
        this.CartPage = new CartPage(this.page,this.expect);
        this.OrdersPage = new OrdersPage(this.page, this.expect);
    }

    getLoginPage()
    {
        return this.LoginPage;
    }

    getProductPage()
    {
        return this.ProductPage;
    }

    getCartPage()
    {
        return this.CartPage;
    }

    getOrdersPage()
    {
        return this.OrdersPage;
    }
}
module.exports = {POManager};