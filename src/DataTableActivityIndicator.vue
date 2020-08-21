<template>
    <tbody>
        <tr>
            <td :colspan="colspan">
                <activity-indicator :height="height" :type="type" :size="size" center />
            </td>
        </tr>
    </tbody>
</template>

<script>
import { ActivityIndicator, register } from '@vue-interface/activity-indicator';
import Dots from '@vue-interface/activity-indicator/src/types/Dots';

register({
    'dots': Dots
});

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
            default: 'square-fold'
        },
        size: {
            type: String,
            required: true,
            default: 'sm'
        }
    }
};
</script>