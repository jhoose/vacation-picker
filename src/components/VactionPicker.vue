<template>
    <div class="container">

        <div class="row">
            <div class="col-6">

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
                        <span v-bind:id="country.id" :title="country.details">
                            {{ index }} {{ country.name }}
                        </span>
                    </li>

                </ul>

            </div> <!-- END 1st col 6 -->
            <div class="col-6">

                <h2>Selected:</h2>
                <ul class="list-group">
                    <li class="list-group-item">{{ selectedCountry.id}}</li>
                    <li class="list-group-item">{{ selectedCountry.name}}</li>
                    <li class="list-group-item">{{ selectedCountry.capital}}</li>
                    <li class="list-group-item">{{ selectedCountry.details}}</li>
                    <li class="list-group-item">
                        <!-- <img :src="getImgUrl(selectedCountry.img)"
                             :alt="selectedCountry.img"
                             class="img-fluid" > -->
                        <img src=""
                             :alt="selectedCountry.img"
                             class="img-fluid" >
                    </li>
                    <!-- <li class="list-group-item" v-if="isExpensive">
                        <span class="badge badge-danger badge-pill">
                            Expensive!
                        </span>
                    </li> -->
                    <li class="list-group-item">
                        <span class="badge badge-danger badge-pill">
                            Expensive!
                        </span>
                    </li>
                </ul>
                
            </div> <!-- END 2nd col 6 -->
        </div> <!-- END 1st row -->


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

    export default {
        name: "VacationPicker",
        data() {
            return {
                // the data var below must match the imported var above
                // things in data return are just the default value of things when initail page load
                data,
                title: 'Vue Vacation Picker',
                counter: 0,
                selectedCountryIndex: 0
            }

        },
        methods: {
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
            }

        },
        computed: {
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
            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>