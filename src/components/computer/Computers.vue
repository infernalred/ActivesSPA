<template>
    <div>

        <div class="overflow-auto">

            <b-pagination
                    v-model="page"
                    :total-rows="totalItems"
                    :per-page="30"
                    aria-controls="tableComps"
                    align="fill"
                    @input="loadComputersPerPage(page)"
            ></b-pagination>


        <b-table striped hover :items="computers" :bordered="tableSet.bordered" id="tableComps"
                     :head-variant="tableSet.headVariant" :fields="fields" :current-page="page" :busy.sync="loading">
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
                totalPage: 2,
                totalItems: 0,
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
            loadComputersPerPage(page) {
                this.loading = true;
                this.$store.dispatch('allComputersPage', page).then((response) => {
                    let pageNew = JSON.parse(response.headers.pagination);
                    //this.page = pageNew.currentPage + 1;
                    console.log(this.page);
                    this.totalItems = pageNew.totalItems;
                    this.loading = false;
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
            this.loadComputersPerPage(this.page);
        }
    }
</script>
