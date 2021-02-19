//statapp
// WLGradient
// pieChartComponent 
// title
// username
// sconst statapp = Vue.createApp({
const statapp = Vue.createApp({
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
      axios.get(newPath, {
        headers:
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(response => { this.info = response.data; })
    }
  },
  mounted() {
    /*
    axios.get("http://localhost:3000/statapp", {headers: 
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
statapp.component('headerComponent', {});
statapp.component('piechart1', {
  data() {
    return {
    }
  },
  beforeUpdate() {
    alert(this.chartData);
    var ctx = document.getElementById("myChart").getContext("2d");
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "pie",

      // The data for our dataset
      data: {
        labels: ["Bronze", "Silver", "Gold"],
        datasets: [
          {
            label: "mooky456",
            backgroundColor: "rgb(51, 153, 255)",
            borderColor: "rgb(255, 255, 255)",
            data: this.chartData,
          },
        ],
      }
    });
  },
  props: ['chartData'],
  template: `
    <div class="chartContainer1">
        <canvas id="myChart"></canvas>
    </div>
    <span>{{ chartData }}</span>
  `
});

statapp.component('image1', {
  data() {
    return {
    }
  },
  template: `
    <img src="https://pngimg.com/uploads/wolf/wolf_PNG23191.png" width="260" height="145" />`
});
statapp.component('usergreeting', {
  props: ['name'],
  template: '<p>Hi {{ name }}</p>'
})
statapp.component('wlpercentage', {
  props: ['wlpercentage'],
  template: '<li>Win/Loss Percentage - <span class="badge badge-primary">{{ wlpercentage }}% WL</span></li>'
})
statapp.mount('#app')
