<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-nav>
                <router-link to="/" class="navbar-brand" active-class="active">Home</router-link>

                <!-- Navbar dropdowns -->
                <b-nav-item-dropdown text="Type" right role="button">
                    <b-dropdown-item router-link to="/computers" active-class="active">Computers</b-dropdown-item>
                    <b-dropdown-item router-link to="/monitors" active-class="active">Monitors</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown text="Add new" right>
                    <b-dropdown-item router-link to="/computer">Computer</b-dropdown-item>
                    <b-dropdown-item router-link to="/monitor">Monitor</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isDropDownOpen: false
            }
        }
    }
</script>
