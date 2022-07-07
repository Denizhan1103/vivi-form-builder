import { useMessages } from "@/builder/hooks/UseMessages"

export default {
    setup() {
        const messages = useMessages('builderPage.layout')

        return {
            messages
        }
    },
}