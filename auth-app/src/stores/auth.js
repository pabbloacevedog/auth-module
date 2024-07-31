import { defineStore } from 'pinia';
import { apolloClient, gql } from '../plugins/apollo';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
        error: null,
    }),
    actions: {
        async login(credentials) {
            const LOGIN_MUTATION = gql`
        mutation Login($identifier: String!, $password: String!) {
          login(input: { identifier: $identifier, password: $password }) {
            jwt
            user {
              id
              username
              email
            }
          }
        }
      `;
            try {
                const response = await apolloClient.mutate({
                    mutation: LOGIN_MUTATION,
                    variables: credentials,
                });
                const { jwt, user } = response.data.login;
                this.token = jwt;
                this.user = user;
                this.error = null;
                localStorage.setItem('token', jwt);
                localStorage.setItem('user', JSON.stringify(user));
                return user;
            } catch (error) {
                this.error = error.message;
                throw error;
            }
        },
        async register(details) {
            const REGISTER_MUTATION = gql`
        mutation Register($username: String!, $email: String!, $password: String!) {
          register(input: { username: $username, email: $email, password: $password }) {
            jwt
            user {
              id
              username
              email
            }
          }
        }
      `;
            try {
                const response = await apolloClient.mutate({
                    mutation: REGISTER_MUTATION,
                    variables: details,
                });
                const { jwt, user } = response.data.register;
                this.token = jwt;
                this.user = user;
                this.error = null;
                localStorage.setItem('token', jwt);
                localStorage.setItem('user', JSON.stringify(user));
                return user;
            } catch (error) {
                this.error = error.message;
                throw error;
            }
        },
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        clearError() {
            this.error = null;
        },
        restoreUser() {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');
            if (token && user) {
                this.token = token;
                this.user = JSON.parse(user);
            }
        }
    },
});
