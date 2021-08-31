import RESTV2 from '@Handlers/restClient';

export default class CountryManager {
    private ENDPOINT: string = 'country';
    private FILTERS: string = '';

    async getCountry(params: object= {}) {
        this.prepare_filters(params);
        const res = await RESTV2.get(this.ENDPOINT + this.FILTERS);
        const json = await res.json();
        return json.data();
    }

    prepare_filters(params: Object) {
        if (params) {
            let filters = '?';
            for (const [key, value] of Object.entries(params)) {
                filters += `${key}=${value}&`;
            }
            this.FILTERS = filters.slice(0, filters.length - 1);
        }
    }
}