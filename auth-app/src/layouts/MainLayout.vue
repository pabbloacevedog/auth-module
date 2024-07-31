<template>
    <q-layout view="hHh lpR fFf">
        <template v-if="!isAuthRoute">
            <q-header>
                <q-toolbar class="q-pa-md bg-primary text-white">
                    <q-btn flat round dense icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
                    <q-toolbar-title class="q-ml-md">
                        My Basic Auth
                    </q-toolbar-title>
                    <q-space />
                    <template v-if="!isAuthenticated">
                        <q-btn flat round dense icon="login" label="Login" @click="router.push('/login')"
                            class="text-white q-mr-md" />
                        <q-btn flat round dense icon="person_add" label="Register" @click="router.push('/register')"
                            class="text-white q-mr-md" />
                    </template>
                    <template v-else>
                        <q-btn flat round dense icon="home" label="Home" @click="router.push('/')"
                            class="text-white q-mr-md" />
                        <q-btn flat round dense icon="logout" label="Logout" @click="logout" class="text-white q-mr-md" />
                    </template>
                </q-toolbar>
            </q-header>

            <q-drawer v-model="leftDrawerOpen" show-if-above :mini="miniState" @mouseover="miniState = false" overlay
                @mouseout="miniState = true" :width="200" :breakpoint="500" bordered
                :class="$q.dark.isActive ? 'glass' : 'glass'">
                <q-list>
                    <q-item to="/" clickable v-ripple class="text-white">
                        <q-item-section avatar>
                            <q-icon name="home" />
                        </q-item-section>
                        <q-item-section>Home</q-item-section>
                    </q-item>
                    <q-item to="/protected" clickable v-ripple class="text-white">
                        <q-item-section avatar>
                            <q-icon name="lock" />
                        </q-item-section>
                        <q-item-section>Protected Page</q-item-section>
                    </q-item>
                </q-list>
            </q-drawer>
        </template>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';

export default defineComponent({
    name: 'MainLayout',

    setup() {
        const leftDrawerOpen = ref(false);
        const router = useRouter();
        const route = useRoute();
        const authStore = useAuthStore();

        const isAuthenticated = computed(() => !!authStore.token);
        const isAuthRoute = computed(() => ['/login', '/register'].includes(route.path));

        const toggleLeftDrawer = () => {
            leftDrawerOpen.value = !leftDrawerOpen.value;
        };

        const logout = () => {
            authStore.logout();
            router.push('/login');
        };

        return {
            leftDrawerOpen,
            router,
            toggleLeftDrawer,
            isAuthenticated,
            isAuthRoute,
            logout,
        };
    },
});
</script>

<style scoped>
.bg-primary {
    background-color: #6200ea;
}

.text-white {
    color: white;
}

.drawer {
    background-color: #6200ea;
    color: white;
}
.q-drawer {
    background: rgba(255, 255, 255, .3);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    border: 1.5px solid rgba(209, 213, 219, 0.3);
    color: white;
}
</style>
