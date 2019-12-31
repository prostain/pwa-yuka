<template>
    <div class="products">
        <div class="products-header">
            <h1>Produits scannés récemment</h1>
        </div>
        <div v-for='(product,i) in products' :key='i' class="product">
            <div class="img-product">
                <img v-bind:src="product['photo']">
            </div>
            <div class="product-infos">
                <div class="product-name">
                    {{ product['name'] }}
                </div>
                <div class="product-brand">
                    {{ product['marque'] }}
                </div>
                <div class="product-gradeName">
                    <svg height="25" width="25" class="circle">
                        <circle cx="12.5" cy="12.5" r="12.5" />
                        Sorry, your browser does not support inline SVG.  
                    </svg> 
                    {{ getGradeTag(product) }}
                </div>
                <div class="scanned">
                    <img src="/img/time.svg"> il y a {{ product['lastTimeScanned'] | nbDays }} jours
                </div>

            </div>
            <div class="comments">
                <button @click="myFunction(i)" class="dropbtn">Commentaires </button>
                <div :id="'myDropdown'+i" class="dropdown-content">
                <div v-if="!products[i]['comments']"  class='comment'>
                    <p>Oh non, pas encore de commentaires 😢</p>
                </div>
                <div v-else>
                    <div v-for="(comment,index) in products[i]['comments']" :key='index' class='comment'>
                        <p>{{comment['date']}} | {{comment['author']}}</p>
                        <p>{{comment['content']}}</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default{

    data: function(){
        return{
            products: [
                {name: "Lipton Ice Tea", photo: "/img/lipton_icetea.jpg", marque: "Lipton", grade: 12, lastTimeScanned: "12/23/2019", comments:[{date: '12/19/2019', author: "admin", content: 'premier test'},{date: '12/20/2019', author: "peterson", content: 'Meilleur que le Coca'}]},
                {name: "Torti tomates épinards", photo: "/img/pates.png", marque: "Panzani", grade: 95, lastTimeScanned: "12/21/2019"},
                {name: "Beurre bio St Hubert ", photo: "/img/beurre.png", marque: "St hubert", grade: 36, lastTimeScanned: "12/25/2019"},
                {name: "Pain de mie complet", photo: "/img/pain_mie.png", marque: "Jacquet", grade: 75, lastTimeScanned: "12/17/2019"}
            ]
        }
    },
    
    mounted(){
        // Lorsque "tout est chargé" on change la couleur de tous les cercles
        this.changeCircleColor(this.products);
    },

    methods: {


        // Fonction qui affiche ou cache les commentaires
        myFunction: function (indice) {
            let x = document.getElementById("myDropdown"+indice);
            if (x.style.display === "block") {
                x.style.display = "none";
            } else {
                x.style.display = "block";
            }
        },

        // Fonction qui change la couleur du cercle en fonction du rang du produit
        changeCircleColor: function(products){
            for(let i = 0; i < products.length; i++){
                // utilisation du setTimeout car sinon le dom n'était pas complètement chargé et donc n'arrivait pas à récupérer les éléments circle
                setTimeout(function(){
                    if(products[i].grade < 30){
                        document.getElementsByTagName('circle')[i].style.fill = "red";
                    }
                    if(products[i].grade < 60 && products[i].grade >= 30){
                        document.getElementsByTagName('circle')[i].style.fill = "orange";
                    }
                    if(products[i].grade < 80 && products[i].grade > 60){
                        document.getElementsByTagName('circle')[i].style.fill = "yellowgreen";
                    }
                    if(products[i].grade >= 80){
                        document.getElementsByTagName('circle')[i].style.fill = "green";
                    }
                }, 0);
            }
        },

        // Fonction qui renvoie un libellé selon le rang du produit
        getGradeTag: function(product){
            if(product.grade < 30){
                return "Mauvais";
            }
            if(product.grade < 60 && product.grade >= 30){
                return "Passable";
            }
            if(product.grade < 80 && product.grade > 60){
                return "Bon";
            }
            if(product.grade >= 80){
                return "Excellent";
            }
        }
    },

    // Filtre qui permet de récupérer le nombre de jours entre la date à laquelle le produit a été scanné et aujourd'hui
    filters: {
        nbDays: function (value) {
            if(!value){
                return '';
            }
            let today = new Date();
            let dateScanned = new Date(value);
            let diffTime = Math.abs(today - dateScanned);
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            return diffDays;
        },

    }
}


</script>

<style>
.products-header{
    background-color:#6ed851;
    height:70px;
    display:flex;
    justify-content:center;
}

.products-header h1{
    font-size:22px;
    align-self:center;
    font-family:sans-serif;
    font-weight:normal;
}

.product{
    display:flex;
    padding:15px;
    border-bottom: 1px solid grey;
    width:90%;
    align-self:center;
}

.img-product{
    width:100px;
    margin-right:10px;
    align-self:center;
}

.img-product img{
    width:100%;
}

.product-name{
    font-weight:500;
    font-size:18px;
}

.product-brand{
    font-size:15px;
    color:grey;
}

.product-gradeName{
    margin-top:13px;
    display: flex;
    align-items: center;
}

.circle{
    margin-right:10px;
}

.scanned{
    margin-top:13px;
    display:flex;
}

.scanned img{
    width:18px;
    margin-right:17px;
    margin-left:3px;
}
.comments{
    display: block;
width: 100%;
}
.dropbtn {
  background-color: #3498DB;
  color: white;
  padding: 16px;
  font-size: 16px;
  width: 100%;
  border: none;
  cursor: pointer;
  display: block
}

.dropbtn:hover, .dropbtn:focus {
  background-color: #2980B9;
}


.dropdown-content {
  display: none;
  background-color: #f1f1f1;
  width: 90%;
  margin: 0 auto;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown a:hover {background-color: #ddd;}
.comment{
    display: block;
    padding: 1em;
}
@media screen and (max-width: 768px){
    .product{
        flex-direction: column;
    }

    .product-infos > div {
        justify-content: center;
        text-align: center;
    }
    .comments {
        margin-top: 20px;
    }
}
</style>