<template>
    <div class="container">
        <div class="row justify-content-left">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">

            <b-form-group id="input-group-2" label="PC Name:" label-for="input-2">
                <b-form-input
                        id="input-2"
                        v-model="computer.name"
                        required
                        placeholder="Enter name"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-1" label="Comment:" label-for="input-1">
                <b-form-textarea
                        id="input-1"
                        v-model="computer.comment"
                        placeholder="Enter comment"
                        rows="3"
                        max-rows="6"
                ></b-form-textarea>
            </b-form-group>

            <b-form-group id="input-group-3" label="User:" label-for="input-3">
                <b-form-select
                        id="input-3"
                        v-model="userSelect"
                        :options="funds"
                        required
                ></b-form-select>
            </b-form-group>

            <b-form-select v-model="userSelect" :options="options1">
                <template v-slot:first>
                    <b-form-select-option value="" disabled>-- Please select an option --</b-form-select-option>
                </template>
            </b-form-select>

            <select v-model="userSelect" class="form-control">
                <option v-for="user in funds" :key="user.id" :value="user">{{user.name }} {{user.id }}</option>
            </select>

            <b-form-group id="input-group-4">
                    <b-form-checkbox v-model="computer.outOffOffice" switch>Out Off Office</b-form-checkbox>
                    <b-form-checkbox v-model="computer.broken" switch>Broken</b-form-checkbox>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
        <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ computer }}</pre>
            <pre v-if="userSelect!==null" class="m-0">{{ userSelect }} и  {{ userSelect.name }}</pre>
        </b-card>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    import axios from "axios";

    export default {
        data() {
            return {
                computer: {
                    name: '',
                    comment: '',
                    user: '',
                    room: '',
                    outOffOffice: false,
                    broken: false
                },
                userSelect: null,
                user: {
                    id: 0,
                    name: '',
                    roomId: 0
                },
                jsonUsers: [],
                peoples: [{ text: 'Select One', value: null }, 'one', 'two'],
                options1: [],
                options2: [],
                show: true
            }
        },
        computed: {
            funds() {
                return this.options1;
            }
        },
        methods: {
            ...mapActions({
                loadUsers: 'allUsers'
            }),
            getAllUsers() {
                axios.get('/actives/GetUsers')
                    .then(res => {
                        this.options1 = res.data
                        console.log(this.options1)
                    })
            },
            onSubmit(evt) {
                evt.preventDefault()
                console.log(JSON.stringify(this.computer))
            },
            onReset(evt) {
                evt.preventDefault()

                this.getAllUsers()
                // Reset our form values
                this.computer.name = ''
                this.computer.comment = ''
                this.computer.user = null
                this.user = null
                this.computer.outOffOffice = false
                this.computer.broken = false
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        }
    }
</script>
