<template>
    <div @focusout="changeNetwork">
        <b-input-group prepend="IP: ">
            <b-form-input v-model="$v.network.ipAddress.$model"
                          :state="validateState('ipAddress')"
                          required
                          @blur="$v.network.ipAddress.$touch()"
                          aria-describedby="input-1-live-feedback"></b-form-input>
            <b-form-invalid-feedback
                    id="input-1-live-feedback"
            >Please provide a valid IP address.</b-form-invalid-feedback>
        </b-input-group>

        <b-input-group  prepend="MAC: ">
            <b-form-input v-model="$v.network.mac.$model"
                          :state="validateState2('mac')"
                          required
                          @blur="$v.network.mac.$touch()"
                          aria-describedby="input-2-live-feedback"></b-form-input>
            <b-form-invalid-feedback
                    id="input-2-live-feedback"
            >Please provide a valid MAC.</b-form-invalid-feedback>
        </b-input-group>
    </div>

</template>
<script>
    import { validationMixin } from "vuelidate";
    import { required, macAddress, ipAddress } from "vuelidate/lib/validators";

    export default {
        mixins: [validationMixin],
        props: ['network'],
        methods: {
            changeNetwork() {
                const net = {
                    networkId: this.network.id,
                    ipAddress: this.network.ipAddress,
                    mac: this.network.mac
                };
                console.log(net);
                this.$store.dispatch('setNetwork', net);

            },
            validateState() {
                const { $dirty, $error} = this.$v.network.ipAddress;
                return $dirty ? !$error : null;
            },
            validateState2() {
                const { $dirty, $error} = this.$v.network.mac;
                return $dirty ? !$error : null;
            },
        },
        validations: {
            network: {
                ipAddress: {
                    required,
                    ipAddress
                },
                mac: {
                    required,
                    macAddress: macAddress()
                }
            }
        },
    }
</script>
