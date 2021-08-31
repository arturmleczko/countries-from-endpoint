<script>
    import { afterUpdate, createEventDispatcher, onMount } from 'svelte';
    import Select from '@Components/Select/Select.svelte';
    // import CountryManager from '@Models/Country';
    import CountryManager from './Country';

    export let inputName;
    export let node;
    export let value;

    const dispatch = createEventDispatcher();
    const countryManager = new CountryManager();

    let countries = [];
    let countriesArray = [];
    let selectedCountry = {};

    function setCountryObject(code) {
        return countriesArray.find(country => country.id.toLowerCase() === code.toLowerCase());
    }

    afterUpdate(() => {
        selectedCountry = value ? setCountryObject(value) : setCountryObject(process.env.DEFAULT_LANG_SLUG);
    })

    onMount(async () => {
        const langId = process.env.DEFAULT_LANG;
        countries = await countryManager.getCountry(langId);

        countriesArray = countries.map(country => {
            let countryNewItem = {};

            countryNewItem.name = country.name;
            countryNewItem.id = country.code_alpha_2;

            return countryNewItem;
        })
    })

    function selectCallback(e) {
        dispatch('setCountry', e.id);
        return {
            data: e,
            success: true
        }
    }
</script>

{#if countriesArray}
    <Select
        bind:node={node}
        options={countriesArray}
        name={inputName}
        label={selectedCountry.name}
        value={selectedCountry.id}
        {selectCallback}
    />
{/if}


