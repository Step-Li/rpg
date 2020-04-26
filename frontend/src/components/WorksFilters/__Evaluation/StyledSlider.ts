import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

export const StyledSlider = withStyles({
    root: {
        height: 4,
    },
    thumb: {
        height: 16,
        width: 16,
        backgroundColor: '#fff',
        border: '2px solid',
        marginTop: -6,
        marginLeft: -8,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    valueLabel: {
        left: 'calc(-50% - 4px)',
    },
    track: {
        height: 4,
        borderRadius: 2,
    },
    rail: {
        height: 4,
        borderRadius: 2,
    },
})(Slider);