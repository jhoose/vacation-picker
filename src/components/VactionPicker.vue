<template>
    <div class="container">

        <div class="row">
            <div class="col-6" v-theme="'red'">

                <h1>{{ title }}</h1>

                <ul>

                    <!-- <li class="list-group-item"
                        v-for="(country, index) in data.countries"
                        :key="country.id"
                        @click="showCountry(country)"
                    > -->
                    <li class="list-group-item"
                        v-for="(country, index) in data.countries"
                        :key="country.id"
                        @click="selectCountry(index)"
                    >
                        <!-- shorthand for v-bind:HTML attribute is :HTML attribute -->
                        <span v-bind:id="country.id" :title="country.details" v-rainbow>
                            {{ index }} {{ country.name | uppercase }} <!-- added uppercase filter aka format pipe -->
                        </span>
                    </li>

                </ul>

            </div> <!-- END 1st col 6 -->
            <!-- <div class="col-6" v-theme="'red'"> -->
            <div class="col-6" v-theme:background="'red'">

                <h2>Selected:</h2>
                <ul class="list-group">
                    <li class="list-group-item">{{ selectedCountry.id}}</li>
                    <li class="list-group-item">{{ selectedCountry.name}}</li>
                    <!-- Added custom format pipe aka filter with parameter, try USD, EUR -->
                    <!-- <li class="list-group-item">{{ selectedCountry.cost | currency('USD') }}</li> -->

                    <!-- More dynamic filter below, passing in locationCode -->
                    <li class="list-group-item">{{ selectedCountry.cost | currency('USD', 'en-us') }}</li>
                    <li class="list-group-item">{{ selectedCountry.capital}}</li>
                    <li class="list-group-item">{{ selectedCountry.details}}</li>
                    <li class="list-group-item">
                        <!-- Vue cannot get internal images (under assets folder) -->
                        <!-- <img :src="getImgUrl(selectedCountry.img)"
                             :alt="selectedCountry.img"
                             class="img-fluid" > -->
                        <img :src="getImgUrl(selectedCountry.img)"
                             :alt="selectedCountry.img"
                             class="img-fluid" >
                    </li>
                    <li class="list-group-item" v-if="isExpensive">
                        <span class="badge badge-danger badge-pill">
                            Expensive!
                        </span>
                    </li>
                </ul>
                
            </div> <!-- END 2nd col 6 -->
        </div> <!-- END 1st row -->

        <div class="row">
            <div class="col-6">

                <h2>New Countries</h2>
                <input type="text" class="form-control-lg" v-model="newCountry" @keyup.enter="addCountry()">
                <button @click="addCountry()" class="btn btn-info">
                    Add New Country
                </button>

                <ul class="list-group">
                    <li class="list-group-item" v-for="(country, index) in newCountries" :key="index">
                        {{ country }}
                    </li>
                </ul>

            </div> <!-- END 1st col 6 in 2nd row -->

            <div class="col-6">

                <div class="form-group">
                    <label for=""><b>Countries Cheaper Than...</b></label>
                    <select class="form-control" v-model="selectedCost" @change="filterCountriesByCost">
                        <option value=""></option>
                        <option v-for="(cost, index) in costs" :value="cost" :key="index">
                            {{cost}}
                        </option>
                    </select>
                </div>

                <ul class="list-group">
                    <li class="list-group-item" v-for="(country, index) in costFilteredCountries" :key="index">
                        {{ country.name }} ${{country.cost}}
                    </li>
                </ul>

            </div> <!-- END 2nd col 6 in 2nd row -->
        </div> <!-- END 2nd row -->

        <div class="row">
            <div class="col-6">
                <div v-for="country in data.countries" :key="country.id">
                    <input type="checkbox" :value="country.name" v-model="selectedCountriesByCheckbox">
                    {{country.name}}
                </div>

                <br>
                <h4>Selected Country Array From Checkboxes:</h4>
                {{selectedCountriesByCheckbox}}

            </div> <!-- END 1st col in 3rd row -->

            <div class="col-6">
                
                <div v-for="country in data.countries" :key="country.id">
                    <input type="radio" :value="country.name" v-model="selectedCountriesByRadioButton">
                    {{country.name}}
                </div>

                <br>
                <h4>Selected Country From Radio Buttons:</h4>
                {{selectedCountriesByRadioButton}}

            </div> <!-- END 2nd col in 3rd row -->
        </div> <!-- END 3rd row -->

        <div class="row">
            <div class="col-6">
            
            <!-- empty column add new things here -->

            </div> <!-- END 1st col in 4rd row -->
            <div class="col-6">
                <h2>Filtered Countries</h2>
                <input type="text" class="form-control-lg" v-model="filteredText" placeholder="Type here...">

                <ul class="list-group">
                    <li
                        class="list-group-item"
                        v-for="(country, index) in filterCountryList(filteredText)"
                        :key="country.id"
                        @click="selectCountry(index)"
                    >
                        <span v-bind:id="country.id" :title="country.details" v-rainbow>
                            {{ index }} {{ country.name | uppercase }}
                        </span>
                    </li>
                </ul>

            </div> <!-- END 2nd col in 4rd row -->
        </div> <!-- END 4rd row -->

        <h3>My counter: {{ counter }}</h3>
        <button v-on:click="counter++" type="button" class="btn btn-success">
            Add Using v-on:
        </button>
        <br>
        <br>
        <button @click="counter--" type="button" class="btn btn-warning">
            Subtract Using @
        </button>
        <br>
        <br>
        <button v-on:mouseover="counter--" type="button" class="btn btn-danger">
            Mouse Over Minus
        </button>

        <hr>

        <button @click="increment" v-on:click="counter++" type="button" class="btn btn-success">
            + Using @click="handler(arg, event)"
        </button>
        <br>
        <br>
        <button @click="decrement(arg, event)" type="button" class="btn btn-warning">
            -
        </button>
        <br>
        <br>

    </div>
