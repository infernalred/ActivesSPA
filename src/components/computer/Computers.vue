<template>
    <div>
        <b-table striped hover :items="computers" :fixed="tableSet.fixed" :bordered="tableSet.bordered"
                 :head-variant="tableSet.headVariant" :fields="fields">
            <template v-slot:table-colgroup="scope">
                <col
                        v-for="field in scope.fields"
                        :key="field.key"
                        :style="{ width: field.key === 'inventory' || field.key === 'broken' || field.key === 'outOffOffice' ? '100px' : '180px' }"
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
            </template>
        </b-table>
    </div>
</template>

<script>

    import {mapActions} from "vuex";

    export default {
        data() {
            return {
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
            })
        },
        computed: {
            computers() {
               return this.$store.getters.computers;
            }
        },
        created () {
            this.loadComputers();
        }
    }
</script>
