<template>
    <div class="container">
        <div class="row justify-content-left mt-3">
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

            <select v-model="userSelect" class="form-control" required @change="changeUserId">
                <option v-for="user in getUsers" :key="user.id" :value="user">{{user.name }} {{user.id }}</option>
            </select>
            <br>
            <b-input-group prepend="Room: ">
                <b-form-input :disabled="true" :value="userSelect!==null ? userSelect.room.name : '0'"></b-form-input>
            </b-input-group>

            <br>

            <b-form-group id="input-group-4">
                    <b-form-checkbox v-model="computer.outOffOffice" switch>Out Off Office</b-form-checkbox>
                    <b-form-checkbox v-model="computer.broken" switch>Broken</b-form-checkbox>
            </b-form-group>

            <b-button type="submit" variant="primary" >Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
            <div class="col-xs-6 col-6 col-md-3 mr-5">
                <b-button-group>
                    <b-button variant="success" @click="addNetwork">Add</b-button>
                    <b-button variant="warning" @click="delNetwork">Del</b-button>
                </b-button-group>
                <div class="mt-">
                    <app-network v-for="network in networks" :key="network.id" :network="network"></app-network>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    import Network from '../network/Network.vue';

    export default {
        components: {
            appNetwork: Network
        },
        data() {
            return {
                computer: {
                    name: '',
                    comment: '',
                    outOffOffice: false,
                    broken: false,
                    userId: 0,
                    network: []
                },
                userSelect: null,
                show: true,
            }
        },
        validations() {

        },
        computed: {
            getUsers() {
                return this.$store.getters.users;
            },
            networks() {
                return this.$store.getters.networks;
            }
        },
        methods: {
            ...mapActions({
                loadUsers: 'allUsers'
            }),
            changeUserId() {
                this.computer.userId = this.userSelect.id
            },
            addNetwork() {
                console.log('Add Subnet');
                this.$store.dispatch('initNetwork')
            },
            delNetwork() {
                console.log('Del Subnet');
                this.$store.dispatch('delNetwork')
            },
            onSubmit(evt) {
                evt.preventDefault();
                this.computer.network = this.$store.getters.networks;
                //console.log(this.networks)
                //console.log(this.computer)
                this.$store.dispatch("addComputer", this.computer).then(response => {
                    if (response.status === 204)
                    {
                        this.$router.push('/computers');
                    }
                }, error => {
                    console.log(error)
                })


            },
            onReset(evt) {
                evt.preventDefault()

                this.loadUsers()
                // Reset our form values
                this.computer.name = ''
                this.computer.comment = ''
                this.computer.userId = this.userSelect!==null ? this.userSelect.id : 0
                this.computer.outOffOffice = false
                this.computer.broken = false
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        },
        beforeMount() {
            console.log('clean')
            this.$store.dispatch('cleanNetwork');
            console.log(this.$store.getters.networks)
        },
        mounted() {
            this.loadUsers();
            //this.$store.dispatch('cleanNetwork')
            this.$store.dispatch('initNetwork')
        }
    }
</script>
