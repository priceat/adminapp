export class Controller {

    constructor (currentUser) {

        currentUser.whenReady().then(() => {
            this.user = currentUser.details;
        })
        this.companyActive = true;
        this.dataflowActive = false;

        // var companies = document.getElementById('companies');
        // console.log(companies.classList.contains('active'));
        // this.companyActive =  companies.classList.contains('active');
    };

    setCompanyActive () {
        this.companyActive = true;
        this.dataflowActive = false;
    }

    setDataflowActive() {
        this.companyActive = false;
        this.dataflowActive = true;
    }
}

Controller.$inject = ['currentUser'];
