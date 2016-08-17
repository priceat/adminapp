const INIT = new WeakMap();
const SERVICE = new WeakMap();
const TIMEOUT = new WeakMap();

export class Controller {
    
    resetSearch() {
        this.textSearch = '';
        this.advancedFilters = {};
        this.appliedAdvancedFilters = {};
        this.appliedTextSearch = '';
    }


    constructor (currentUser, $timeout, companySvc) {

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



        INIT.get(this)();

        //this.totalItems = 0;
        //this.currentPage = 1;
        //this.numPerPage = 10;

        this.resetSearch();

        this.searchDirty = false;
        this.toggles = true;
        this.showImage = true;

        this.showData = function(){
            this.curPage = 0;
            this.pageSize = 3;
            this.companies;
            //this.datalists = [
            //    { "name": "John","age":"16","designation":"Software Engineer1"},
            //    {"name": "John2","age":"21","designation":"Software Engineer2"},
            //    {"name": "John3","age":"19","designation":"Software Engineer3"},
            //    {"name": "John4","age":"17","designation":"Software Engineer4"},
            //    {"name": "John5","age":"21","designation":"Software Engineer5"},
            //    {"name": "John6","age":"31","designation":"Software Engineer6"},
            //    {"name": "John7","age":"41","designation":"Software Engineer7"},
            //    {"name": "John8","age":"16","designation":"Software Engineer8"},
            //    {"name": "John18","age":"16","designation":"Software Engineer9"},
            //    {"name": "John28","age":"16","designation":"Software Engineer10"},
            //    {"name": "John38","age":"16","designation":"Software Engineer11"},
            //    {"name": "John48","age":"16","designation":"Software Engineer12"},
            //    {"name": "John58","age":"16","designation":"Software Engineer13"},
            //    {"name": "John68","age":"16","designation":"Software Engineer14"},
            //    {"name": "John68","age":"16","designation":"Software Engineer15"}
            //]
            this.numberOfPages = function() {
                return Math.ceil(this.companies.length / this.pageSize);
            };

        }


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

    setFilterValues(){
        this.filterModel.retailerSelected = "retailer"
    }

    applyFilter(){
        this.searchDirty = true;
        this.showImage = false;
        this.theFilter = {
            companyName : this.filterModel.companyName,
            visibility : this.filterModel.visibility,
            orderPerf : this.filterModel.orderPerf,
            compliance : this.filterModel.compliance,
            pos : this.filterModel.pos

        }

        if(this.filterModel.visibility && this.filterModel.orderPerf && !this.filterModel.compliance){
            this.theFilter.summary = "Visibility | Order Performance"
        }else if(this.filterModel.visibility && this.filterModel.compliance && !this.filterModel.orderPerf){
            this.theFilter.summary = "Visibility | Compliance"
        }else if(this.filterModel.visibility && this.filterModel.orderPerf && this.filterModel.compliance){
            this.theFilter.summary = "Visibility | Order Performance | Compliance"
        }else if(this.filterModel.visibility && this.filterModel.orderPerf && this.filterModel.compliance && this.filterModel.pos){
            this.theFilter.summary = "Visibility | Order Performance | Compliance | Point of Sale"
        }else if(this.filterModel.orderPerf && this.filterModel.compliance && this.filterModel.pos){
            this.theFilter.summary = "Order Performance | Compliance | Point of Sale"
        }else if(!this.filterModel.visibility && this.filterModel.orderPerf && this.filterModel.compliance){
            this.theFilter.summary = "Order Performance | Compliance"
        }else if(this.filterModel.orderPerf && this.filterModel.pos){
            this.theFilter.summary = "Order Performance | Point of Sale"
        }else if(this.filterModel.compliance && this.filterModel.pos){
            this.theFilter.summary = "Compliance | Point of Sale"
        }else if(this.filterModel.visibility){
            this.theFilter.summary = "Visibility"
        }else if(this.filterModel.orderPerf) {
            this.theFilter.summary = "Order Performance"
        }else if(this.filterModel.compliance) {
            this.theFilter.summary = "Compliance"
        }else if(this.filterModel.pos) {
            this.theFilter.summary = "Point of Sale"
        }

        if(this.filterModel.retailerSelected){
            this.theFilter.retailerOrSupplier = "retailer";
        }else if(this.filterModel.supplierSelected) {
            this.theFilter.retailerOrSupplier = "supplier";
        }

    }


}
Controller.$inject = ['currentUser', '$timeout', 'companySvc']

