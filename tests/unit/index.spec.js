import { shallowMount } from '@vue/test-utils';
import ColorPicker from '@/src/ColorPicker.vue';

// canvas support in JSDom is weak and throws an error so the dependency is mocked
import fillColorWheel from '@radial-color-picker/color-wheel';
jest.mock('@radial-color-picker/color-wheel');

describe('Init', () => {
    beforeEach(() => {
        fillColorWheel.mockClear();
    });

    it('renders correctly', () => {
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 0,
            },
        });

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

    // jsdom doesn't support layouting so `getComputedStyle(palette).backgroundImage`
    // would never include conic-gradient
    it('setups a fallback to canvas when `conic-gradient` CSS is not supported', () => {
        shallowMount(ColorPicker, {
            propsData: {
                hue: 0,
            },
        });

        expect(fillColorWheel).toHaveBeenCalled();
    });
});

describe('Core Methods', () => {
    it('emits an `input` event when updateColor is called', () => {
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 0,
            },
        });

        el.vm.updateColor(90);

        expect(el.emitted('input')[0]).toEqual([90]);
    });

    it('starts the pressed animation when selectColor is called', () => {
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 0,
            },
        });

        el.vm.selectColor();

        expect(el.vm.isPressed).toBe(true);
    });

    it('emits a `select` event when selectColor is called and the picker is opened', () => {
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

        expect(el.emitted('select')[0]).toEqual([30]);
    });

    it('shows the palette when selectColor is called and the picker is closed', () => {
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 0,
            },
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
            propsData: {
                hue: 0,
            },
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
            propsData: {
                hue: 0,
            },
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
                hue: 0,
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
            propsData: {
                hue: 0,
            },
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
            propsData: {
                hue: 0,
            },
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
            propsData: {
                hue: 0,
            },
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

    it('calls updateColor when onScroll is called and picker is not animating', () => {
        const updateColorStub = jest.fn();
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 0,
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

        expect(updateColorStub).toHaveBeenCalledWith(21);
    });

    it('increases hue by 10 when PageUp is pressed', () => {
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

        el.vm.onKeyDown({ key: 'PageUp' });

        expect(updateColorStub).toHaveBeenCalledWith(40);
    });

    it('decreases hue by 10 when PageDown is pressed', () => {
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

        el.vm.onKeyDown({ key: 'PageDown' });

        expect(updateColorStub).toHaveBeenCalledWith(20);
    });

    it('increases hue by 1 when ArrowUp or ArrowRight are pressed', () => {
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

        el.vm.onKeyDown({ key: 'ArrowUp' });
        expect(updateColorStub).toHaveBeenCalledWith(31);

        el.vm.onKeyDown({ key: 'ArrowRight' });
        expect(updateColorStub).toHaveBeenCalledWith(32);
    });

    it('decreases hue by 1 when ArrowDown or ArrowLeft are pressed', () => {
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

        el.vm.onKeyDown({ key: 'ArrowDown' });
        expect(updateColorStub).toHaveBeenCalledWith(29);

        el.vm.onKeyDown({ key: 'ArrowLeft' });
        expect(updateColorStub).toHaveBeenCalledWith(28);
    });

    it('sets the hue to 0 when Home is pressed', () => {
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

        el.vm.onKeyDown({ key: 'Home' });
        expect(updateColorStub).toHaveBeenCalledWith(0);
    });

    it('sets the hue to 359 when End is pressed', () => {
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

        el.vm.onKeyDown({ key: 'End' });
        expect(updateColorStub).toHaveBeenCalledWith(359);
    });

    it('returns early when onKeyDown is called and picker is disabled', () => {
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

        el.vm.onKeyDown({});

        expect(updateColorStub).not.toHaveBeenCalled();
    });

    it('returns early when onScroll is called and picker is animating', () => {
        const updateColorStub = jest.fn();
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 0,
            },
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

    it('updates rotator based on hue prop', async () => {
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 90,
                saturation: 100,
                luminosity: 50,
                alpha: 1,
            },
        });

        el.setProps({ hue: 60 });

        await el.vm.$nextTick();

        expect(el.vm.rcp._angle).toBe(60);
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

        el.setProps({ hue: 60 });

        expect(el.vm.hue).toBe(60);
        expect(el.vm.saturation).toBe(100);
        expect(el.vm.luminosity).toBe(50);
        expect(el.vm.alpha).toBe(1);
    });

    it('updates `isDragging` to `true` when Rotator starts the drag proccess', () => {
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 0,
            },
        });

        el.vm.rcp.onDragStart();

        expect(el.vm.isDragging).toBe(true);
    });

    it('updates `isDragging` to `false` when Rotator stops the drag proccess', () => {
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 0,
            },
        });

        el.vm.rcp.onDragStart();
        el.vm.rcp.onDragStop();

        expect(el.vm.isDragging).toBe(false);
    });
});

describe('Teardown', () => {
    it('cleans up Rotator unused object references & events', () => {
        const el = shallowMount(ColorPicker, {
            propsData: {
                hue: 0,
            },
        });

        el.destroy();

        expect(el.vm.rcp).toBe(null);
    });
});
