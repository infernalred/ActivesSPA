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

            <select v-model="computer.user" class="form-control">
                <option v-for="user in getUsers" :key="user.id" :value="user">{{user.name }} {{user.id }}</option>
            </select>
            <br>
            <b-input-group prepend="Room: ">
                <b-form-input :disabled="true" :value="computer && computer.user && computer.user.room && computer.user.room.name"></b-form-input>
            </b-input-group>

            <br>

            <b-form-group id="input-group-4">
                    <b-form-checkbox v-model="computer.outOffOffice" switch>Out Off Office</b-form-checkbox>
                    <b-form-checkbox v-model="computer.broken" switch>Broken</b-form-checkbox>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";


    export default {
        computed: {
            getUsers() {
                return this.$store.getters.users;
            }
        },
        data() {
            return {
                computer: {
                    name: '',
                    comment: '',
                    outOffOffice: false,
                    broken: false,
                    userId: 0,
                    room: {
                        id: 0,
                        name: '5'
                    }
                },
                userSelect: null,
                show: true,
                loading: true
            }
        },
        methods: {
            ...mapActions({
                loadUsers: 'allUsers',
                loadComputer: 'getComputer'
            }),
            onSubmit() {
                this.computer.userId = this.userSelect!==null ? this.userSelect.id : 0
                this.$store.dispatch('addComputer', this.computer);
            },
            onReset(evt) {
                evt.preventDefault()

                this.loadUsers()
                // Reset our form values
                this.computer.name = ''
                this.computer.comment = ''
                this.computer.outOffOffice = false
                this.computer.broken = false
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        },
        mounted() {
            this.loadUsers();
            //this.computer = this.$store.getters.computer
            //this.loadComputer(this.$route.params.id).then(() => {
            //    this.computer = this.$store.getters.computer;
            //});
            this.$store.dispatch("getComputer", this.$route.params.id).then(response => {
                this.computer = response
            }, error => {
                console.log(error)
            })


            //this.computer.id = this.$route.params.id

        }
    }
</script>
