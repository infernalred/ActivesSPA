<template>
    <div class="monitor">
        <div v-show="loading" class="loading justify-content-center mb-3">
            <b-spinner variant="danger" type="grow" label="Spinning"></b-spinner>
        </div>
        <div class="container" v-if="monitor">
            <div class="row justify-content-left">
                <b-form @submit="onSubmit" >

                    <b-form-group id="input-group-2" label="Serial:" label-for="input-2">
                        <b-form-input
                                id="input-2"
                                v-model="$v.monitor.serial.$model"
                                required
                                placeholder="Enter serial"
                                :state="validateState('serial')"
                                @blur="$v.monitor.serial.$touch()"
                                aria-describedby="input-1-live-feedback"
                        ></b-form-input>
                        <b-form-invalid-feedback
                                id="input-1-live-feedback"
                        >This is a required field.</b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group id="input-group-1" label="Comment:" label-for="input-1">
                        <b-form-textarea
                                id="input-1"
                                v-model="monitor.comment"
                                placeholder="Enter comment"
                                rows="3"
                                max-rows="6"
                        ></b-form-textarea>
                    </b-form-group>

                    <select v-model="$v.monitor.user.$model" class="form-control" @change="changeUserId"
                            :state="validateUser('id')"
                            @blur="$v.monitor.user.$touch()"
                            aria-describedby="input-2-live-feedback">>
                        <option v-for="user in getUsers" :key="user.id" :value="user" >{{user.name }}</option>
                    </select>
                    <b-form-invalid-feedback
                        id="input-2-live-feedback">Please, choose a user.</b-form-invalid-feedback>
                    <br>
                    <b-input-group prepend="Room: ">
                        <b-form-input :disabled="true" :value="monitor.user.room.name"></b-form-input>
                    </b-input-group>

                    <br>

                    <b-form-group id="input-group-4">
                        <b-form-checkbox v-model="monitor.outOffOffice" switch>Out Off Office</b-form-checkbox>
                        <b-form-checkbox v-model="monitor.broken" switch>Broken</b-form-checkbox>
                    </b-form-group>
                    <b-form-select v-model="$v.monitor.vendor.$model" class="form-control" required @change="changeVendorId"
                                   :state="validateVendor('id')"
                                   @blur="$v.monitor.vendor.$touch()"
                                   aria-describedby="input-3-live-feedback">
                        <option v-for="vendor in getVendors" :key="vendor.id" :value="vendor">{{vendor.name }}</option>
                    </b-form-select>
                    <b-form-invalid-feedback
                            id="input-3-live-feedback"
                    >Please, choose a vendor.</b-form-invalid-feedback>
                    <br>
                    <br>

                    <b-button type="submit" variant="primary" :disabled="$v.$invalid">Submit</b-button>
                </b-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    import { validationMixin } from "vuelidate";
    import { required} from "vuelidate/lib/validators";

    export default {
        mixins: [validationMixin],
        computed: {
            getUsers() {
                return this.$store.getters.users;
            },
            getVendors() {
                return this.$store.getters.vendors;
            }
        },
        data() {
            return {
                monitor: null,
                error: null,
                loading: false
            }
        },
        methods: {
            ...mapActions({
                loadUsers: 'allUsers',
                loadVendors: 'allVendors',
                loadMonitor: 'getMonitor',
                loadMonitor2: 'getMonitor2'
            }),
            changeUserId() {
                this.monitor.userId = this.monitor.user.id
            },
            changeVendorId() {
                this.monitor.vendorId = this.monitor.vendor.id
            },
            validateState(serial) {
                const { $dirty, $error } = this.$v.monitor[serial];
                return $dirty ? !$error : null;
            },
            validateUser(id) {
                const { $dirty, $error } = this.$v.monitor.user[id];
                return $dirty ? !$error : null;
            },
            validateVendor(id) {
                const { $dirty, $error } = this.$v.monitor.vendor[id];
                return $dirty ? !$error : null;
            },
            fetchData() {
                this.loading = true;
                this.$store.dispatch('getMonitor', this.$route.params.id).then(() => {
                    this.loading = false;
                    this.monitor = this.$store.state.monitor.monitor;
                }, error => {
                    this.error = error;
                    console.log(error)
                })
            },
            onSubmit(evt) {
                evt.preventDefault();
                this.$store.dispatch('updateMonitor', this.monitor);
            }
        },
        validations: {
            monitor: {
                serial: {
                    required
                },
                user: {
                    id: {
                        required
                    }
                },
                vendor: {
                    id: {
                        required
                    }
                }
            },
        },
        mounted() {
            this.loadUsers();
            this.fetchData();
            this.loadVendors();
        }
    }
</script>
