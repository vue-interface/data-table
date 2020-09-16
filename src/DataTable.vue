<template>
    <div class="data-table">
        <slot name="content" />
        <form ref="form" class="data-table-header" @submit.prevent="onSubmit">
            <div class="data-table-header-left">
                <input-field
                    v-if="search"
                    v-model="params[searchParam]"
                    icon="search"
                    :activity="isSubmitting"
                    :group="false"
                    :placeholder="searchPlaceholder"
                    pill
                    @input="onSearchInput">
                    <template #icon>
                        <magnifying-glass width="1rem" height="1rem" />
                    </template>
                </input-field>
                <slot name="left" />
            </div>
            <div class="data-table-header-right">
                <label v-if="!limitField" class="data-table-header-inline-field" :class="{'mr-3': !!$slots.right}">
                    <span class="mr-2">{{ limitLabel }}</span>
                    <select v-model="currentLimit" class="form-control">
                        <option v-for="value in limitOptions" :key="value">{{ value }}</option>
                    </select>
                </label>
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
                    <tbody v-if="!isLoading && currentData.length">
                        <tr v-for="(row, i) in currentData" :key="i">
                            <slot :row="row" />
                        </tr>
                    </tbody>
                    <data-table-activity-indicator
                        v-else-if="isLoading && indicator"
                        :colspan="colspan"
                        :height="hasLoadedOnce ? currentHeight : initialHeight"
                        :type="indicator"
                        :size="indicatorSize" />
                    <data-table-animated-grid
                        v-else-if="isLoading"
                        :colspan="colspan"
                        wave
                        rounded
                        :rows="currentData.length || currentLimit || 10" />
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
                v-if="pagination && !error"
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
import InputField from '@vue-interface/input-field';
import SelectField from '@vue-interface/select-field';
import { debounce, prefix } from '@vue-interface/utils';
import Shadowable from '@vue-interface/shadowable';
import DataTableActivityIndicator from './DataTableActivityIndicator';
import DataTableAnimatedGrid from './DataTableAnimatedGrid';
import DataTableError from './DataTableError';
import DataTableHead from './DataTableHead';
import DataTablePagination from './DataTablePagination';
import DataTablePlaceholder from './DataTablePlaceholder';
import EmptyBox from './EmptyBox';
import MagnifyingGlass from './MagnifyingGlass';

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

        limit: Number,

        limitField: {
            type: Boolean,
            defaule: true
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
                return this.axios.get(this.url, this.transformRequest({
                    params: Object.assign({
                        [this.limitParam]: this.currentLimit,
                        [this.pageParam]: this.currentPage,
                        // order: this.currentSort && Object.entries(this.currentSort).map(([key]) => key).join(','),
                        // sort: this.currentSort && Object.entries(this.currentSort).map(([key, value]) => value).join(','),
                    }, this.params)
                }));
            }
        },

        search: {
            type: Boolean,
            default: false
        },

        searchPlaceholder: {
            type: String,
            default: 'Search by keyword(s)'
        },

        searchParam: {
            type: String,
            default: 'q'
        },
        
        transformRequest: {
            type: Function,
            default: data => data
        },

        transformResponse: {
            type: Function,
            default: response => {
                if(Array.isArray(response)) {
                    return {
                        data: response,
                        totalPages: Infinity
                    };
                }
                else if(typeof response === 'object') {
                    return {
                        // Attempt to extract the data from `data` or `items` props.
                        data: response.data || response.items,

                        // Attempt to extract the total pages from the response
                        // using logical defaults.
                        totalPages: response.totalPages || response.total_pages || response.lastPage || response.last_page
                    };
                }

                throw new Error(`Invalid response type ${typeof response}`);
            }
        },

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
            return this.$slots.th.filter(vnode => !!vnode.tag).length || 1;
        }
    },

    watch: {
        currentSort(value) {
            if(this.sortLimit && this.sortLimit < value.length) {
                value.splice(0, this.sortLimit).forEach(({ vnode }) => {
                    vnode.componentInstance.saveLastSort();
                    vnode.componentInstance.clear();
                });
            }
        },

        currentPage() {
            const { height } = getComputedStyle(this.$el.querySelector('tbody'));
            const { paddingTop, paddingBottom, borderBottomWidth } = getComputedStyle(this.$el.querySelector('td'));

            this.currentHeight = `calc(${height} - ${paddingTop} - ${paddingBottom} - ${borderBottomWidth})`;
            this.fetch();
        },

        currentLimit() {
            this.fetch();
        }
    },

    mounted() {
        if(this.url) {
            this.fetch();
        }
    },

    methods: {

        handleResponse(response) {
            const transformed = this.transformResponse(response);

            if(Array.isArray(transformed)) {
                this.currentData = transformed;
                this.totalPages = Infinity;
            }

            const { data, totalPages } = transformed;

            this.currentData = data;
            this.totalPages = totalPages;

            return transformed;
        },

        fetch() {
            this.isLoading = true;
            
            return this.request().then(({ data }) => {  
                const response = this.handleResponse(data);
  
                this.currentPage = this.currentPage || 1;
                this.isLoading = false;
                this.hasLoadedOnce = true;
         
                return response;
            }, e => {
                this.isLoading = false;
                this.error = e;
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
            const existing = this.currentSort.reduce((carry, sort) => {
                const [ key ] = Object.keys(sort);

                return key === column ? sort : carry;
            }, null);

            // Delete the sort if undefined.
            if(!direction) {
                this.currentSort.splice(this.currentSort.indexOf(existing), 1);
            }
            // If sort exists, update the existing array.
            else if(existing) {
                existing[column] = direction;
            }
            // If no matching sort, push the array.
            else {
                this.currentSort.push({[column]: direction, vnode});
            }
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

.data-table .input-field.has-focus:not(.is-empty),
.data-table .input-field.has-activity {
    width: 115%;
}

.data-table-header {
    display: flex;
    align-items: center;
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

.data-table-header .data-table-header-inline-field span {
    flex-shrink: 0;
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