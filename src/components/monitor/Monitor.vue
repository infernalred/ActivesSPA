<template>
    <div class="container">
        <div class="row justify-content-left mt-3">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">

                <b-form-group id="input-group-2" label="Serial number:" label-for="input-2">
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

                <b-form-select v-model="$v.userSelect.$model" class="form-control" required @change="changeUserId"
                               :state="validateUser('id')"
                               @blur="$v.userSelect.$touch()"
                               aria-describedby="input-2-live-feedback">
                    <option v-for="user in getUsers" :key="user.id" :value="user">{{user.name }} {{user.id }}</option>
                </b-form-select>
                <b-form-invalid-feedback
                        id="input-2-live-feedback"
                >Please, choose a user.</b-form-invalid-feedback>
                <br>
                <br>
                <b-input-group prepend="Room: ">
                    <b-form-input :disabled="true" :value="userSelect!==null ? userSelect.room.name : '0'"></b-form-input>
                </b-input-group>

                <br>

                <b-form-group id="input-group-4">
                    <b-form-checkbox v-model="monitor.outOffOffice" switch>Out Off Office</b-form-checkbox>
                    <b-form-checkbox v-model="monitor.broken" switch>Broken</b-form-checkbox>
                </b-form-group>
                <b-form-select v-model="$v.vendorSelect.$model" class="form-control" required @change="changeVendorId"
                               :state="validateVendor('id')"
                               @blur="$v.vendorSelect.$touch()"
                               aria-describedby="input-3-live-feedback">
                    <option v-for="vendor in getVendors" :key="vendor.id" :value="vendor">{{vendor.name }}</option>
                </b-form-select>
                <b-form-invalid-feedback
                        id="input-3-live-feedback"
                >Please, choose a user.</b-form-invalid-feedback>
                <br>
                <br>
                <b-button type="submit" variant="primary" :disabled="($v.$invalid)">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
            </div>
        </div>
</template>

<script>
    import {mapActions} from "vuex";
    import { validationMixin } from "vuelidate";
    import { required} from "vuelidate/lib/validators";

    export default {
        mixins: [validationMixin],
        data() {
            return {
                monitor: {
                    serial: null,
                    comment: '',
                    outOffOffice: false,
                    broken: false,
                    userId: 0,
                    vendorId: 0,
                },
                userSelect: null,
                vendorSelect: null,
                show: true
            }
        },
        validations: {
            monitor: {
                serial: {
                    required
                }
            },
            userSelect: {
                id: {
                    required
                }
            },
            vendorSelect: {
                id: {
                    required
                }
            }
        },
        computed: {
            getUsers() {
                return this.$store.getters.users;
            },
            getVendors() {
                return this.$store.getters.vendors;
            }
        },
        methods: {
            ...mapActions({
                loadUsers: 'allUsers',
                loadVendors: 'allVendors'
            }),
            changeUserId() {
                this.monitor.userId = this.userSelect.id
            },
            changeVendorId() {
                this.monitor.vendorId = this.vendorSelect.id
            },
            validateState(serial) {
                const { $dirty, $error } = this.$v.monitor[serial];
                return $dirty ? !$error : null;
            },
            validateUser(id) {
                const { $dirty, $error } = this.$v.userSelect[id];
                return $dirty ? !$error : null;
            },
            validateVendor(id) {
                const { $dirty, $error } = this.$v.vendorSelect[id];
                return $dirty ? !$error : null;
            },

            onSubmit(evt) {
                evt.preventDefault();
                this.$store.dispatch("addMonitor", this.monitor).then(response => {
                    if (response.status === 204)
                    {
                        this.$router.push('/monitors');
                    }
                }, error => {
                    console.log(error)
                })


            },
            onReset(evt) {
                evt.preventDefault();

                this.loadUsers();
                this.loadVendors();
                // Reset our form values
                this.monitor.serial = '';
                this.monitor.comment = '';
                this.monitor.userId = this.userSelect!==null ? this.userSelect.id : 0;
                this.monitor.outOffOffice = false;
                this.monitor.broken = false;
                this.monitor.vendorId = this.vendorSelect!==null ? this.vendorSelect.id : 0;
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        },
        mounted() {
            this.loadUsers();
            this.loadVendors();
        }
    }
</script>
