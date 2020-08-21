<template>
    <div v-if="type === 'full'" class="data-table-pagination-full">
        <pagination :page="page" :total-pages="totalPages" @paginate="onPaginate" />
    </div>
    <div v-else class="data-table-pagination-simple">
        <button type="button" class="btn btn-light" :disabled="page === 1" @click="$emit('paginate', Math.max(1, page - 1))">
            &larr; Prev
        </button>
        <div>
            Page {{ page }} of {{ isInfinity ? totalPages : '&#8734;' }}
        </div>
        <button type="button" class="btn btn-light" :disabled="page === totalPages" @click="$emit('paginate', page + 1)">
            Next &rarr;
        </button>
    </div>
</template>

<script>
import Pagination from '@vue-interface/pagination';

export default {
    components: {
        Pagination
    },
    props: {
        page: {
            type: Number,
            required: true,
        },
        totalPages: Number,
        type: String,
    },
    computed: {
        isInfinity() {
            return this.totalPages < Infinity;
        }
    },
    methods: {
        onPaginate(page) {
            this.$emit('paginate', page);
        }
    }
};
</script>

<style>
.data-table-pagination-full {
    display: flex;
    align-items: center;
    justify-content: center;
}
.data-table-pagination-simple {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>