var app = new Vue({
    el: '#vue',
    data: {
        message: 'Hello Vue!',
        getData: 'Текущее время:' + new Date().toLocaleString(),
        counter: 0,
        names: ['vadim', 'elena', 'carim', 'lolka'],
        value: '',
        isLoading: false,
        move: false
    },

    mounted(){

    },
    methods: {
        addName(){
            if (this.value.length > 0) {
                this.names.push(this.value);
                app.value = '';
            } else{
                alert('It is pure')
            }
        },

        moveMouse(){
            this.move = !this.move;
        },

        toggleClass(){
            this.isLoading = !this.isLoading;
        }
    }
})
