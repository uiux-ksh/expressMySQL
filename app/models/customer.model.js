const sql = require('./db');

//생성자
const Customer = function (customer) {
    this.email = customer.email;
    this.name =  customer.name;
    this.active = customer.active;

};


//customer 튜플 추가

Customer.create = (newCustomer,result) => {

}