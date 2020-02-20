<template>
    <div class="computer">
        <div v-if="loading" class="loading">
            <h1>LOADING</h1>
            <b-spinner variant="danger" type="grow" label="Spinning"></b-spinner>
        </div>
    <div class="container" v-if="computer">
        <div class="row justify-content-left">
        <b-form @submit="onSubmit" >

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
                <b-form-input :disabled="true" :value="computer.user.room.name"></b-form-input>
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
    </div>
</template>

<script>
    import {mapActions} from "vuex";


    export default {
        computed: {
            getUsers() {
                return this.$store.getters.users;
            },
            computer3: {
                get() {
                    return this.$store.state.computer.computer;
                },
                set() {
                    this.$store.dispatch("addComputer", this.computer);
                }
            }
        },
        data() {
            return {
                computer: null,
                error: null,
                loading: false
            }
        },
        methods: {
            ...mapActions({
                loadUsers: 'allUsers',
                loadComputer: 'getComputer',
                loadComputer2: 'getComputer2'
            }),
            fetchData() {
                this.loading = true
                //this.loadComputer2(this.$route.params.id);
                this.$store.dispatch('getComputer', this.$route.params.id).then(() => {
                    console.log(this.loading)
                    this.loading = false
                    console.log(this.$store.state.computer.computer)
                    this.computer = this.$store.state.computer.computer;
                    console.log(this.computer)
                    console.log(this.loading)
                }, error => {
                    console.log(error)
                })
            },
            onSubmit(evt) {
                evt.preventDefault();
                this.$store.dispatch('updateComputer', this.computer);
            }
        },
        mounted() {
            this.loadUsers();
            this.fetchData();
            //this.$store.dispatch('getComputer2', this.$route.params.id);
        }
    }
</script>
