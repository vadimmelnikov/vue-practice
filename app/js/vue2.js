Vue.component('modal', {
    template: `
    <div id="gridSystemModal" class="modal fade show" tabindex="-1" role="dialog" aria-labelledby="gridModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="gridModalLabel">
                <slot name="header"></slot>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          </div>
          <div class="modal-body">
            <div class="container-fluid bd-example-row">
                <div class="row">
                    <div class="col-md-12">
                        <p>
                            <slot></slot>
                        </p>
                    </div>
                </div>
            </div>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
    `,
    mounted(){
        $('.modal').modal('show');
    }
})

var app = new Vue({
    el: '#vue',
    data: {}
})