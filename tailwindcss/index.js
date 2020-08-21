const Color = require('color');
const rgba = require('hex-to-rgba');
const plugin = require('tailwindcss/plugin');
const { colors } = require('tailwindcss/defaultTheme');
const defaultVariations = require('@vue-interface/variant/tailwindcss/defaultVariations');

function darken(color, ...args) {
    return Color(color).darken(...args).hex();
}

function opacity(color) {
    const matches = Color(color)
        .toString()
        .match(/^rgba\((\d+,\s?){3}(\d?.?\d+)\)$/);

    return matches ? parseFloat(matches[2]) : 1;
}

function contrast(color, light, dark) {
    return Color(color).luminosity() > .5 ? (dark || 'black') : (light || 'white');
}

function mix(color, subject, percent) {
    return Color(color).mix(Color(subject), percent).hex();
}

function opaque(background, foreground) {
    return mix(Color(foreground).alpha(1).hex(), background, opacity(foreground));
}

module.exports = plugin(function({ addComponents, theme }) {

    
    const component = {
        
        // Include styles from the reboot
        '.table thead, .table tbody, .table tfoot, .table tr, .table td, .table th': {
            borderColor: 'inherit',
            borderStyle: 'solid',
            borderWidth: 0
        },

        // Table styles

        '.table': {
            width: '100%',
            marginBottom: '1rem',
            color: theme('table.color'),
            verticalAlign: theme('table.verticalAlign'),
            borderColor: theme('table.borderColor'),
        },

        
        // Target th & td
        // We need the child combinator to prevent styles leaking to nested tables which doesn't have a `.table` class.
        // We use the universal selectors here to simplify the selector (else we would need 6 different selectors).
        // Another advantage is that this generates less code and makes the selector less specific making it easier to override.
        '.table> :not(caption) > * > *': {
            padding: `${theme('table.cell.paddingY')} ${theme('table.cell.paddingX')}`,
            backgroundColor: theme('table.backgroundColor'),
            backgroundImage: `linear-gradient(transparent, transparent)`,
            borderBottomWidth: theme('table.borderWidth'),
        },
        
        '.table> tbody': {
            verticalAlign: 'inherit'
        },
        
        '.table > thead': {
            verticalAlign: 'bottom'
        },
        
        // Highlight border color between thead, tbody and tfoot.
        '.table > :not(:last-child) > :last-child > *': {
            borderBottomColor: theme('table.seperator.borderColor')
        },
    
        //
        // Change placement of captions with a class
        //
        
        '.caption-top': {
            captionSide: 'top'
        },
                
        //
        // Condensed table w/ half padding
        //

        '.table-sm > :not(caption) > * > *': {
            padding: `${theme('table.sm.cell.paddingY')} ${theme('table.sm.cell.paddingX')}`
        },        
        
        // Border versions
        //
        // Add or remove borders all around the table and between all the columns.
        //
        // When borders are added on all sides of the cells, the corners can render odd when
        // these borders do not have the same color or if they are semi-transparent.
        // Therefor we add top and border bottoms to the `tr`s and left and right borders
        // to the `td`s or `th`s
        
        '.table-bordered > :not(caption) > *': {
            borderWidth: `${theme('table.borderWidth')} 0`
        },
        
        '.table-bordered > :not(caption) > * > *': {
            borderWidth: `0 ${theme('table.borderWidth')}`
        },
        
        '.table-borderless > :not(caption) > * > *': {
            borderBottomWidth: 0
        },
        
        // Zebra-striping
        //
        // Default zebra-stripe styles (alternating gray and transparent backgrounds)
        
        [`.table-striped > tbody > tr:nth-of-type(${theme('table.striped.order')})`]: {
            color: theme('table.striped.color')
        },
        
        // Active table
        //
        // The `.table-active` class can be added to highlight rows or cells
        
        '.table-active': {
            color: theme('table.active.color')
        },
        
        // Hover effect
        //
        // Placed here since it has to come after the potential zebra striping
        
        '.table-hover > tbody > tr:hover': {
            color: theme('table.hover.color')
        },
        
        '.table-responsive': {
            overflowX: 'auto',
            '-webkit-overflow-scrolling': 'touch'
        }
    };
    

    // Table variants
    //
    // Table variants set the table cell backgrounds, border colors
    // and the colors of the striped, hovered & active tables

    Object.entries(theme('variations', defaultVariations))
        .forEach(([state, background]) => {
            const color = contrast(opaque('#fff', background));

            const stripedBackgroundColor = mix(color, background, .05);
            const stripeColor = contrast(stripedBackgroundColor);

            const hoverBackgroundColor = mix(color, background, .075);
            const hoverColor = contrast(hoverBackgroundColor);

            const activeBackgroundColor = mix(color, background, .1);
            const activeColor = contrast(activeBackgroundColor);
            
            component[`.table-${state}`] = {
                color,
                borderColor: mix(color, background, .05),

                striped: {
                    color: stripeColor,
                    backgroundColor: stripedBackgroundColor
                },

                hover: {
                    color: hoverColor,
                    backgroundColor: hoverBackgroundColor
                },

                active: {
                    color: activeColor,
                    backgroundColor: activeBackgroundColor
                }
            };
        });

    addComponents(component);
}, {
    theme: {
        table: theme => ({
            color: 'inherit',
            backgroundColor: 'transparent',
            borderWidth: '1px',
            borderColor: theme('colors.gray.300', colors.gray[300]),

            cell: {
                paddingY: '.5rem',
                paddingX: '.5rem',
                verticalAlign: 'top',
            },

            striped: {
                order: 'odd',
                color: 'inherit',
                backgroundColor: `${rgba(theme('colors.black', colors.black), .05)}`,
            },

            active: {
                color: 'inherit',
                backgroundColor: `${rgba(theme('colors.black', colors.black), .1)}`,
            },

            hover: {
                color: 'inherit',
                backgroundColor: `${rgba(theme('colors.black', colors.black), .075)}`,
            },

            seperator: {
                borderColor: 'currentColor'
            },
            
            caption: {
                color: 'currentColor'
            },

            sm: {
                cell: {
                    paddingY: '.25rem',
                    paddingX: '.25rem',
                }
            }
        })
    }
});