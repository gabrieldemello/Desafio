
var app = new Vue({
  el: '#aplication',
  data: {
    lista_de_produtos: [],
    carrinho:[],
    carregando:true

  },
  components: {
  	'carousel': VueCarousel.Carousel,
    'slide': VueCarousel.Slide
  },
  created:function(){
  
  	this.getProdutos();
  		
  },
  filters: {
	  valorpor: function (value) {
	    if (!value) return ''
	    value = value.replace("ou","ou <b>");
	    value = value.replace("sem juros","</b>sem juros.");
	    return value;
	  }
  },
  methods:{
  
  	getProdutos:function(){

  		$.ajax({
		  type: "GET",
		  async: false,
		  url: 'js/products.json',
		  success: function(o){
		  	
		  	console.log('dd::::',o);
			this.produtos = o;
			this.lista_de_produtos = o[0].data.recommendation;

			setTimeout(function(){

				this.carregando = false;
			}.bind(this),2000)
		  }.bind(this),
		  error:function(e){
			this.carregando = false;
		  	//erro
		  },
		  dataType: 'json'
		});
  	},
  	adicionarCarrinho:function(produto){
  		this.carrinho.push(produto);
  	}

  }
})