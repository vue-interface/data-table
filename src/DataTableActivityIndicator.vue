<template>
    <tbody>
        <tr>
            <td :colspan="colspan">
                <activity-indicator :height="height" :size="size" :type="type" center />
            </td>
        </tr>
    </tbody>
</template>

<script>
import { ActivityIndicator } from '@vue-interface/activity-indicator';

export default {
    components: {
        ActivityIndicator
    },
    props: {
        colspan: {
            type: Number,
            required: true
        },
        height: {
            type: [Number, String]
        },
        type: {
            type: String,
            required: true,
            default: 'dots'
        },
        size: {
            type: String,
            required: true,
            default: 'sm'
        }
    }
};
</script>