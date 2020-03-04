import Vue from 'vue'
import App from './App.vue'

// To make filters (format pipes) in filter folder global add aka import them here so that the whole application has access to them
import './filters/filters';

// custom directives https://www.youtube.com/watch?v=3-fLYMEKOU0
//Vue.directive('nameOfDirective', { object that contains a bind() funciton })
Vue.directive('rainbow', {

  /* bind aka live-cycle hook:

  bind(element, binding, vnode) {

  parameters explained:
    vnode = virtual node
    binding is the params passed in like v-rainbow="this quoted text here"
  */
  bind(element) {
    element.style.color = "#" + Math.random().toString().slice(2,8);
  }
});

Vue.directive('theme',{
  
  bind(element, binding){

    if(binding.value == "red") {
      // FYI when referring to CSS styles max-width becomes maxWidth here
      element.style.color = "red";
    }

    // optional arguments v-theme:background="'red'"
    if(binding.arg == 'background') {
      element.style.background = "blue";
    }

  } // end binding function

});

Vue.config.productionTip = false

// Add Bootstrap Styling...
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

new Vue({
  render: h => h(App),
}).$mount('#app')
