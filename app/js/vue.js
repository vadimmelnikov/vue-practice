window.Event = new Vue();

Vue.component('task-list', {
    template: `
        <div>
            <task v-for="task in taskss">{{ task.description }}</task>
        </div>
    `,
    data(){
        return {
            msg: 'hello',
            taskss: [
                {description: 'Hello2', completed: true},
                {description: 'Hello3', completed: false},
                {description: 'Hello4', completed: true},
                {description: 'Hello5', completed: false},
                {description: 'Hello6', completed: false}
            ]
        }
    }
});
Vue.component('message', {
    props: ['title', 'body'],
    data(){
        return{
            isVisible: true
        }
    },
    template: `
    <div class="alert alert-warning alert-dismissible fade show" role="alert" v-show="isVisible">
      <h4 class="alert-heading">{{ title }}</h4>
      <p>{{ body }}</p>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true" @click="!isVisible">&times;</span>
      </button>
    </div>`,


});
Vue.component('modal', {
    template: `
    <div class="modal fade show" tabindex="-1" role="dialog" id="mdl">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$emit('close')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">Save changes</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="$emit('close')">Close</button>
          </div>
        </div>
      </div>
    </div>
    `,
    mounted(){
        $('.modal').modal('show');
    }
});

Vue.component('tabs',{
    template: `
    <div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">123</div>
          <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">321</div>
          <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">9991</div>
        </div>
    </div>
    `
});


Vue.component('coupon', {
    data() {
        return{
            valueInputs: '',
        }
    },
    template: `
        <input type="text" placeholder="add coupon code" class="form-control" @blur="onCouponApplied" v-model="valueInputs">
    `,
    methods: {

        onCouponApplied(){
            // this.$emit('applied');

            Event.$emit('applied');
        },
    }
})
var app = new Vue({
    el: '#vue',
    data: {
        message: 'Hello Vue!',
        getData: 'Текущее время:' + new Date().toLocaleString(),
        counter: 0,
        names: ['vadim', 'elena', 'carim', 'lolka'],
        value: '',
        isLoading: false,
        move: false,
        showModal: false,
        isApplied: false,
        tasks: [
            {description: 'Hello2', completed: true},
            {description: 'Hello3', completed: false},
            {description: 'Hello4', completed: true},
            {description: 'Hello5', completed: false},
            {description: 'Hello6', completed: false}
        ]
    },

    computed: {
        inclementTasks() {
            return this.tasks.filter(task => !task.completed);
        }
    },

    mounted() {

    },
    created(){
        Event.$on('applied', () => alert('Applied'))
    },
    methods: {
        // onCouponApplied(){
        //     this.isApplied = true;
        // },
        modalClose(){
            $('.modal').modal('close');
        },
        addName() {
            if (this.value.length > 0) {
                this.names.push(this.value);
                app.value = '';
            } else {
                alert('It is pure')
            }
        },

        moveMouse() {
            this.move = !this.move;
        },

        toggleClass() {
            this.isLoading = !this.isLoading;
        }
    }
})

