const bikesStore = {
    data: {
        bikes: [
            {'Model':'Activa 3G'},{'Model':'Tvs Aprilla'},{'Model':'Mastero'},{'Model':'Jupiter'},
             {'Model':'CT 100'},{'Model':'Pulsar'},{'Model':'Hero'},{'Model':'KTM'},{'Model':'Suzuki Access'}
                ],
        sold: [{'Model':'Activa 3G'}],

        commuters:[{'Model':'Activa 3G'},{'Model':'Tvs Aprilla'},{'Model':'Mastero'},{'Model':'Jupiter'},{'Model':'Suzuki Access'}],
        gears:[{'Model':'CT 100'},{'Model':'Pulsar'},{'Model':'Hero'}],
        adventure:[{'Model':'KTM'}]
    },
    methods:{
        
    },
    computed:{
        getAccount: () => {
            return this.$http.get('http://localhost:8080/api/faq').then((response) => {
                return response.data;
            });
        }
    }
}
export default bikesStore;