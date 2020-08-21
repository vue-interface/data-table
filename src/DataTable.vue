<template>
    <div class="data-table">
        <slot name="content" />
        <header v-if="$slots.form || $$slots.buttons" class="data-table-header">
            <div v-if="$slots.form" class="data-table-form">
                <slot name="form" />
            </div>
            <div v-if="$slots.buttons" class="data-table-buttons">
                <slot name="buttons" />
            </div>
        </header>
        <div :class="{'card': !!card, [shadow]: !!shadow}">
            <table class="table" :class="{'loading': !!isLoading}">
                <slot name="thead">
                    <data-table-head @order="onOrderBy">
                        <slot name="th" />
                    </data-table-head>
                </slot>
                <slot name="tbody">
                    <tbody v-if="!isLoading && currentData.length">
                        <tr v-for="(row, i) in currentData" :key="i">
                            <slot :row="row" />
                        </tr>
                    </tbody>
                    <data-table-activity-indicator
                        v-else-if="isLoading"
                        :colspan="colspan"
                        :height="hasLoadedOnce ? currentHeight : initialHeight"
                        :type="indicator"
                        :size="indicatorSize" />
                    <data-table-placeholder
                        v-else
                        :colspan="colspan"
                        :title="!isLoading ? placeholderTitle : undefined"
                        :subtitle="!isLoading ? placeholderSubtitle : undefined">
                        <empty-box class="mt-2" height="5rem" />
                    </data-table-placeholder>
                </slot>
                <slot name="tfoot">
                    <tfoot v-if="$slots.tf">
                        <tr>
                            <slot name="tf" />
                        </tr>
                    </tfoot>
                </slot>
            </table>
            <slot name="pagination">
                <data-table-pagination :type="pagination" :page="currentPage" :total-pages="totalPages" @paginate="onPaginate" />
            </slot>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import DataTableHead from './DataTableHead';
import DataTableActivityIndicator from './DataTableActivityIndicator';
import DataTablePlaceholder from './DataTablePlaceholder';
import DataTablePagination from './DataTablePagination';
import EmptyBox from './EmptyBox';

export default {

    components: {
        DataTableActivityIndicator,
        DataTableHead,
        DataTablePlaceholder,
        DataTablePagination,
        EmptyBox,
    },

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

        limit: String,

        order: [Array, String],

        params: {
            type: Object,
            default() {
                return {};
            }
        },

        page: {
            type: [Number, String],
            default: 1
        },
        
        pagination: {
            type: String,
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
                        limit: this.limit,
                        page: this.currentPage,
                        // order: this.currentSort && Object.entries(this.currentSort).map(([key]) => key).join(','),
                        // sort: this.currentSort && Object.entries(this.currentSort).map(([key, value]) => value).join(','),
                    }, this.params)
                }));
            }
        },
        
        shadow: {
            type: [String, Boolean],
            default: 'shadow-sm'
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
            currentPage: parseInt(this.page),
            currentSort: [],
            currentData: this.data || [],
            hasLoadedOnce: false,
            isLoading: this.activity,
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
  
                this.isLoading = false;
                this.hasLoadedOnce = true;

                /*
                if(!this.currentHeight) { 
                    this.isLoading = false;
                }
                */
                               
                return response;
            });
        },

        setPage(page) {
            this.currentPage = parseInt(page);
        },

        next() {
            this.currentPage++;
        },

        prev() {
            this.currentPage = Math.max(1, --this.currentPage);
        },

        onPaginate(page) {
            this.currentPage = parseInt(page);
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

.data-table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
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

.data-table tfoot .pagination {
    margin-bottom: 0;
}
</style>