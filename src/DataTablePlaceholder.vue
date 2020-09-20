<template>
    <tbody>
        <tr>
            <td :colspan="colspan">
                <div class="my-5 text-center bg-white">
                    <h3 v-if="title">
                        {{ title }}
                    </h3>
                    <h4 v-if="subtitle" class="font-weight-light">
                        {{ subtitle }}
                    </h4>
                    <slot />
                </div>
            </td>
        </tr>
    </tbody>
</template>

<script>
export default {
    props: {
        colspan: Number,
        title: String,
        subtitle: String,
    }
};
</script>