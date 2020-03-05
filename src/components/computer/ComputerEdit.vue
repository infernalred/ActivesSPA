<template>
    <div class="computer">
        <div v-show="loading" class="loading justify-content-center mb-3">
            <b-spinner variant="danger" type="grow" label="Spinning"></b-spinner>
        </div>
    <div class="container" v-if="computer">
        <div class="row justify-content-left">
        <b-form @submit="onSubmit" >

            <b-form-group id="input-group-2" label="PC Name:" label-for="input-2">
                <b-form-input
                        id="input-2"
                        v-model="$v.computer.name.$model"
                        required
                        placeholder="Enter name"
                        :state="validateState('name')"
                        @blur="$v.computer.name.$touch()"
                        aria-describedby="input-1-live-feedback"
                ></b-form-input>
                <b-form-invalid-feedback
                        id="input-1-live-feedback"
                >This is a required field.</b-form-invalid-feedback>
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

            <select v-model="$v.computer.user.$model" class="form-control" required @change="changeUserId"
                    :state="validateUser('id')"
                    @blur="$v.computer.user.$touch()"
                    aria-describedby="input-2-live-feedback">
                <option v-for="user in getUsers" :key="user.id" :value="user" >{{user.name }}</option>
            </select>
            <b-form-invalid-feedback
                    id="input-2-live-feedback"
            >Please, choose a user.</b-form-invalid-feedback>
            <br>
            <b-input-group prepend="Room: ">
                <b-form-input :disabled="true" :value="computer.user.room.name"></b-form-input>
            </b-input-group>

            <br>

            <b-form-group id="input-group-4">
                    <b-form-checkbox v-model="computer.outOffOffice" switch>Out Off Office</b-form-checkbox>
                    <b-form-checkbox v-model="computer.broken" switch>Broken</b-form-checkbox>
            </b-form-group>

            <b-button type="submit" variant="primary" :disabled="($v.$invalid || !this.valid)">Submit</b-button>
        </b-form>
            <div class="col-xs-6 col-6 col-md-3 mr-5">
                <b-button-group>
                    <b-button variant="success" @click="addNetwork">Add</b-button>
                    <b-button variant="warning" @click="delNetwork">Del</b-button>
                </b-button-group>
                <div class="mt-">
                    <app-network v-for="network in networks" :key="network.id" :network="network" @checkModel="valid = $event"></app-network>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    import Network from '../network/Network.vue';
    import { validationMixin } from "vuelidate";
    import { required} from "vuelidate/lib/validators";

    export default {
        mixins: [validationMixin],
        components: {
            appNetwork: Network
        },
        computed: {
            getUsers() {
                return this.$store.getters.users;
            },
            networks() {
                return this.$store.getters.networks;
            }
        },
        data() {
            return {
                computer: null,
                error: null,
                loading: false,
                valid: true
            }
        },
        methods: {
            ...mapActions({
                loadUsers: 'allUsers',
                loadComputer: 'getComputer',
                loadComputer2: 'getComputer2'
            }),
            changeUserId() {
                this.computer.userId = this.computer.user.id
            },
            addNetwork() {
                this.$store.dispatch('initNetwork')
            },
            delNetwork() {
                this.$store.dispatch('delNetwork')
            },
            validateState(name) {
                const { $dirty, $error } = this.$v.computer[name];
                return $dirty ? !$error : null;
            },
            validateUser(id) {
                const { $dirty, $error } = this.$v.computer.user[id];
                return $dirty ? !$error : null;
            },
            fetchData() {
                this.loading = true;
                this.$store.dispatch('getComputer', this.$route.params.id).then(() => {
                    this.loading = false;
                    this.computer = this.$store.state.computer.computer;
                    this.$store.dispatch('loadNetwork', this.computer.network)
                }, error => {
                    this.error = error;
                    console.log(error)
                })
            },
            onSubmit(evt) {
                evt.preventDefault();
                this.$store.dispatch('updateComputer', this.computer);
            }
        },
        validations: {
            computer: {
                name: {
                    required
                },
                user: {
                    id: {
                        required
                    }
                }
            }
        },
        mounted() {
            this.loadUsers();
            this.fetchData();
        }
    }
</script>
