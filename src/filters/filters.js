import Vue from 'vue';

// To make these filters global DON'T FORGET to add / import them to main.js file
// Vue.filter('nameOfPipe', function (value) {
Vue.filter('uppercase', function (value) { // filter aka format pipes
    
    // if there's not value being passed in immediately return - this should be the 1st thing in every filter object
    if(!value) {
        return;
    }

    return value.toUpperCase();

});

// filter aka format pipe WITH a parameter
// Vue.filter('nameOfPipe', function (valueBeforePipe, parameterAfterPipe) {
Vue.filter('currency', function (value, currencyCode) {
    
    // if there's not value being passed in immediately return - this should be the 1st thing in every filter object
    if(!value) {
        return;
    }

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode
    })
    .format(value)

});


// A MORE dynamic filter...
    Vue.filter('currency', function (value, currencyCode, locationCode) {
    
        // if there's not value being passed in immediately return - this should be the 1st thing in every filter object
        if(!value) {
            return;
        }
    
        return new Intl.NumberFormat(locationCode, {
            style: 'currency',
            currency: currencyCode
        })
        .format(value)
    
    })