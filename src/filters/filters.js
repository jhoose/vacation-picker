import Vue from 'vue';

// To make these filters global DON'T FORGET to add / import them to main.js file
// Vue.filter('nameOfPipe', function (value) {
Vue.filter('uppercase', function (value) { // filter aka format pipes
    
    // if there's not value being passed in immediately return - this should be the 1st thing in every filter object
    if(!value) {
        return;
    }

    return value.toUpperCase();

})