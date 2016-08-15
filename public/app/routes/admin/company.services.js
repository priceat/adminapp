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

    getActiveCompanies(){
        return HTTP.get(this).get('https://x8gqeax61e.execute-api.us-east-1.amazonaws.com/v0_0_4/company?name=&start&limit').then(result => result.data );
    }

    addCompany(company){
        return HTTP.get(this).post('', company);
    }

    static companyFactory($http){
        return new CompanyService($http);
    }
}

CompanyService.companyFactory.$inject = ['$http'];

angular.module(moduleName, [])
    .factory('companySvc', CompanyService.companyFactory);

export default moduleName;
