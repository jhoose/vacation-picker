export default {
    methods: {
        getImgUrl(img) {
            // to get relative path assets like images you have to use WebPack's require() function
            // because Vue cannot do relative assets
            // NOTE: Vue CAN do external links and images just fine, you just have to start with http or https
            // eslint-disable-next-line no-console
            // console.log(img);
            return require('../assets/flags/' + img);
        }
    }
}