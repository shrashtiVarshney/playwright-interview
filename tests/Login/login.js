class login{

    constructor(page){
        this.page=page;
    }

    async gotopage(){
        await this.page.goto("https://claude.ai/public/artifacts/1e02a9a5-4f20-4f19-a7ba-6c3f16c6eab9");
        //accept the cookies
        const cookieBtn = this.page.getByRole('button', { name: /accept/i });
        if (await cookieBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
        await cookieBtn.click();
        }

    }

}

module.exports={login};