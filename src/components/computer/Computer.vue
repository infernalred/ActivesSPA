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

            <select v-model="userSelect" class="form-control" @change="changeUserId">
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

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
        <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ computer }}</pre>
            <pre v-if="userSelect!==null" class="m-0">{{ userSelect }}}</pre>
        </b-card>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";


    export default {
        data() {
            return {
                computer: {
                    name: '',
                    comment: '',
                    outOffOffice: false,
                    broken: false,
                    userId: 0
                },
                userSelect: null,
                show: true
            }
        },
        computed: {
            getUsers() {
                return this.$store.getters.users;
            }
        },
        methods: {
            ...mapActions({
                loadUsers: 'allUsers'
            }),
            changeUserId() {
                this.computer.userId = this.userSelect.id
            },
            onSubmit(evt) {
                evt.preventDefault();
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
        mounted() {
            this.loadUsers()
        }
    }
</script>
