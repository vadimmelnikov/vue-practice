var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        getData: 'Текущее время:' + new Date().toLocaleString(),
        counter: 0,
        typeJob: 'list',
        search: '',
        hashtags: [],
        checkPick: [],
        channels: [],
        url: {
            hashtags: 'https://dka-telegram.ru/channel/api?type=hashtags',
            channels: 'https://dka-telegram.ru/channel/api?type=channels'
        }
    },
    created() {
        this.typeJob = 'search'
    },
    watch: {

        search: function () {
            this.search.length >= 2 ? this.lookingHashTag() : this.hashtags = [];
        },
        typeJob: function () {
            this.typeJob == 'list' ? this.lookUpChannel() : this.hashtags = [];
            this.checkPic = []
        }

    },
    methods: {
        tutorialDemo: function () {
            this.counter++,
                console.log(counter)
        },
        lookingHashTag: function () {
            $.ajax({
                url: app.url.hashtags,
                dataType: 'json',
                data: {name: app.search},
                success: function (json) {
                    app.hashtags = json
                }
            });
        },
        lookUpChannel: function () {
            var dke = this
            $.ajax({
                url: dke.url.channels,
                dataType: 'json',
                success: function (json) {
                    dke.channels = json
                }
            });
        }
    }
})

// var app3 = new Vue({
//     el: '#app-3',
//     data: {
//         seen: true
//     }
// })

// var app4 = new Vue({
//     el: '#app-4',
//     data: {
//         todos: [
//             {text: 'Learn JavaScript'},
//             {text: 'Learn Vue'},
//             {text: 'Build something awesome'}
//         ]
//     },
// })
//
// var app5 = new Vue({
//     el: '#app-5',
//     data: {
//         message: 'Hello Vue.js!'
//     },
//     methods: {
//         reverseMessage: function () {
//             this.message = this.message.split('').reverse().join('')
//         }
//     }
// })

Vue.component('tabs', {
    template: `
    <div>
      <div class="tabs">
        <ul class="nav nav-tabs">
          <li class="nav-item" v-for="tab in tabs" >
            <a class="nav-link" :href="tab.href" @click="selectTab(tab)" :class="{ 'active': tab.isActive }">{{ tab.name }}</a>
          </li>
        </ul>
      </div>

      <div class="tabs-details">
        <slot></slot>
      </div>
    </div>
  `,
    data() {
        return { tabs: [] }
    },
    created() {
        this.tabs = this.$children;
    },
    methods: {
        selectTab: function(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.name == selectedTab.name);
            });
        }
    }
});

Vue.component('tab', {
    props: {
        name: { required: true },
        selected: { default: false }
    },
    template: `<div v-show="isActive"><slot></slot></div>`,
    data() {
        return { isActive: false }
    },
    computed: {
        href() {
            return '#' + this.name.toLowerCase().replace(/ /g , '-');
        }
    },
    mounted() {
        this.isActive = this.selected;
    }
});

var tabs = new Vue({
    el: '#tabs',
})