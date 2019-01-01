import { shallowMount } from '@vue/test-utils';
import ColorPicker from '@/ColorPicker.vue';

jest.mock('@radial-color-picker/color-wheel');

import fillColorWheel from '@radial-color-picker/color-wheel';

describe('ColorPicker.vue', () => {
    it('fallbacks to canvas when `conic-gradient` CSS is not supported', () => {
        const el = shallowMount(ColorPicker);
        const isConicGradientSupported = el.vm.$refs.palette.style.backgroundImage.length > 0;
        const count = isConicGradientSupported ? 0 : 1;

        expect(fillColorWheel).toHaveBeenCalledTimes(count);
    });

    it('correctly initializes `color` based on props', () => {
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 90,
                saturation: 100,
                luminosity: 50,
                alpha: 1,
            },
        });

        expect(el.vm.color).toEqual('hsla(90, 100%, 50%, 1)');
    });
});
