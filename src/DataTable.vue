<template>
    <div class="data-table">
        <slot name="content" />
        <form v-if="title || search || $slots.left" ref="form" class="data-table-header" @submit.prevent="onSubmit">
            <div class="data-table-header-left">
                <slot name="title">
                    <component :is="titleTag" v-if="title" :class="{'mb-3': search, 'mb-0': !search}">
                        {{ title }}
                    </component>
                </slot>
                <slot name="search">
                    <input-field
                        v-if="search"
                        v-model="params[searchParam]"
                        :activity="isSubmitting"
                        :group="false"
                        :placeholder="searchPlaceholder"
                        :label="searchLabel"
                        class="data-table-search"
                        @input="onSearchInput">
                        <template #icon>
                            <slot name="search-icon">
                                <magnifying-glass width="1rem" height="1rem" />
                            </slot>
                        </template>
                    </input-field>
                </slot>
                <slot name="left" />
            </div>
            <div class="data-table-header-right">
                <slot name="limit">
                    <label v-if="hasLoadedOnce && limitField" class="data-table-header-inline-field" :class="{'has-slot': !!$slots.right}">
                        <span class="data-table-header-inline-field-label">{{ limitLabel }}</span>
                        <select v-model="currentLimit" class="form-select form-control">
                            <option v-for="value in limitOptions" :key="value">{{ value }}</option>
                        </select>
                    </label>
                </slot>
                <slot name="right" />
            </div>
        </form>
        <div :class="{'card': !!card, [shadowableClass]: !!shadow}">
            <table class="table" :class="{'loading': !!isLoading}">
                <slot name="thead" :colspan="colspan" :onOrderBy="onOrderBy">
                    <data-table-head @order="onOrderBy">
                        <slot name="th" :colspan="colspan" />
                    </data-table-head>
                </slot>
                <slot
                    name="tbody"
                    :colspan="colspan"
                    :currentData="currentData"
                    :error="error"
                    :isLoading="isLoading"
                    :title="placeholderTitle"
                    :subtitle="placeholderSubtitle">
                    <data-table-activity-indicator
                        v-if="isLoading && indicator"
                        :colspan="colspan"
                        :height="hasLoadedOnce ? currentHeight : initialHeight"
                        :type="indicator"
                        :size="indicatorSize" />
                    <data-table-animated-grid
                        v-else-if="isLoading"
                        :colspan="colspan"
                        wave
                        rounded
                        :rows="currentData.length || currentLimit" />
                    <tbody v-else-if="!isLoading && currentData.length">
                        <tr v-for="(row, i) in currentData" :key="i">
                            <slot :row="row" />
                        </tr>
                    </tbody>
                    <data-table-error
                        v-else-if="error"
                        :colspan="colspan"
                        :error="error">
                        <slot name="error" :error="error" />
                    </data-table-error>
                    <data-table-placeholder
                        v-else
                        :colspan="colspan"
                        :title="!isLoading ? placeholderTitle : undefined"
                        :subtitle="!isLoading ? placeholderSubtitle : undefined">
                        <empty-box class="mt-2" height="5rem" />
                    </data-table-placeholder>
                </slot>
                <slot name="tfoot" :colspan="colspan">
                    <tfoot v-if="$slots.tf">
                        <tr>
                            <slot name="tf" :colspan="colspan" />
                        </tr>
                    </tfoot>
                </slot>
            </table>
        </div>
        <slot
            name="pagination"
            :currentPage="currentPage"
            :hasLoadedOnce="hasLoadedOnce"
            :page="currentPage"
            :totalPages="totalPages">
            <data-table-pagination
                v-if="totalPages > 1 && hasLoadedOnce && pagination && !error"
                :disabled="!hasLoadedOnce"
                :type="pagination"
                :page="currentPage"
                :total-pages="totalPages"
                :shadow="shadow"
                class="mt-3"
                @paginate="onPaginate" />
        </slot>
    </div>
</template>

