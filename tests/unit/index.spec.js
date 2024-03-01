import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ColorPicker from '@/ColorPicker.vue';

describe('Init', () => {
    it('renders correctly', () => {
        const wrapper = mount(ColorPicker, {
            props: {
                hue: 0,
            },
        });

        expect(wrapper.element).toMatchSnapshot();
    });

    it('setups an optional event for updating the hue by scrolling', async () => {
        const wrapper = mount(ColorPicker, {
            props: {
                hue: 30,
                saturation: 100,
                luminosity: 50,
                alpha: 1,
                mouseScroll: true,
            },
        });

        await wrapper.get('.rcp__rotator').trigger('wheel', { deltaY: 120 });

        expect(wrapper.emitted('input')[0]).toEqual([31]);
    });
});

describe('Core Methods', () => {
    it('closes the picker when the color well is clicked', async () => {
        const wrapper = mount(ColorPicker, {
            props: {
                hue: 30,
            },
        });

        const well = wrapper.get('.rcp__well');

        await well.trigger('click');

        expect(well.classes()).toContain('pressed');
        expect(wrapper.emitted('select')[0]).toEqual([30]);
    });

    it('closes the picker when the picker receives an Enter keyboard event', async () => {
        const wrapper = mount(ColorPicker, {
            props: {
                hue: 30,
            },
        });

        const well = wrapper.get('.rcp__well');

        await well.trigger('keyup', { key: 'Enter' });

        expect(well.classes()).toContain('pressed');
        expect(wrapper.emitted('select')[0]).toEqual([30]);
    });

    it('opens the picker when the color well is clicked', async () => {
        const wrapper = mount(ColorPicker, {
            props: {
                hue: 0,
                initiallyCollapsed: true,
            },
        });

        const well = wrapper.get('.rcp__well');

        await well.trigger('click');
        await well.trigger('click');

        expect(wrapper.get('[role="slider"]').attributes('aria-expanded')).toBe('true');
    });

    it('triggers the knob out animation when the ripple animation ends', async () => {
        const wrapper = mount(ColorPicker, {
            props: {
                hue: 0,
            },
        });

        const well = wrapper.get('.rcp__well');
        await well.trigger('animationend');

        expect(wrapper.get('.rcp__knob').classes()).toContain('out');
    });

    it('triggers the knob in animation when the ripple animation ends', async () => {
        const wrapper = mount(ColorPicker, {
            props: {
                hue: 0,
            },
        });

        const well = wrapper.get('.rcp__well');
        await well.trigger('animationend');
        await well.trigger('animationend');

        expect(wrapper.get('.rcp__knob').classes()).toContain('in');
    });

    it('keeps the picker opened when togglePicker is called and the picker is of variant persistent', async () => {
        const wrapper = mount(ColorPicker, {
            props: {
                hue: 0,
                variant: 'persistent',
            },
        });

        await wrapper.get('.rcp__well').trigger('animationend');

        expect(wrapper.get('.rcp__knob').classes()).toContain('in');
    });

    it('prevents the palette from hiding when hidePalette is called and knob is not hidden yet', async () => {
        const wrapper = mount(ColorPicker, {
            props: {
                hue: 0,
            },
        });

        await wrapper.get('.rcp__knob').trigger('transitionend');

        expect(wrapper.get('[role="slider"]').attributes('aria-expanded')).toBe('true');
    });

    it('changes the hue when you scroll and the picker is not animating', async () => {
        const wrapper = mount(ColorPicker, {
            props: {
                hue: 20,
                mouseScroll: true,
            },
        });

        await wrapper.get('.rcp__rotator').trigger('wheel', { deltaY: 120 });
        await wrapper.get('.rcp__rotator').trigger('wheel', { deltaY: -120 });

        expect(wrapper.emitted('input')[0]).toEqual([21]);
        expect(wrapper.emitted('change')[0]).toEqual([21]);

        expect(wrapper.emitted('input')[1]).toEqual([20]);
        expect(wrapper.emitted('change')[1]).toEqual([20]);
    });

    it('changes the hue by 10 when PageUp/PageDown is pressed', async () => {
        const wrapper = mount(ColorPicker, {
            props: {
                hue: 30,
            },
        });

        const rcp = wrapper.get('[role="slider"]');

        await rcp.trigger('keydown', { key: 'PageUp' });

        expect(wrapper.emitted('input')[0]).toEqual([40]);
        expect(wrapper.emitted('change')[0]).toEqual([40]);
        expect(rcp.attributes('aria-valuenow')).toBe('40');

        await rcp.trigger('keydown', { key: 'PageDown' });

        expect(wrapper.emitted('input')[1]).toEqual([30]);
        expect(wrapper.emitted('change')[1]).toEqual([30]);
        expect(rcp.attributes('aria-valuenow')).toBe('30');
    });

    it('changes the hue by 1 when Arrow keys are pressed', async () => {
        const wrapper = mount(ColorPicker, {
            props: {
                hue: 30,
            },
        });

        const rcp = wrapper.get('[role="slider"]');

        await rcp.trigger('keydown', { key: 'ArrowUp' });

        expect(wrapper.emitted('input')[0]).toEqual([31]);
        expect(wrapper.emitted('change')[0]).toEqual([31]);
        expect(rcp.attributes('aria-valuenow')).toBe('31');

        await rcp.trigger('keydown', { key: 'ArrowRight' });

        expect(wrapper.emitted('input')[1]).toEqual([32]);
        expect(wrapper.emitted('change')[1]).toEqual([32]);
        expect(rcp.attributes('aria-valuenow')).toBe('32');

        await rcp.trigger('keydown', { key: 'ArrowDown' });

        expect(wrapper.emitted('input')[2]).toEqual([31]);
        expect(wrapper.emitted('change')[2]).toEqual([31]);
        expect(rcp.attributes('aria-valuenow')).toBe('31');

        await rcp.trigger('keydown', { key: 'ArrowLeft' });

        expect(wrapper.emitted('input')[3]).toEqual([30]);
        expect(wrapper.emitted('change')[3]).toEqual([30]);
        expect(rcp.attributes('aria-valuenow')).toBe('30');
    });

    it('sets the hue to 0 when Home is pressed', async () => {
        const wrapper = mount(ColorPicker, {
            props: {
                hue: 30,
            },
        });

        await wrapper.get('[role="slider"]').trigger('keydown', { key: 'Home' });

        expect(wrapper.emitted('input')[0]).toEqual([0]);
        expect(wrapper.emitted('change')[0]).toEqual([0]);
    });

    it('sets the hue to 359 when End is pressed', async () => {
        const wrapper = mount(ColorPicker, {
            props: {
                hue: 30,
            },
        });

        await wrapper.get('[role="slider"]').trigger('keydown', { key: 'End' });

        expect(wrapper.emitted('input')[0]).toEqual([359]);
        expect(wrapper.emitted('change')[0]).toEqual([359]);
    });

    it("doesn't change the hue on keyboard events when the picker is disabled", async () => {
        const wrapper = mount(ColorPicker, {
            props: {
                hue: 30,
                disabled: true,
            },
        });

        await wrapper.get('[role="slider"]').trigger('keydown', { key: 'PageUp' });

        expect(wrapper.emitted('input')).toBeUndefined();
    });
});

