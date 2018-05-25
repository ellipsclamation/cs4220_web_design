Vue.filter('highlight', function(value){
    let esc = chuck.search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
    let reg = new RegExp('('+esc+')', 'ig')
    return value.replace(reg, '<mark>$1</mark>')
})

let chuck = new Vue({
    el: '#chuck',

    data: {
        appName: 'Chuck Facts',
        selected: 'Any',
        categories: ['Any'],
        search: '',
        searchResults: '',
        searchHistory: [],
        currentFact: '',
        previousFacts: [],
        isViewingFact: false,
        isFetchingAFact: false
    },

    methods: {
        getCategories: function(){
            let viewModel = this

            axios.get('https://api.chucknorris.io/jokes/categories', {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then(function(response){
                viewModel.categories = viewModel.categories.concat(response.data)
            })
            .catch(function(err){
                alert(err)
            })
        },

        getSearch: function(){
            this.isViewingFact = false

            let viewModel = this

            if(viewModel.search != ''){
                axios.get('https://api.chucknorris.io/jokes/search?query=' + viewModel.search, {
                    headers: {
                        Accept: 'application/json'
                    }
                })
                .then(function(response){
                    if(viewModel.search){
                        viewModel.searchHistory.push(viewModel.search)
                    }
    
                    viewModel.searchResults = response.data.result
                })
                .catch(function(err){
                    alert(err)
                })
            }
        },

        getFact: function(){
            this.isFetchingAFact = true
            this.isViewingFact = true

            let viewModel = this

            let URL = 'https://api.chucknorris.io/jokes/random'

            if(viewModel.selected != 'Any'){
                URL = URL + '?category=' + viewModel.selected
            }

            axios.get(URL, {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then(function(response){
                viewModel.isFetchingAFact = false

                if(viewModel.currentFact){
                    viewModel.previousFacts.push(viewModel.currentFact)
                }

                viewModel.currentFact = response.data.value
            })
            .catch(function(err){
                alert(err)
            })
        }
    }
})

chuck.getCategories()