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
    methods: {
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

