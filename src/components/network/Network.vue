<template>
    <div @focusout="changeNetwork">
        <b-input-group prepend="IP: ">
            <b-form-input v-model="network.ipAddress"></b-form-input>
        </b-input-group>
        <b-input-group  prepend="MAC: ">
            <b-form-input v-model="network.mac"></b-form-input>
        </b-input-group>
    </div>

</template>
<script>
    export default {
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

            }
        }
    }
</script>
