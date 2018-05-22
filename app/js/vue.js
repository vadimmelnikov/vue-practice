Vue.component('task', {
    template: `
    <ul class="list-group">
        <li class="list-group-item">{{ msg }}</li>
    </ul>
    `,
    data(){
        return {
            msg: 'hello'
        }
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

