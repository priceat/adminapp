import forEach from 'lodash/collection/forEach';

/**
 * The RouterService provides some utilities for registering some
 * callback handlers in view controllers.  Typically, onEnter and
 * onExit must be setup during the state config, which doesn't
 * have access to the controller. This bypasses that limitation.
 */
export class RouterService {

    constructor ($state) {

        this.enterCBs = {};
        this.exitCBs = {};
        this.$state = $state;

    }

    /**
     * Register a callback for when the current state is entered.
     * This callback is fired both normal and sticky states. An
     * optional immediate flag can be passed to immediately fire
     * the callback upon registration.
     *
     * @param {Function} cb
     * @param {Boolean} [immediate]
     */
    onEnter (cb, immediate) {
        let name = this.$state.current.name;
        if (typeof cb !== 'function') {
            return;
        }
        if (!this.enterCBs[name]) {
            this.enterCBs[name] = [];
        }
        this.enterCBs[name].push(cb);
        if (immediate) {
            cb();
        }
    }

    /**
     * Register a callback for when the current state is exited.
     * This callback is fired both normal and sticky states.
     *
     * @param {Function} cb
     * @param {Boolean} [immediate]
     */
    onExit (cb, immediate) {
        let name = this.$state.current.name;
        if (typeof cb !== 'function') {
            return;
        }
        if (!this.exitCBs[name]) {
            this.exitCBs[name] = [];
        }
        this.exitCBs[name].push(cb);
        if (immediate) {
            cb();
        }
    }

    /**
     * Trigger all of the callbacks for entering a state.
     *
     * @param {Object} state
     * @param {Object} [params]
     */
    entered (state, params) {
        if (!state.name) {
            return;
        }
        forEach(this.enterCBs[state.name], cb => cb(params));
    }

    /**
     * Trigger all of the callbacks for exiting a state.
     *
     * @param {Object} state
     * @param {Object} [params]
     */
    exited (state, params) {
        if (!state.name) {
            return;
        }
        forEach(this.exitCBs[state.name], cb => cb(params));
    }

}

RouterService.$inject = ['$state'];