<script>
import axios from 'axios';
import debounce from 'lodash.debounce';
import { InputField } from '@vue-interface/input-field';
import { Shadowable } from '@vue-interface/shadowable';
import DataTableActivityIndicator from './DataTableActivityIndicator.vue';
import DataTableAnimatedGrid from './DataTableAnimatedGrid.vue';
import DataTableError from './DataTableError.vue';
import DataTableHead from './DataTableHead.vue';
import DataTablePagination from './DataTablePagination.vue';
import DataTablePlaceholder from './DataTablePlaceholder.vue';
import EmptyBox from './EmptyBox.vue';
import MagnifyingGlass from './MagnifyingGlass.vue';
import { handleResponse, handleRequest } from './transformers.js';

const debounced = debounce((fn, ...args) => fn(...args), 500);

export default {

    components: {
        DataTableActivityIndicator,
        DataTableAnimatedGrid,
        DataTableError,
        DataTableHead,
        DataTablePagination,
        DataTablePlaceholder,
        EmptyBox,
        InputField,
        MagnifyingGlass
    },
    
    mixins: [
        Shadowable  
    ],

    props: {
        activity: Boolean,

        axios: {
            type: [Object, Function],
            default: () => axios
        },
        
        card: Boolean,

        data: Array,
        
        indicator: String,
        
        indicatorSize: String,

        initialHeight: {
            type: [String, Number],
            default: 250
        },

        limit: {
            type: Number,
            default: 10
        },

        limitField: {
            type: Boolean,
            default: true
        },

        limitLabel: {
            type: String,
            default: 'Per Page'
        },

        limitOptions: {
            type: Array,
            default: () => [1, 5, 10, 20, 50, 100]
        },

        limitParam: {
            type: String,
            default: 'limit'
        },

        order: [Array, String],

        params: {
            type: Object,
            default() {
                return {};
            }
        },

        page: Number,

        pageParam: {
            type: String,
            default: 'page'
        },
        
        pagination: {
            type: [Boolean, String],
            default: 'full',
            validate(value) {
                return ['simple', 'full'].indexOf(value) > -1;
            }
        },

        placeholderTitle: {
            type: String,
            default: 'Oops!'
        },

        placeholderSubtitle: {
            type: String,
            default: 'This table is empty.'
        },

        request: {
            type: Function,
            default() {
                const transformer = this.transformRequest || handleRequest;

                return this.axios.get(this.url, transformer({
                    params: Object.assign({
                        [this.limitParam]: this.currentLimit,
                        [this.pageParam]: this.currentPage,
                        order: this.currentSort.length ? this.currentSort.map(({ column }) => column).join(',') : undefined,
                        sort: this.currentSort.length ? this.currentSort.map(({ direction }) => direction).join(',') : undefined,
                    }, this.params)
                }));
            }
        },

        search: {
            type: Boolean,
            default: false
        },

        searchLabel: String,

        searchPlaceholder: {
            type: String,
            default: 'Search by keyword(s)'
        },

        searchParam: {
            type: String,
            default: 'q'
        },

        title: String,

        titleTag: {
            type: String,
            default: 'h3'
        },

        transformRequest: Function,

        transformResponse: Function,
        
        // default: response => {
        //     console.log('test');
                
        // if(Array.isArray(response)) {
        //     return {
        //         data: response,
        //         totalPages: Infinity
        //     };
        // }
        // else if(typeof response === 'object') {
        //     return {
        //         // Attempt to extract the data from `data` or `items` props.
        //         data: response.data || response.items,

        //         // Attempt to extract the total pages from the response
        //         // using logical defaults.
        //         totalPages: response.last_page || response.lastPage || response.totalPages || response.total_pages
        //     };
        // }

        // throw new Error(`Invalid response type ${typeof response}`);
        // }

        size: String,

        sort: [Array, String],
        
        sortLimit: Number,
        
        url: String
    },

    data() {
        return {
            currentHeight: null,
            currentLimit: this.limit,
            currentPage: this.page ? parseInt(this.page) : undefined,
            currentSort: [],
            currentData: this.data || [],
            error: null,
            hasLoadedOnce: false,
            isLoading: this.activity,
            isSubmitting: false,
            totalPages: Infinity
        };
    },

    computed: {
        colspan() {
            return this.$slots.th && (
                this.$slots.th.filter(vnode => !!vnode.tag).length || 1
            );
        }
    },

    watch: {
        currentSort: {
            deep: true,
            handler(value) {
                if(this.sortLimit && this.sortLimit < value.length) {
                    value.splice(0, this.sortLimit).forEach(({ vnode }) => {
                        vnode.componentInstance.saveLastSort();
                        vnode.componentInstance.clear();
                    });
                }

                this.fetch();
            }
        },
        
        currentPage(value, oldValue) {
            if(value && (oldValue || oldValue === undefined)) {
                const { height } = getComputedStyle(this.$el.querySelector('tbody'));
                const { paddingTop, paddingBottom, borderBottomWidth } = getComputedStyle(this.$el.querySelector('td'));

                this.currentHeight = `calc(${height} - ${paddingTop} - ${paddingBottom} - ${borderBottomWidth})`;
                this.fetch();
            }
        },

        currentLimit(value, oldValue) {
            if(value && oldValue) {
                this.fetch();
            }
        }
    },

    mounted() {
        if(this.url) {
            this.fetch();
        }
    },

    methods: {

        handleResponse(response) {
            const transformer = this.transformResponse || handleResponse;
            const transformed = transformer(response);

            if(typeof transformed === 'object') {
                const { data, totalPages } = transformed;

                this.hasLoadedOnce = true;
                this.currentData = data;
                this.totalPages = totalPages;

                return transformed;
            }

            throw Error('The transformed response must return an object.');
        },

        fetch() {
            this.isLoading = true;
            
            return this.request()
                .then(this.handleResponse, e => {
                    this.error = e;
                }).finally(() => {
                    this.isLoading = false;
                });
        },

        setPage(page) {
            this.currentPage = parseInt(page || 1);
        },

        next() {
            this.currentPage++;
        },

        prev() {
            this.currentPage = Math.max(1, --this.currentPage);
        },

        submit() {
            this.$refs.form.dispatchEvent(new Event('submit'));
        },

        onPaginate(page) {
            this.currentPage = parseInt(page || 1);
        },

        orderBy(column, direction, vnode) {
            // Find existing sort.
            const existing = this.currentSort.reduce((carry, item) => {
                return item.column === column ? item : carry;
            }, null);

            // Delete the sort if undefined.
            if(!direction) {
                this.currentSort.splice(this.currentSort.indexOf(existing), 1);
            }
            // If sort exists, update the existing array.
            else if(existing) {
                existing.direction = direction;
            }
            // If no matching sort, push the array.
            else {
                this.currentSort.push({column, direction, vnode});
            }
        },

        orderByKeys() {
            return this.currentSort.filter();
        },

        onSearchInput(value) {
            if(value) {
                debounced(this.submit);
            }
            else {
                this.submit();
            }
        },

        onSubmit(e) {
            this.isSubmitting = true;
            this.fetch().then(() => {
                this.isSubmitting = false;
            });
        },

        onOrderBy(column, direction, vnode) {
            this.orderBy(column, direction, vnode);
            this.$emit('sort', this.currentSort);
        }
    }
};
</script>

<style>
.data-table {
    position: relative;
}

.data-table .input-field {
    width: 100%;   
}

.data-table .input-field:not(.is-empty),
.data-table .input-field.has-focus,
.data-table .input-field.has-activity {
    width: 115%;
}

.data-table .data-table-search .form-control {
    border-radius: 1000rem;
}

.data-table-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.data-table-header .data-table-header-right {
    display: flex;
}

.data-table-header .data-table-header-inline-field {
    display: inline-flex;
    align-items: center;
    margin: 0;
}

.data-table-header .data-table-header-inline-field.has-slot {
    margin-right: .75rem;
}

.data-table-header .data-table-header-inline-field span {
    flex-shrink: 0;
}

.data-table-header .data-table-header-inline-field-label {
    margin-right: .5rem;
}

.data-table-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
}

.data-table .activity-indicator {
    background: rgba(255, 255, 255, .666);
}

.card > .table {
    margin-bottom: 0;
}

.card > .table thead th {
    border-top: 0;
    border-bottom: 0;
}

.card > .table thead:first-child {
    border-radius: .25em 0 0 0;
}

.card > .table thead:last-child {
    border-radius: 0 .25em 0 0;
}

.data-table .pagination {
    margin-bottom: 0;
}
</style>