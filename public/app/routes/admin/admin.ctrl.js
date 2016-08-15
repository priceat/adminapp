const INIT = new WeakMap();
const SERVICE = new WeakMap();
const TIMEOUT = new WeakMap();

export class Controller {


    constructor (currentUser, $timeout, companySvc, $scope) {

        currentUser.whenReady().then(() => {
            this.user = currentUser.details;
        });
        this.companyActive = true;
        this.dataflowActive = false;


        SERVICE.set(this, companySvc);
        TIMEOUT.set(this, $timeout);
        INIT.set(this, () => {
            SERVICE.get(this).getActiveCompanies().then(companies => {
                this.companies = companies;
            });
        });


        this.data = [{}];

        this.searchDirty = false;
        this.toggles = false;

        this.supplierData = [
            {name: "Supplier"},
            {name: "Retailer"}
        ];

        this.products = [
            {name: "Visibility"},
            {name: "Order Performance"},
            {name: "Compliance"}
        ]

        this.login = [
            {name: "Last 24 Hours"},
            {name: "Past Week"},
            {name: "Last Month"},
            {name: "Last 3 Months"},
            {name: "Last 6 Months"}
        ]


        INIT.get(this)();
    }


        // var companies = document.getElementById('companies');
        // console.log(companies.classList.contains('active'));
        // this.companyActive =  companies.classList.contains('active');

    setCompanyActive () {
        this.companyActive = true;
        this.dataflowActive = false;
    }

    displaySearchResults() {
        this.searchDirty = true;
    }
    setDataflowActive() {
        this.companyActive = false;
        this.dataflowActive = true;
    }

    isChecked(id){
    var match = false;
    for(var i=0 ; i < this.data.length; i++) {
        if($scope.data[i].id == id){
            match = true;
        }
    }
    return match;
};

    sync(bool, item){
    if(bool){
        // add item
        this.data.push(item);
    } else {
        // remove item
        for(var i=0 ; i < this.data.length; i++) {
            if($scope.data[i].id == item.id){
                $scope.data.splice(i,1);
            }
        }
    }
};
    filterCompanies(){
        return function (data) {
            if ( $scope.search[data.retailerOrSupplier] === true ) {
                return true;
            }
        }
    };



    //getResults() {
    //    var companies = [];
    //    this.$http.get("https://x8gqeax61e.execute-api.us-east-1.amazonaws.com/v0_0_4/company?name=&start&limit",
    //        function (response) {
    //            companies = response;
    //        }, "json",
    //        function (failure) {
    //            console.log("failed :(", failure);
    //        })
    //
    //    //this.companyName = companies.companyName;
    //    //this.retailerOrSupplier = companies.retailerOrSupplier;
    //    //this.capabilities = companies.capabilities;
    //    //this.activeUsers = companies.activeUsers;
    //}

}
Controller.$inject = ['currentUser', '$timeout', 'companySvc', '$scope']


