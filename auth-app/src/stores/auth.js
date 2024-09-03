import { defineStore } from "pinia";
import { apolloClient, gql } from "../plugins/apollo";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		email: null,
		token: localStorage.getItem("token") || null,
		error: null,
	}),
	actions: {
		async login(credentials) {
			const LOGIN_QUERY = gql`
				query Login($email: String!, $password: String!) {
					login( email: $email, password: $password ) {
						token
						email
					}
				}
			`;
			try {
				const response = await apolloClient.query({
					query: LOGIN_QUERY,
					variables: credentials,
				});
				const { token, email } = response.data.login;
				this.token = token;
				this.email = email;
				this.error = null;
				localStorage.setItem("token", token);
				localStorage.setItem("email", JSON.stringify(email));
				return email;
			} catch (error) {
				this.error = error.message;
				throw error;
			}
		},
		async register(details) {
			const REGISTER_MUTATION = gql`
				mutation Register(
					$email: String!
					$password: String!
					) {
					register(
						 email: $email, password: $password
					) {
						email
					}
				}
			`;
			try {
				const response = await apolloClient.mutate({
					mutation: REGISTER_MUTATION,
					variables: details,
				});
				const { token, email } = response.data.register;
				this.token = token;
				this.email = email;
				this.error = null;
				localStorage.setItem("token", token);
				localStorage.setItem("email", JSON.stringify(email));
				return email;
			} catch (error) {
				this.error = error.message;
				throw error;
			}
		},
		logout() {
			this.token = null;
			this.email = null;
			localStorage.removeItem("token");
			localStorage.removeItem("email");
		},
		clearError() {
			this.error = null;
		},
		restoreUser() {
			const token = localStorage.getItem("token");
			const email = localStorage.getItem("email");
			if (token && email) {
				this.token = token;
				this.email = JSON.parse(email);
			}
		},
	},
});
