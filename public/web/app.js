const app1 = Vue.createApp({
    components: {
    },
    data() {
    return {
        games: 9,
        wins: 3,
        losses: 6,
        medals: 0,
        userHandle: '',
        platform: '',
        info: {},
    }
    },
    methods: {
        getUser(username) {
            console.log('getting user')
            this.username = username
        },
        getUsername() {
            console.log(this.username)
        },
        find() {
            var newPath = "http://localhost:3000/stat1?userHandle=";
            newPath = newPath.concat(this.userHandle, "&platform=", this.platform);
            console.log(newPath);
            axios.get(newPath, {headers: 
            {'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*'}})
            .then(response => {this.info = response.data;})
        }
    },
    mounted() {
        /*
        axios.get("http://localhost:3000/stat1", {headers: 
        {'Content-Type': 'application/json', 
        'Access-Control-Allow-Origin': '*'}})
        .then(response => {this.info = response.data;})
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
        axios.get("https://public-api.tracker.gg/v2/overwatch/standard/profile/psn/mooky456", {headers: 
        {'Content-Type': 'application/json', 
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'GET', 
        'TRN-Api-Key': '761772f1-d034-4d36-920a-48369d30ec4f'}})
        .then(response => {this.info = response.data}) */
        },
})
app1.component('headerComponent', {});
app1.component('piechart1', {
    data() {
      return {
      }
    },
    template: `
    <div class="chartContainer1">
        <canvas id="myChart"></canvas>
    </div>
`
  });

app1.component('image1', {
  data() {
    return {
    }
  },
  template: `
    <img src="https://pngimg.com/uploads/wolf/wolf_PNG23191.png" width="260" height="145" />`
});
app1.component('user-name', {
  props: ['name'],
  template: '<p>Hi {{ name }}</p>'
})
app1.mount('#app')