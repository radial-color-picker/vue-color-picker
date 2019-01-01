import { shallowMount } from '@vue/test-utils';
import ColorPicker from '@/ColorPicker.vue';

import fillColorWheel from '@radial-color-picker/color-wheel';
import Rotator from '@radial-color-picker/rotator';

jest.mock('@radial-color-picker/color-wheel');
jest.mock('@radial-color-picker/rotator');

describe('Init', () => {
    beforeEach(() => {
        fillColorWheel.mockClear();
        Rotator.mockClear();
    });

    it('setups an optional event for updating the hue by scrolling', () => {
        const onScrollStub = jest.fn();
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 30,
                saturation: 100,
                luminosity: 50,
                alpha: 1,
                mouseScroll: true
            },
            methods: {
                onScroll: onScrollStub
            }
        });

        el.find('.rcp__rotator').trigger('wheel');

        expect(onScrollStub).toHaveBeenCalled();
    });

    it('setups a fallback to canvas when `conic-gradient` CSS is not supported', () => {
        const el = shallowMount(ColorPicker);
        const isConicGradientSupported = el.vm.$refs.palette.style.backgroundImage.length > 0;
        const count = isConicGradientSupported ? 0 : 1;

        expect(fillColorWheel).toHaveBeenCalledTimes(count);
    });

    it('setups the Rotator module', () => {
        const el = shallowMount(ColorPicker);
        expect(Rotator).toHaveBeenCalled();
    });
});

describe('Reactive Changes', () => {
    it('updates `color` based on props', () => {
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 90,
                saturation: 100,
                luminosity: 50,
                alpha: 1,
            },
        });

        expect(el.vm.color).toBe('hsla(90, 100%, 50%, 1)');
    });

    it('updates rotator based on hue prop', () => {
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 90,
                saturation: 100,
                luminosity: 50,
                alpha: 1,
            },
        });

        el.setProps({ hue: 60 });

        expect(el.vm.rcp.angle).toBe(60);
    });

    it('doesn\'t mutate the saturation, luminosity or alpha props when hue changes', () => {
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 90,
                saturation: 100,
                luminosity: 50,
                alpha: 1,
            },
        });

        el.setProps({ hue: 60 });

        expect(el.vm.hue).toBe(60);
        expect(el.vm.saturation).toBe(100);
        expect(el.vm.luminosity).toBe(50);
        expect(el.vm.alpha).toBe(1);
    });
});

describe('Teardown', () => {
    it('cleans up Rotator unused object references & events', () => {
        const el = shallowMount(ColorPicker);

        el.destroy();

        expect(el.vm.rcp).toBe(null);
    });
});
