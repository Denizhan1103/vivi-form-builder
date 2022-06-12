const eventBus = {

    on: (key: string, cb: any) => {
        window.addEventListener(key, (e: any) => cb(e.detail))
    },

    remove: (key: string, cb: any) => {
        window.removeEventListener(key, cb)
    },

    dispatch: (key: string, data: any) => {
        window.dispatchEvent(new CustomEvent(key, { detail: data }))
    }

}

export default eventBus