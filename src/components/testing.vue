<template>
	<div>
		<div
			v-for="item in items"
			:key="item.id"
		>{{ item }}</div><input v-model="data" type="text" /
		<input
			v-model.number="numData"
			type="number"
			step="1"
		/>
		>
		<component :component></component>

		<img
			:src="'/path/to/images/' + fileName"
			alt="altText"
		/>

		<div :style="{ fontSize: data + 'px' }"></div>

		<div :style="[styleObjectA, styleObjectB]"></div>
		<div :class="[classNameA, { classNameB: condition }]"></div>
		<transition
			mode="out-in"
			:css="false"
			@before-enter="beforeEnter"
			@enter="enter"
			@before-leave="beforeLeave"
			@leave="leave"
		></transition>

		<nuxt-link to="/page">page</nuxt-link>
		<router-link :to="{ name: 'name' }">LinkTitle</router-link>
		<router-link :to="{ name: 'name', params: { id: 'value' } }">LinkTitle</router-link>
		<router-link to="path">LinkTitle</router-link>
	</div>
</template>

<script>
import New from '@/components/New.vue';

const mixinName = {
	mounted() {
		console.log('hello from mixin!')
	},
}

Vue.directive('directiveName', {
	bind(el, binding, vnode) {
		el.style.arg = binding.value.arg;
	}
});

import { libName } from 'libName'

import { TimelineMax, Ease } from 'gsap'

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		key: value
	},
	getters: {
	value: state => {
		return state.value;
	}
}
mutations: {
	updateValue(state, payload) {
		state.value = payload;
	}
},
actions: {
	updateValue({commit}, payload) {
		commit('updateValue', payload);
	}
},


});

export default {
	state: {
		value: 'my value'
	},
	getters: {
		value: state => {
			return state.value;
		}
	},
	mutations: {
		updateValue(state, payload) {
			state.value = payload;
		}
	},
	actions: {
		updateValue({commit}, payload) {
			commit('updateValue', payload);
		}
	}
};


import { store } from './store/index';

export const state = () => ({
	value: 'myvalue'
})

export const getters = {
	getterValue: state => {
		return state.value
	}
}

export const mutations = {
	updateValue: (state, payload) => {
		state.value = payload
	}
}

export const actions = {
	updateActionValue({ commit }) {
		commit('updateValue', payload)
	}
}


import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router = new VueRouter({
	base: '/',
	mode: 'history',
	routes: [
		{ path: '/path', component: component }
	}
});


scrollBehavior(to, from, savedPosition) {
	if(savedPosition) {
		return savedPosition;
	} else {
		return { x: 0, y: 0 };
	}
},


router.beforeEach((to, from, next) => {
	next();
};

router.beforeResolve((to, from, next) => {
	next();
};

router.beforeResolve((to, from, next) => {
};







module.exports = {
	css: {
		loaderOptions: {
			sass: {
				data: `@import '@/styles/_variables.scss';`
			}
		}
	}
}


export default {
  data() {
    return {
      key: value
    };
  },
  watch: {
    data(newValue, oldValue) {}
  },
	props: {
		propName: {
			type: Number,
			default:
		},
	},
  created() {},
  computed: {
    name() {
      return this.data;
    }
  },
  methods: {
    name() {}
  }
};
</script>

<style lang="scss" scoped></style>
