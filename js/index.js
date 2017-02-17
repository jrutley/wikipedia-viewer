
Vue.component('todo-item', {
  props: ['article'],
  template: '<a :href="article.pageid" target="_blank"><div class="well">\
      <div>\
        <h5>{{article.title}}</h5>\
      </div>\
      <div>{{article.extract}}</div>\
    </div></a>'
})

var wikipediaApp = new Vue({
  el: '#wikiApp',
  data: {
    searchTerm: "",
    // Populate the items array from the result of the Wikipedia search
    items: []
  },
  methods: {
    searchWikipedia: function(term){
      var self = this;
      $.ajax( {
    url: "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages%7Cextracts&generator=search&exsentences=3&exlimit=10&exintro=1&explaintext=1&exsectionformat=plain&gsrsearch="+this.searchTerm,
    dataType: 'json',
    type: 'POST',
    headers: { 'Api-User-Agent': 'FreeCodeCampAjaxViewer/1.0' },
    success: function(result) {
      let items = []
      let pages = result.query.pages
      for (page in pages) {
        items.push(pages[page]);
      }
      self.items = items.map(function(i){return {
        title: i.title, extract: i.extract, pageid: "https://en.wikipedia.org/?curid="+i.pageid}});
      }
    }); 
      this.searchTerm = "";
  }}
});