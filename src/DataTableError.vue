<template>
    <tbody>
        <tr>
            <td :colspan="colspan">
                {{ error }}
            </td>
        </tr>
    </tbody>
</template>

<script>
export default {
    props: {
        colspan: Number,
        error: Error
    }
};
</script>