import {shallowMount} from '@vue/test-utils';
import ColorPicker from '@/src/ColorPicker.vue';
// canvas support in JSDom is weak and throws an error so the dependency is mocked
import fillColorWheel from '@radial-color-picker/color-wheel';

jest.mock('@radial-color-picker/color-wheel');

describe('Init', () => {
    beforeEach(() => {
        fillColorWheel.mockClear();
    });

    it('renders correctly', () => {
        const el = shallowMount(ColorPicker);

        expect(el.element).toMatchSnapshot();
    });

    it('setups an optional event for updating the hue by scrolling', () => {
        const onScrollStub = jest.fn();
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 30,
                saturation: 100,
                luminosity: 50,
                alpha: 1,
                mouseScroll: true,
            },
            methods: {
                onScroll: onScrollStub,
            },
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
});

describe('Core Methods', () => {
    it('emits an `input` event when updateColor is called', () => {
        const el = shallowMount(ColorPicker);

        el.vm.updateColor(90);

        expect(el.emitted('input')[0]).toEqual([90]);
    });

    it('starts the pressed animation when selectColor is called', () => {
        const el = shallowMount(ColorPicker);

        el.vm.selectColor();

        expect(el.vm.isPressed).toBe(true);
    });

    it('emits a `change` event when selectColor is called and the picker is opened', () => {
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 30,
            },
            data() {
                return {
                    isPaletteIn: true,
                    isKnobIn: true,
                };
            },
        });

        el.vm.selectColor();

        expect(el.emitted('change')[0]).toEqual([30]);
    });

    it('has conflicting properties if collapsed is set to true and variant is set to persistent', () => {
        const el = shallowMount(ColorPicker, {
            propsData: {
                initiallyCollapsed: true,
                variant: 'persistent'
            }
        });

        expect(el.vm.hasConflictingProperties()).toEqual(true);
    });

    it('has no conlicts if collapsed is set to true and variant is set to collapsible', () => {
        const el = shallowMount(ColorPicker, {
            propsData: {
                initiallyCollapsed: true,
                variant: 'collapsible'
            }
        });

        expect(el.vm.hasConflictingProperties()).toEqual(false);
    });

    it('shows the palette when selectColor is called and the picker is closed', () => {
        const el = shallowMount(ColorPicker, {
            data() {
                return {
                    isPaletteIn: false,
                    isKnobIn: false,
                };
            },
        });

        el.vm.selectColor();

        expect(el.vm.isPaletteIn).toBe(true);
    });

    it('closes the picker when togglePicker is called and the picker is opened', () => {
        const el = shallowMount(ColorPicker, {
            data() {
                return {
                    isKnobIn: true,
                };
            },
        });

        el.vm.togglePicker();

        expect(el.vm.isKnobIn).toBe(false);
    });

    it('opens the picker when togglePicker is called and the picker is closed', () => {
        const el = shallowMount(ColorPicker, {
            data() {
                return {
                    isKnobIn: false,
                    isPaletteIn: false,
                };
            },
        });

        el.vm.togglePicker();

        expect(el.vm.isKnobIn).toBe(true);
        expect(el.vm.isPaletteIn).toBe(true);
    });

    it('keeps the picker opened when togglePicker is called and the picker is of variant persistent', () => {
        const el = shallowMount(ColorPicker, {
            propsData: {
                variant: 'persistent',
            },
            data() {
                return {
                    isKnobIn: true,
                };
            },
        });

        el.vm.togglePicker();

        expect(el.vm.isKnobIn).toBe(true);
    });

    it('stops the press animation & ripple when togglePicker is called', () => {
        const el = shallowMount(ColorPicker, {
            data() {
                return {
                    isRippling: true,
                    isPressed: true,
                };
            },
        });

        el.vm.togglePicker();

        expect(el.vm.isRippling).toBe(false);
        expect(el.vm.isPressed).toBe(false);
    });

    it('hides the palette when hidePalette is called and knob is already hidden', () => {
        const el = shallowMount(ColorPicker, {
            data() {
                return {
                    isKnobIn: false,
                    isPaletteIn: true,
                };
            },
        });

        el.vm.hidePalette();

        expect(el.vm.isPaletteIn).toBe(false);
    });

    it('prevents the palette from hiding when hidePalette is called and knob is not hidden yet', () => {
        const el = shallowMount(ColorPicker, {
            data() {
                return {
                    isKnobIn: true,
                    isPaletteIn: true,
                };
            },
        });

        el.vm.hidePalette();

        expect(el.vm.isPaletteIn).toBe(true);
    });

    it('moves the knob when rotateToMouse is called', () => {
        const setAngleFromEventStub = jest.fn();
        const el = shallowMount(ColorPicker);
        el.vm.rcp.setAngleFromEvent = setAngleFromEventStub;

        el.vm.rotateToMouse();

        expect(setAngleFromEventStub).toHaveBeenCalled();
    });

    it('prevents changes when rotateToMouse is called and picker is animating', () => {
        const setAngleFromEventStub = jest.fn();
        const el = shallowMount(ColorPicker, {
            data() {
                return {
                    isPressed: true,
                };
            },
        });
        el.vm.rcp.setAngleFromEvent = setAngleFromEventStub;

        el.vm.rotateToMouse();

        expect(setAngleFromEventStub).not.toHaveBeenCalled();
    });

    it('calls updateColor when onScroll is called and picker is not animating', () => {
        const updateColorStub = jest.fn();
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 30,
            },
            data() {
                return {
                    isPressed: false,
                    isKnobIn: true,
                };
            },
            methods: {
                updateColor: updateColorStub,
            },
        });

        el.vm.onScroll({
            preventDefault: jest.fn(),
            deltaY: 120,
        });

        expect(updateColorStub).toHaveBeenCalled();
    });

    it('decreases the hue when onScroll is called with an up direction and picker is not animating', () => {
        const updateColorStub = jest.fn();
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 22,
            },
            data() {
                return {
                    isPressed: false,
                    isKnobIn: true,
                };
            },
            methods: {
                updateColor: updateColorStub,
            },
        });

        el.vm.rcp.angle = 22;

        el.vm.onScroll({
            preventDefault: jest.fn(),
            deltaY: -120,
        });

        expect(updateColorStub).toHaveBeenCalledWith(20);
    });

    it('increases hue by 12 when rotate is called with an up direction and ctrlKey is pressed', () => {
        const updateColorStub = jest.fn();
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 30,
                disabled: false,
            },
            data() {
                return {
                    isPressed: false,
                    isKnobIn: true,
                };
            },
            methods: {
                updateColor: updateColorStub,
            },
        });

        el.vm.rcp.angle = 30;

        el.vm.rotate(
            {
                deltaY: -120,
                ctrlKey: true,
            },
            true
        );

        expect(updateColorStub).toHaveBeenCalledWith(42);
    });

    it('decreases hue by 12 when rotate is called with an up direction and ctrlKey is pressed', () => {
        const updateColorStub = jest.fn();
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 30,
                disabled: false,
            },
            data() {
                return {
                    isPressed: false,
                    isKnobIn: true,
                };
            },
            methods: {
                updateColor: updateColorStub,
            },
        });

        el.vm.rcp.angle = 30;

        el.vm.rotate(
            {
                deltaY: -120,
                ctrlKey: true,
            },
            false
        );

        expect(updateColorStub).toHaveBeenCalledWith(18);
    });

    it('increases hue by 6 when rotate is called with an up direction and shiftKey is pressed', () => {
        const updateColorStub = jest.fn();
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 30,
                disabled: false,
            },
            data() {
                return {
                    isPressed: false,
                    isKnobIn: true,
                };
            },
            methods: {
                updateColor: updateColorStub,
            },
        });

        el.vm.rcp.angle = 30;

        el.vm.rotate(
            {
                deltaY: -120,
                shiftKey: true,
            },
            true
        );

        expect(updateColorStub).toHaveBeenCalledWith(36);
    });

    it('increases hue by 2 when rotate is called with an up direction', () => {
        const updateColorStub = jest.fn();
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 30,
                disabled: false,
            },
            data() {
                return {
                    isPressed: false,
                    isKnobIn: true,
                };
            },
            methods: {
                updateColor: updateColorStub,
            },
        });

        el.vm.rcp.angle = 30;

        el.vm.rotate(
            {
                deltaY: -120,
            },
            true
        );

        expect(updateColorStub).toHaveBeenCalledWith(32);
    });

    it('returns early when rotate is called and picker is disabled', () => {
        const updateColorStub = jest.fn();
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 30,
                disabled: true,
            },
            data() {
                return {
                    isPressed: false,
                    isKnobIn: true,
                };
            },
            methods: {
                updateColor: updateColorStub,
            },
        });

        el.vm.rotate();

        expect(updateColorStub).not.toHaveBeenCalled();
    });

    it('returns early when onScroll is called and picker is animating', () => {
        const updateColorStub = jest.fn();
        const el = shallowMount(ColorPicker, {
            data() {
                return {
                    isPressed: true,
                    isKnobIn: false,
                };
            },
            methods: {
                updateColor: updateColorStub,
            },
        });

        el.vm.onScroll();

        expect(updateColorStub).not.toHaveBeenCalled();
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

        el.setProps({hue: 60});

        expect(el.vm.rcp.angle).toBe(60);
    });

    it("doesn't mutate the saturation, luminosity or alpha props when hue changes", () => {
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 90,
                saturation: 100,
                luminosity: 50,
                alpha: 1,
            },
        });

        el.setProps({hue: 60});

        expect(el.vm.hue).toBe(60);
        expect(el.vm.saturation).toBe(100);
        expect(el.vm.luminosity).toBe(50);
        expect(el.vm.alpha).toBe(1);
    });

    it('updates `isDragging` to `true` when Rotator starts the drag proccess', () => {
        const el = shallowMount(ColorPicker);

        el.vm.rcp.onDragStart();

        expect(el.vm.isDragging).toBe(true);
    });

    it('updates `isDragging` to `false` when Rotator stops the drag proccess', () => {
        const el = shallowMount(ColorPicker);

        el.vm.rcp.onDragStart();
        el.vm.rcp.onDragStop();

        expect(el.vm.isDragging).toBe(false);
    });
});

describe('Teardown', () => {
    it('cleans up Rotator unused object references & events', () => {
        const el = shallowMount(ColorPicker);

        el.destroy();

        expect(el.vm.rcp).toBe(null);
    });
});
