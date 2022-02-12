<template>
    <tbody>
        <tr v-for="y in rows" :key="`row-${y}`">
            <td v-for="x in colspan" :key="`col-${x}`">
                <data-table-animated-gradient
                    :height="height"
                    :rounded="rounded"
                    :pulse="pulse"
                    :wave="wave" />
            </td>
        </tr>
    </tbody>
</template>

<script>
import DataTableAnimatedGradient from './DataTableAnimatedGradient.vue';

export default {
    components: {
        DataTableAnimatedGradient
    },
    props: {
        colspan: {
            type: Number,
            required: true
        },
        height: {
            type: [Number, String]
        },
        pulse: Boolean,
        wave: Boolean,
        rounded: Boolean,
        rows: {
            type: Number,
            required: true
        },
    }
};
</script>