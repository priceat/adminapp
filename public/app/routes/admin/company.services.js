/**
 * Created by atprice on 8/13/16.
 */

var moduleName='company.services';

const HTTP = new WeakMap();

class CompanyService
{
    constructor($http)
    {
        HTTP.set(this, $http);
    }

    //getCompany(companyName){
    //    return HTTP.get(this).post('https://x8gqeax61e.execute-api.us-east-1.amazonaws.com/v0_0_4/company?name=' + companyName)
    //    then(result => {
    //        var companies = result.data.companies;
    //
    //        for (var i =0; i < companies.length; i++){
    //
    //            var productDescription = "";
    //
    //            if(companies[i].visibility){
    //                productDescription += "Visibility";
    //            }
    //            if(companies[i].orderPerf){
    //                productDescription += (productDescription ? " | " : "") + "Order Performance";
    //            }
    //            if(companies[i].compliance){
    //                productDescription += (productDescription ? " | " : "") + "Compliance";
    //            }
    //
    //            companies[i].summary = productDescription;
    //        }
    //
    //        return companies;
    //    } );
    //}

    getActiveCompanies(){
        this.companies = [];
        return HTTP.get(this).get('https://x8gqeax61e.execute-api.us-east-1.amazonaws.com/v0_0_4/company?name=&start&limit').then(result => {
            var companies = result.data.companies;

            for (var i =0; i < companies.length; i++){

                var productDescription = "";

                if(companies[i].visibility){
                    productDescription += "Visibility";
                }
                if(companies[i].orderPerf){
                    productDescription += (productDescription ? " | " : "") + "Order Performance";
                }
                if(companies[i].compliance){
                    productDescription += (productDescription ? " | " : "") + "Compliance";
                }
                if(companies[i].pos){
                    productDescription += (productDescription ? " | " : "") + "Point of Sale";
                }

                companies[i].summary = productDescription;
            }

            return companies;
        } );
    }

    addCompany(company){
        return HTTP.get(this).post('', com);
    }

    static companyFactory($http){
        return new CompanyService($http);
    }
}

CompanyService.companyFactory.$inject = ['$http'];

angular.module(moduleName, [])
    .factory('companySvc', CompanyService.companyFactory);

angular.module(moduleName)
    .filter('searchCompanies', () => {
        return (input, textSearch, advancedFilters) => {
            if(!input || !(input instanceof Array)){
                return input;
            }

            return input.filter(record => {
                if(typeof advancedFilters.suppliers != 'undefined') {
                    const selectedSuppliers = Object.keys(advancedFilters.suppliers).filter(supplier => advancedFilters.suppliers[supplier]).map(supplier => supplier.toLowerCase());

                    if(selectedSuppliers.length > 0 && selectedSuppliers.indexOf(record.retailerOrSupplier) == -1) {
                        return false;
                    }
                }

                if(typeof advancedFilters.selProducts != 'undefined') {
                    const selectedProducts = Object.keys(advancedFilters.selProducts).filter(product => advancedFilters.selProducts[product]).map(product => product);

                    if(selectedProducts == 0) {
                        return false;
                    }
                }

                if(textSearch != '' && record.companyName.indexOf(textSearch) == -1) {
                    return false;
                }


                return true;
            });
        };
    });

angular.module(moduleName)
    .filter('pagination', () => {
    return (input, start) =>
    {
        start = +start;
        return input.slice(start);
    };
});

export default moduleName;
