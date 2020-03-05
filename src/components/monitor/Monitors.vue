<template>
    <div>


        <div style="display: inline-block;">
            <div style="display: inline-block;">
                <b-pagination
                        v-model="params.page"
                        :total-rows="totalItems"
                        :per-page="30"
                        aria-controls="tableMonitors"
                        align="left-center"
                        @input="loadMonitorsPerPage(params)"
                ></b-pagination>
            </div>
            <div style="display: inline-block; padding: 0 20px;">
                <b-form-input
                        v-model="params.search" v-on:keyup.enter="loadMonitorsPerPage(params)">
                </b-form-input>

            </div>

            <div style="display: inline-block;">
                <b-button variant="success" @click="loadMonitorsPerPage(params)">Search</b-button>
            </div>



        </div>


        <b-table striped hover :items="Monitors" :bordered="tableSet.bordered" id="tableMonitors"
                 :head-variant="tableSet.headVariant" :fields="fields" :current-page="params.page" :busy.sync="loading">
            <template v-slot:table-colgroup="scope">
                <col
                        v-for="field in scope.fields"
                        :key="field.key"
                        :style="{ width: field.key === 'inventory' || field.key === 'broken' ||  field.key === 'outOffOffice' ? '100px' : '180px' }"
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
                <router-link tag="button" :to="{ name: 'monitorEdit', params: { id: row.item.id } }" class="btn btn-danger">Edit</router-link>
            </template>
        </b-table>

    </div>
</template>

<script>

    import {mapActions} from "vuex";

    export default {
        data() {
            return {
                loading: false,
                params: {
                    page: 1,
                    search: ''
                },

                totalPage: 2,
                totalItems: 0,
                fields: [
                    {
                        key: 'inventory',
                        sortable: true,
                    },
                    {
                        key: 'serial',
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
                        key: 'vendor.name',
                        sortable: true,
                        label: 'Vendor'
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
                loadMonitors: 'allMonitors'
            }),
            loadMonitorsPerPage(params) {
                this.loading = true;
                this.$store.dispatch('allMonitorsPage', params).then((response) => {
                    let pageNew = JSON.parse(response.headers.pagination);
                    this.totalItems = pageNew.totalItems;
                    this.loading = false;
                }, error => {
                    console.log(error);
                    this.loading =  false
                })
            }
        },
        computed: {
            Monitors() {
                return this.$store.getters.monitors;
            }
        },
        mounted () {
            this.loadMonitorsPerPage(this.params);
        }
    }
</script>

