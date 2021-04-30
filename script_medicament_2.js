$( document ).ready(function() {


function addElement(tabElements,baliseParent) {
  //console.log(tabElements);
  // Balise qui va recevoir la liste des médicaments
  const listeMedicaments = document.getElementById(baliseParent) ;

  // Balise qui affiche les suggestions
  const suggestions = document.getElementById("suggestions") ;

  let element , titre ,id ;

  for (let j=0 ; j < tabElements.length ; j++) {
    element = tabElements[j] ;
    titre = element.titre ; 
    id = element.id ;
    tabPresentations_titre = element.presentations ;
    tabObjetComposition    = element.compositions ;

    //crée un nouvel élément div
      let card     = document.createElement("div");
      let titreH5  = document.createElement("h5");
      let blocPresentation  = document.createElement("p");
      let blocComposition   = document.createElement("p");

      let li       = document.createElement("li");
      let a        = document.createElement("a");

    //  Attribution des attributs
      card.classList.add("card");
      card.setAttribute("id", id);
      card.style.display="none"; // On cache la div Card

      li.style.display="none";
      a.setAttribute("href", "#"+id);
      a.classList.add("lienCard","btn" ,"btn-secondary");

    // on donne un peu de contenu
      let texteLien  = document.createTextNode(titre);
      let texte  = document.createTextNode(titre);

      let titrePresentations  = document.createTextNode("Presentations du médicament:");
      let titreComposition    = document.createTextNode("Composition (s)");

    // Infos composition
      let texteCompo_1  = document.createTextNode("chlorhydrate de pseudoéphédrine: 30 mg - paracétamol: 500 mg -");
      let quantiteCompo_1  = document.createTextNode("Quantite: un comprimé - ");
      let TypeCompo_1  = document.createTextNode("Type: Comprimé jour"+"<br/>");


    // ajoute le nœud texte au nouveau div créé
      a.appendChild(texte);
      li.appendChild(a);
      suggestions.appendChild(li);

      titreH5.appendChild(texteLien);
      card.appendChild(titreH5);

   
    let ul = document.createElement('ul');
    let separateur =  document.createElement('hr');
    
    // Infos présentation
      blocPresentation.appendChild(titrePresentations);
      
      for (let i = 0; i < tabPresentations_titre.length ; i++) {
        if(tabPresentations_titre[i] != null){
          let li = document.createElement('li') ;
          let text = document.createTextNode( tabPresentations_titre[i] ) ;
          li.appendChild(text);
          ul.appendChild(li);
        }
      }
      blocPresentation.appendChild(ul);
      blocPresentation.appendChild(separateur);

    // Infos composition
      blocComposition.appendChild(titreComposition);
      let ul_composition = document.createElement('ul');        
        for (let i = 0; i < tabObjetComposition.length ; i++) {
          if(tabObjetComposition[i] != null){
            let li = document.createElement('li') ;
            let text = JSON.stringify(tabObjetComposition[i].components) ;
            let textModifie = text.replace(/{|}/gi, "") ;
            let texteCompo = textModifie + " - type : " + tabObjetComposition[i].type + " - quantité : "+ tabObjetComposition[i].quantity ;
            let texteFinal    = document.createTextNode(texteCompo);
            li.appendChild(texteFinal);
            ul_composition.appendChild(li);
          }
        }
      blocComposition.appendChild(ul_composition);

    card.appendChild(blocPresentation);
    card.appendChild(blocComposition);
    listeMedicaments.appendChild(card);

  }// Fin
    
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
      compositions: tabCompositions(element.composition),
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

function tabCompositions(tabElements){
  let tabCompositionModel = [];
  if(tabElements != null) {
    tabElements.map( element => {
      tabCompositionModel.push(element);
    })
  } 
  return tabCompositionModel;
}// fin function tabCompositions

// Retourne le bloc qui correspond à la valeur sélectionné
function returnBlocSelected(id) {
  // On récupére un tableau d'objet 
  let tabBlocMedicament = document.getElementsByClassName('card');
  let card, textInput;

  // console.log(tabBlocMedicament)

  // On parcourt tous les blocs cachés et on récupére leur text et on le compare au paramétre envoyé
  for (let i = 0; i < tabBlocMedicament.length; i++) { 
    idCard = tabBlocMedicament[i].id; 
    tabBlocMedicament[i].style.display="none";

    if ( idCard == id ) { 
      card = tabBlocMedicament[i];
    }
  }
  return card;
}

function filter(){

  let filterValue, ul, item, block, titreLien, tabElementsLi, cardDelete, haut_page, lienHrefId;
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
       
      // console.log(item.getElementsByTagName('a'));

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
          // On récupère la valeur de l'id sur lequel on a clic
          lienHrefId = this.hash.replace('#', '') ;
          console.log("id " +  lienHrefId)

          // On récupere le block sélectionné et on l'affiche 
          block = returnBlocSelected(lienHrefId);
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
  fetch('./medicaments.json') // Lien du fichier qui contient les données
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

//Au click sur le bouton nouvelle recherche, on remonte en huat de la page et on efface le contenu de la recherche
const btn_search = document.getElementById('btn_search');
btn_search.addEventListener('click', function(){
  document.getElementById('search').value ='';
});

const search = document.getElementById('search');
search.addEventListener('keyup', filter)

}); // Fin jquery