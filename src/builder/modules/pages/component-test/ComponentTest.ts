import Input from "../../components/input/Input.vue"

export default {
    components: {
        Input,
    },
    setup() {
        const inputTestData = [
            {
                type: 'Text',
                properties: { header: 'Aloo', placeholder: 'Aloo...', startingText: 'xD', size: 'Full' },
                style: {
                    input: {
                        backgroundColor: 'red',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 600,
                        height: '70px'
                    },
                    header: {
                        color: 'blue'
                    },
                    validation: {

                    }
                },
                validation: {
                    enable: false
                }
            },
            {
                type: 'Number',
                properties: { header: 'Aloo', placeholder: 'Aloo...', startingText: '', size: 'Half' },
                style: {
                    input: {
                        backgroundColor: 'red',
                        color: 'white',
                        fontSize: 12,
                        fontWeight: 600,
                        height: 70
                    },
                    header: {
                        color: 'blue'
                    },
                    validation: {
                        color: 'green'
                    }
                },
                validation: {
                    enable: true
                }
            },

        ]

        return {
            inputTestData
        }
    },
}