describe('Reactive Changes', () => {
    it('updates rotator based on hue prop', async () => {
        const wrapper = mount(ColorPicker, {
            props: {
                hue: 90,
                saturation: 100,
                luminosity: 50,
                alpha: 1,
            },
        });

        await wrapper.setProps({ hue: 60 });

        expect(wrapper.get('[role="slider"]').attributes('aria-valuenow')).toBe('60');
    });

    it("doesn't update the hue if it is currently pressed", async () => {
        const wrapper = mount(ColorPicker, {
            props: {
                hue: 90,
                mouseScroll: true,
            },
        });

        const well = wrapper.get('.rcp__well');

        await well.trigger('click');
        await wrapper.get('.rcp__well').trigger('animationend');
        await wrapper.get('.rcp__knob').trigger('transitionend');

        await wrapper.get('.rcp__rotator').trigger('wheel', { deltaY: 120 });

        expect(wrapper.vm.angle).toBe(90);
        expect(wrapper.emitted('input')).toBeUndefined();
    });

    it('hides the palette after the knob is hidden', async () => {
        const wrapper = mount(ColorPicker, {
            props: {
                hue: 90,
            },
        });

        await wrapper.get('.rcp__well').trigger('animationend');
        await wrapper.get('.rcp__knob').trigger('transitionend');

        expect(wrapper.get('[role="slider"]').attributes('aria-expanded')).toBe('false');
    });
});

describe('Teardown', () => {
    it('cleans up Rotator unused object references & events', () => {
        const wrapper = mount(ColorPicker, {
            props: {
                hue: 0,
            },
        });

        wrapper.unmount();

        expect(wrapper.vm.rcp).toBe(null);
    });
});