</template>

<script>
    // the imported data var below must match the var within the data() function return
    import data from '../data/data';
    import mixins from '../mixins/mixins'; // for new getImgUrl(img) now within mixins.js

    export default {
        name: "VacationPicker",
        data() {
            return {
                // the data var below must match the imported var above
                // things in data return are just the default value of things when initail page load
                data,
                title: 'Vue Vacation Picker',
                counter: 0,
                selectedCountryIndex: 0,
                newCountry: '',
                newCountries: [],
                costs: [1000, 2000, 3000, 4000, 5000, 6000],
                selectedCost: 1000,
                costFilteredCountries: [],
                selectedCountriesByCheckbox: [],
                selectedCountriesByRadioButton: "",
                filteredText: ""
            }

        },
        // Commented filter object here because created global filter instead
        // filter (really format) data, in this example transform Country Names to all Uppercase letters
        // filters: { // filter object, this is a local filter object - as it's only scoped to this component
        //     uppercase(value) {

        //         // if there's not value being passed in immediately return - this should be the 1st thing in every filter object
        //         if(!value) {
        //             return;
        //         }

        //         return value.toUpperCase();

        //     }

        // }, 
        created(){ // created(){}, is a life cycle hook
            // The created life cycle hook has access to the things in the data(){}, (above)
            // eslint-disable-next-line no-console
            console.log("Vacation Picker is created...");
            this.title = 'Created from lifecycle hook...'; // example
            // life cycle hooks can also be put into a mixin
        },
        mixins: [mixins],
        methods: { // method object
            filterCountryList(filteredText){ // WARNING - filtering like this works well for small lists but KILLS performance on large lists!!!!!

                // if there's no filtered country text entered into the input textbox then return, or better yet return all the countries
                if(!filteredText) {
                    return this.data.countries;
                }

                return this.data.countries.filter(
                    country => {
                        return country.name.toLowerCase().startsWith(filteredText.toLowerCase());
                        // .toLowerCase() is a built-in JavaScript function
                        // .startsWith() is a built-in JavaScript function - please note the "s" at the end of "starts"
                    }
                );
            }, 
            filterCountriesByCost(){
                this.costFilteredCountries = this.data.countries.filter(country => country.cost < this.selectedCost);
                // this.costFilteredCountries = this.selectedCost;
            },
            addCountry(){
                this.newCountries.push(this.newCountry);
                // eslint-disable-next-line no-console
                console.log(this.newCountries);

                // Set newCountry page data variable back to empty string.
                this.newCountry = '';
            },
            increment(){
                this.counter++;
            },
            decrement(){
                this.counter--;
            },
            // showCountry( country ){
            //     alert('You clicked on: ' + country.name );
            // },
            selectCountry(index) {
                // using @click method and defining var to passed in param caches the country index
                this.selectedCountryIndex = index;
            },
            // getImgUrl(img) {
            //     // to get relative path assets like images you have to use WebPack's require() function
            //     // because Vue cannot do relative assets
            //     // NOTE: Vue CAN do external links and images just fine, you just have to start with http or https
            //     // eslint-disable-next-line no-console
            //     console.log(img);
            //     return require('../assets/flags/' + img);
            // }

        },
        computed: { // computed object
            selectedCountry(){
                return {
                    // below is the long way of doing this
                    // id: this.data.countries[this.selectedCountryIndex].id,
                    // name: this.data.countries[this.selectedCountryIndex].name,
                    // capital: this.data.countries[this.selectedCountryIndex].capital,
                    // cost: this.data.countries[this.selectedCountryIndex].cost,
                    // details: this.data.countries[this.selectedCountryIndex].details,
                    // img: this.data.countries[this.selectedCountryIndex].img,

                    // use ES6 javascript to write the short-hand way of doing this aka spread operator using "..."
                    ...this.data.countries[this.selectedCountryIndex]
                }
            }, // END selectedCountry
            // NOTE: Computed properites are WRITTEN like functions but they are properties
            isExpensive() {
                // return true or false = is currently selected country's cost is over $4000?
                return this.data.countries[this.selectedCountryIndex].cost > 4000;
            } // END selectedCountry
        }
        
    }
</script>

<style lang="scss" scoped>

</style>