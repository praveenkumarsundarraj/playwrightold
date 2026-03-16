class LoginPage {
    constructor(page) {
        this.page = page;
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.signIn = page.locator('#login');
        this.cardTitles = page.locator('.card-body h5 b');
    }

    async goTo() {
        await this.page.goto('/client');
    }

    async loginUser(userEmail, userPassword) {
        await this.userName.fill(userEmail);
        await this.password.fill(userPassword);
        await this.signIn.click();
        await this.cardTitles.first().waitFor();
    }

}
module.exports = { LoginPage };