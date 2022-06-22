Vue.component('filter-el', {
    data() {
        return {
            userSearch: ''
        }
    },
    template: `
    <form action="#"  class="header__container-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
    <input class="header-search" type="search" name="search" v-model="userSearch" placeholder="Search for item...">
    <button  class="button-search" type="button"><i @submit.prevent="$parent.$refs.products.filter(userSearch)" class="fa fa-search" aria-hidden="true"></i>
    </button>
</form>
    `
});