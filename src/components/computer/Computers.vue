<template>
    <div>
        <b-table striped hover :items="computers" :fixed="tableSet.fixed" :bordered="tableSet.bordered" id="tableComps"
                 :head-variant="tableSet.headVariant" :fields="fields">
            <template v-slot:table-colgroup="scope">
                <col
                        v-for="field in scope.fields"
                        :key="field.key"
                        :style="{ width: field.key === 'inventory' || field.key === 'broken' || field.key === 'name' || field.key === 'outOffOffice' ? '100px' : '180px' }"
                >
            </template>
            <template v-slot:cell(broken)="cell">
                <b-form-checkbox v-model="cell.value" :disabled="true" :style="{color: 'danger'}" switch size="lg"></b-form-checkbox>
            </template>
            <template v-slot:cell(outOffOffice)="cell">
                <b-form-checkbox v-model="cell.value" :disabled="true" :style="{color: 'danger'}" switch size="lg"></b-form-checkbox>
            </template>
            <template v-slot:cell(action)="row">
                <b-button variant="primary" @click="row.toggleDetails">
                    {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
                </b-button>
                <br>
                <router-link tag="button" :to="{ name: 'computerEdit', params: { id: row.item.id } }" class="btn btn-danger">Edit</router-link>
            </template>
        </b-table>
        <div v-show="loading" class="loading justify-content-center mb-3">
            <b-spinner variant="danger" type="grow" label="Spinning"></b-spinner>
        </div>
    </div>
</template>

<script>

    import {mapActions} from "vuex";

    export default {
        data() {
            return {
                loading: false,
                page: 1,
                fields: [
                    {
                        key: 'inventory',
                        sortable: true,
                    },
                    {
                        key: 'name',
                        sortable: true
                    },
                    {
                        key: 'comment',
                        sortable: true,
                        // Variant applies to the whole column, including the header and footer
                    },
                    {
                        key: 'lastUpdate',
                        sortable: false
                    },
                    {
                        key: 'outOffOffice',
                        sortable: false
                    },
                    {
                        key: 'broken',
                        sortable: false,
                        _cellVariants: 'danger'
                    },
                    {
                        key: 'user.name',
                        sortable: false,
                        label: 'User Name'
                    },
                    {
                        key: 'action',
                        sortable: false
                    },
                ],
                tableSet: {
                    headVariant: 'dark',
                    bordered: true,
                    fixed: false
                }
            }
        },
        methods: {
            ...mapActions({
                loadComputers: 'allComputers'
            }),
            scrollPage() {
                window.onscroll = () => {
                    let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
                    if (bottomOfWindow) {
                        this.loadComputersPerPage();
                    }
                }
            },
            loadComputersPerPage() {
                this.loading = true;
                this.$store.dispatch('allComputersPage', this.page).then((response) => {
                    let pagenew = JSON.parse(response.headers.pagination);

                    console.log(pagenew.currentPage);
                    this.page = pagenew.currentPage + 1;
                    this.loading = false
                }, error => {
                    console.log(error);
                    this.loading =  false
                })
            }
        },
        computed: {
            computers() {
               return this.$store.getters.computers;
            }
        },
        mounted () {
            //this.loadComputers();
            this.loadComputersPerPage();
            this.scrollPage();
        }
    }
</script>
