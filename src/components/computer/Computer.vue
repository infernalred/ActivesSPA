<template>
    <div class="container">
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
                <b-form-input
                        id="input-1"
                        v-model="computer.comment"
                        placeholder="Enter comment"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="User:" label-for="input-3">
                <b-form-select
                        id="input-3"
                        v-model="computer.user"
                        :options="peoples"
                        required
                ></b-form-select>
            </b-form-group>

            <b-form-group id="input-group-4">
                    <b-form-checkbox v-model="computer.outOffOffice" switch>Out Off Office</b-form-checkbox>
                    <b-form-checkbox v-model="computer.broken" switch>Broken</b-form-checkbox>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
        <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ computer }}</pre>
        </b-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                computer: {
                    name: '',
                    comment: '',
                    user: null,
                    outOffOffice: false,
                    broken: false

                },
                peoples: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
                show: true
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault()
                alert(JSON.stringify(this.computer))
            },
            onReset(evt) {
                evt.preventDefault()
                // Reset our form values
                this.computer.name = ''
                this.computer.comment = ''
                this.computer.user = null
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
