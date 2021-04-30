$( document ).ready(function() {

function addElement(tabElements,baliseParent) {
  //console.log(tabElements);
  // Balise qui va recevoir la liste des médicaments
  const listeMedicaments = document.getElementById(baliseParent) ;
  const suggestions = document.getElementById("suggestions") ;

  for (let index in  tabElements) {
    let element = tabElements[index] ;

    let titre = element.titre ;
    let id    = element.id ;
    
    
    //crée un nouvel élément div
      let card     = document.createElement("div");
      let titreH5  = document.createElement("h5");
      let li       = document.createElement("li");
      let a        = document.createElement("a");

    //  Attribution des attributs
      card.classList.add("card");
      card.setAttribute("id", id);
      card.style.display="none"; // On cache la div Card

      li.style.display="none";
      a.setAttribute("href", "#"+id);
      a.classList.add("lienCard");

    // on donne un peu de contenu
      let texteLien  = document.createTextNode(titre);
      let texte  = document.createTextNode(titre);
    
    // ajoute le nœud texte au nouveau div créé
      a.appendChild(texte);
      li.appendChild(a);
      suggestions.appendChild(li);

      titreH5.appendChild(texteLien);
      card.appendChild(titreH5);
      listeMedicaments.appendChild(card);
  }
    
}// Fin de la fonction


function create_objet_medicament(tabElementsMedicament){// Mon constructeur d'élément
  let tabModelsMedicament = [];
  //console.log(tabElementsMedicament)
  tabElementsMedicament.map( element => { // Pour chaque élément de mon tableau j'applique la fonction Map()
    let model = { // On crée un objet model, avec les attributs qui nous intéresse
      id:  element.id,
      titre: element.title,
      name:  element.authorization_holder,
      presentations: tabPresentations(element.presentations),
      compositions: [],
    }
    tabModelsMedicament.push(model); // On rajoute un objet model dans le tableau tabModelMedicament
  })
  return tabModelsMedicament; // On retourne un tableau d'objet avec moins de données
}// fin function create_objet_medicament

function tabPresentations(tabElements){
  let tabPresentationsModel = [];
  if(tabElements != null) {
    tabElements.map( element => {
      tabPresentationsModel.push(element.title);
    })
  } 
  return tabPresentationsModel;
}// fin function tabPresentations


// Retourne le bloc qui correspond à la valeur sélectionné
function returnBlocSelected(valeur) {
  // On récupére un tableau d'objet 
  let tabBlocMedicament = document.getElementsByClassName('card');
  let card, textInput;

  // On parcourt tous les blocs cachés et on récupére leur text et on le compare au paramétre envoyé
  for (let i = 0; i < tabBlocMedicament.length; i++) { 
    textInput = tabBlocMedicament[i].textContent; 
    tabBlocMedicament[i].style.display="none";

    if ( textInput == valeur ) { 
      card = tabBlocMedicament[i];
    }
  }
  return card;
}

function filter(){

  let filterValue, ul, item, block, titreLien, tabElementsLi, cardDelete;
  const listeMedicaments = document.getElementById("listeMedicaments") ;

  //console.log(filterValue) ;
  ul             = document.getElementById('suggestions');
  tabElementsLi  = ul.getElementsByTagName('li'); 
  filterValue    = search.value.toLowerCase();

  // On commence la recherche si le user à saisit plus de 3 caractères
  if(filterValue.length >= 3){
    ul.style.backgroundColor = "#cfd8cd";
    ul.style.overflowY = "scroll";
    ul.style.height = "170px";

    // On parcourt nos li
    for (let j=0 ; j < tabElementsLi.length ; j++) {
      item = tabElementsLi[j];
   
      // On récupère le content des liens 
      let contentLien = item.getElementsByTagName('a')[0].innerHTML.toLowerCase();

      ul.style.backgroundColor = "#cfd8cd";
      ul.style.overflowY = "scroll";
      ul.style.height = "170px";

      if( contentLien.indexOf(filterValue) > -1 ){
        //console.log( " val : " + contentLien);
        item.style.display="flex";

        // Au click sur un lien de suggestion
        item.getElementsByTagName('a')[0].addEventListener("click", function(){
          // On récupère la valeur du lien sur lequel on a clic
          titreLien = this.textContent ;
          console.log("titre " +  titreLien)

          // On récupere le block sélectionné et on l'affiche 
          block = returnBlocSelected(titreLien);
          block.classList.add("bloc_selected");
          block.style.display="block";
          //console.log(block) ;
        }) // Fin event click
        
      }else{
        item.style.display="none";
        listeMedicaments.style.overflowY ="hidden"; // On cache la div Card
      }
    }// Fin for 
  }else{ // caractère < 3
    //ul.style.overflowY = "hidden"; // Si on a moins de 3 caractères on cache le bloc de suggestion
    ul.style.height = "0"; // On définit la taille longueur à 0 pour le cacher
    
    // on cachne l'ancien bloc qu'on a sélectionné
    divDelete = document.querySelector('.bloc_selected') ; 
    if( divDelete ){
      divDelete.style.display="none";
      divDelete.classList.remove("bloc_selected")
    } 
  } 
}// Fin function


function load(){
  fetch('http://localhost/medicaments/medicaments.json') // Lien du fichier qui contient les données
  .then( response => {
    if (response.ok) {
      response.json()  // On convertit les données reçue au format Json
      
      .then( tabMedicaments => { // On traite les données
        //console.log(tabMedicaments);
        const listeMedicaments = document.getElementById('listeMedicaments') ; //

        let tabeObjetsMedicament = create_objet_medicament(tabMedicaments);
        //console.log(element);

        addElement(tabeObjetsMedicament, 'listeMedicaments') ;

      }).catch(error => {
        console.log("impossible de lire les données : " + error.status );
      });

    } else {
      console.log('Problème sur le serveur : ' + response.status);
    }
  }).catch(error =>  {
    console.log(error.status) ;
  });// fin fetch
}// fin function load


// On charge les éléments
load();


const search = document.getElementById('search');
search.addEventListener('keyup', filter)

}); // Fin jquery