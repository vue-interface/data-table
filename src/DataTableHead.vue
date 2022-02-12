<script>
import DataTableAnchor from './DataTableAnchor.vue';

export default {
    functional: true,

    render(h, context) {
        context.children
            .filter(vnode => !!(
                vnode.tag
                && vnode.data
                && vnode.data.attrs
                && vnode.data.attrs['data-order']
            ))
            .map(vnode => {
                const anchor = h(DataTableAnchor, {
                    props: {
                        sort: vnode.data.attrs['data-sort']
                    },
                    nativeOn: {
                        click(e) {
                            const sort = anchor.componentInstance.toggle();
                            
                            if(context.listeners && context.listeners.order) {
                                e.preventDefault();
                                
                                context.listeners.order(
                                    vnode.data.attrs['data-order'], sort, anchor, context.children
                                );
                            }
                        }
                    }
                }, vnode.children);
                        
                return Object.assign(vnode, {
                    children: [
                        anchor
                    ]
                });
            });
        
        return h('thead', [
            h('tr', [context.children])
        ]);
    }
};
</script>